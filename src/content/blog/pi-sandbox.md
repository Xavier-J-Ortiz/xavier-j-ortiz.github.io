---
title: "Running Pi from a Sandbox"
description: "Getting Pi running inside a sandbox to avoid leaking data or credentials"
pubDatetime: 2026-11-28T17:53:00Z
tags:
  - AI
  - Tooling
  - Pi
---

Pi runs with all the access my user has, and no restrictions of its own, so it
could happily `cat` the file where I keep my SSH private keys or a dotfile full
of credentials. That's not what I want, so this comes down to two steps.

1. Audit where I keep credentials.
2. Work out how to isolate them with `pi-sandbox`.

## Credentials audit

The locations that come to mind are, of course:

- `ssh` keys and configs
- Cloud providers (`gcp`, `azure`, `aws`)
- GPG keys
- Browsers, Discord, and other apps holding active session cookies
- To a lesser extent, AI harnesses that lean on API keys to reach models

## How to go about sandboxing

### `pi-sandbox`

I did some searching earlier today, and running pi in a Docker container or in a
VM looks like one option for clean isolation. There is also a module called
[`pi-sandbox`](https://pi.dev/packages/pi-sandbox) that does much the same job:
it wraps bash commands in
[`bubblewrap`](https://github.com/containers/bubblewrap) to enforce network and
filesystem restrictions at the OS level.

I don't really want to spend time setting up a VM or Docker, so I'd rather start
with the minimalist `pi-sandbox` setup and give that a shot.

Installing it is like any other `pi` module:

```sh
pi install npm:pi-sandbox
```

Looking at the sample config on the `pi-sandbox` page, there are options to
allow and deny different network domains, plus lists of paths where reads and
writes are allowed or denied. Pretty straightforward. I'm hoping the install
ships sane defaults so I can build the allow/deny lists from there.

The docs also list some handy slash commands: `/sandbox-enable`,
`/sandbox-disable`, and `/sandbox-allow domain|read|write <value>`. The last one
prompts you to add the entry, and asks whether the grant should apply to the
session, the project, or all projects, so it can land in a config file
permanently, but only if you say so.

One caveat I noticed: the OS-level sandbox only covers bash commands. The read,
write, and edit tools are checked by the extension inside the Node.js process,
and `pi-sandbox` doesn't intercept the optional `grep`, `find`, and `ls` tools,
tools registered by other extensions, or MCP tools at all. So the guarantee is
weaker than "nothing on the host is readable", which matters for the credentials
I'm trying to protect. It also needs `ripgrep` on the `PATH`, or the sandbox
won't even initialize.

On first run it is very restrictive. Reads get blocked, and when Pi wants access
it asks whether to allow the read or write for this session, for this project,
or for all projects.

So as I work, I can see how much friction this creates for autonomous workflows,
and I can start adding directories or files to the allow list a little at a
time.

Right now I'm not sure whether this is an antipattern. `opencode` had a lot of
friction, `pi` doesn't, and for automated workflows that's great. Adding
`pi-sandbox` is the exact opposite, since it asks for access to things all the
time. Within a session that's fine, because you can audit as you go, but long
term the beginning of a process might get very busy, and it should settle down
as things land in the allow list for that session. Still, a new file that needs
access means waiting on my input, which slows the agent down. But that is the
trade: there is no way to sandbox without building allow and deny lists.

Seems like this is yet another thing where I'll need some mileage before I reach
a comfortable working state.

I'm also running into a blocker that might just make me move away from
`pi-sandbox` for the moment. On Ubuntu 26.04, bash commands never run at all. In
short, Ubuntu's AppArmor policy clashes with how the `pi-sandbox` runtime is
designed. `pi-sandbox` puts each command inside `bwrap`, then runs a helper
(`apply-seccomp`) to add a socket-blocking filter. To set up its extra process
isolation, that helper needs an admin capability inside its own private user
namespace. Ubuntu's AppArmor profiles include
`/etc/apparmor.d/bwrap-userns-restrict`, and anything running inside
`/usr/bin/bwrap` gets transitioned to the `unpriv_bwrap` profile, which contains
`audit deny capability`. The helper is denied the capability:

```
apparmor="DENIED" profile="unpriv_bwrap" comm="apply-seccomp" capname="sys_admin"
```

Since `apply-seccomp` refuses to run without its filter, it aborts, and no
command ever runs.

That's a blocker on my work laptop, and I've already spent more time on this
than I wanted to.

### Begrudgingly trying `pi-landstrip`

In an attempt to get some pi isolation up and running without having to modify
any AppArmor settings, which are probably configured that way for compliance
reasons so that unprivileged processes can't gain elevated access and be
exploited, I'm going to give `pi-landstrip` a try.

```sh
pi install npm:pi-landstrip
```

Installing is similar enough. It doesn't use `bwrap`, so it doesn't clash with
AppArmor on Ubuntu; on Linux it picks a container or a KVM-backed backend
instead.

On giving it a try, this might be the solution, but out of the box it is quite
relaxed about what it allows and denies access to.

To be fair, _many things are locked by default_. Every network domain and every
write outside the project triggered a prompt, which is kind of what I expected
when adding isolation to a project. I think this is just part of working with an
isolated `pi` environment. I'll either get used to it and add some sane `allows`
over time, or tolerate a little friction while protecting the "non-negotiables".

However, reads are allowed by default. With `shell.readAccess: "host"`, the
shell can read any file on the host, which is exactly what I would like to
avoid. I would have to build the deny list myself, and it has to go in
`denyReadAlways` (or I'd have to set `shell.readAccess: "policy"`), because a plain
`denyRead` entry doesn't constrain host reads. That's a footgun worth knowing
about before relying on it.

Another thing I don't like is that it adds a `subagent` system, which is not a
feature I expected a sandbox package to bring along. I could turn it off, but
it's yet another config parameter to add.

All told, it's better than `pi-sandbox` in that I can run bash, and when I run
commands it prompts for permission at session, project, or global scope. But it
does have read access to a lot of things, and that could be a problem. The gap I
see is that if I add a credential for a new service and forget to add it to my
blocked files, I could leak it, and I don't want that.

Also, its permission prompt window has a very short timer! It looked like about
10 seconds, and if I shift attention away from the prompt for a bit, it auto
denies. I couldn't find a setting for it in landstrip's config, so the timeout
looks like it comes from pi's dialog rather than from sandbox policy.
`pi-sandbox` is the opposite: `permissionPromptTimeoutSeconds` defaults to
`600`, so you come back to a 10-minute countdown to allow or deny an action, and
setting it to `0` waits indefinitely.

## Conclusion

I think `pi-sandbox` works on my normal desktop, so I'll probably stick with it
and build from there. I may or may not use it on my work laptop. I prefer the
increased isolation in `pi-sandbox` and would like to understand it better _by
actually doing work_, not by focusing on tooling as I have today.

On the work laptop, I may have to loosen the AppArmor restriction, or loosen
`pi-sandbox` in its settings, which I think is the saner choice. Both need
**effort** and **focus** on the tool, and I don't want to spend either at this
moment. I'd rather try to get work done with the tool and tweak it than work on
the tool so that I can try to get work done. Perhaps building good sandboxing
habits, if there are any to build, is the way to approach this on my work
laptop. I have been using `pi` without any sandboxing for the past week (give or
take), and the experience has been great. Trying out both `pi-sandbox` and
`pi-landstrip` would most definitely introduce friction into a project, and I'm
not sure it would be worth losing the smoothness of unfettered `pi`.
