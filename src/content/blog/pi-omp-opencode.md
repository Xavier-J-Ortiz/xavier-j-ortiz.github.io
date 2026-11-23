---
title: "Trying out Pi and Oh My Pi"
description:
  "First impressions of pi and Oh My Pi, and how their workflows compare with
  opencode's plan mode."
pubDatetime: 2026-11-22T16:37:10Z
tags:
  - AI
  - Tooling
  - Pi
---

I'd heard good things about `pi` and Oh My Pi (`omp`) at work, so I set aside
part of a Sunday afternoon to kick the tires on both.

I didn't do any exhaustive testing of either, but I do have some thoughts.

## omp

I started with [omp](https://omp.sh/). It seemed robust, and I initially thought
I would lean toward it over `opencode`. I really liked the interface, and at
first glance it seemed to have more features than `opencode`.

For an apples-to-apples comparison, though, I put `omp` in `plan` mode. It felt
as safe as it does in `opencode`, but after a couple of clarifying questions, it
asked me to approve a fully formed plan, eight sections and all.

I had wanted a relaxed Sunday: fix one issue to test-drive `omp`, not read eight
sections at once. Still, I read through the plan, found it sound, and approved.

Once I did, `omp` left plan mode and started executing the plan. That surprised
me after using `opencode`, where approving a plan does nothing until you switch
to `build` and tell it to execute. With `omp`, the output kept scrolling, then
ended with an announcement that the problem had been resolved, along with
references to the changes it had made.

I don't mind that `omp` starts executing after I approve a plan, since that's
how it's designed. What I didn't like was that it never explained what it was
about to do. Nor did it offer a clear moment to ask questions or challenge the
plan. It also produced a complete plan before I could follow what it had
decided.

When I pushed back on the plan, it churned through tokens but never answered me
directly. Instead, it revised the plan to address my question. I'm sure the
revision covered my question, but I would have had to dig through eight sections
to find the answer.

Outside plan mode, `omp` is permissive, letting a lot of work proceed without
constant interruption, which I appreciate. You pay for that permissiveness by
reading and approving a very detailed plan first, and I could live with that.
There's more nuance to the permissions, but I didn't test them enough to form a
full opinion. In short, though, the most permissive mode, which `omp` calls
`yolo`, rips through the plan with read, write, and execute access. There are
also `write` and `always-ask` modes, which prompt before `exec` or before
`write` and `exec`, respectively.

The cognitive jumps between a prompt, a few questions, and a fully fleshed-out
plan bothered me most. `opencode`'s plan mode gives you more room to shape the
plan as you go. `omp` got the job done, but there was no "stop and explain to
the human" step. It was hard to bounce ideas off `omp`, to confirm I understood
what it was doing, or to question why it had chosen that direction.

## pi

I also tried [pi](https://pi.dev/) on a small problem. It is very minimal,
though it took a bit of work to get running.

I was impressed by how small it is. It isn't bloated, and it behaved better than
`omp`, even though I expected less from something so small.

After analyzing the problem and proposing a solution, it asked me before running
anything that would change state on my machine. That seemed to be the model's
own caution rather than a permission system, since `pi` runs without permission
prompts by design. It also seemed to know what was safe to run, what could be
undone, and what it should leave alone.

But I didn't feel as safe as I do in `opencode`, where I can try things in
`plan` mode without changing anything. That's mainly because `pi` assumes,
[by design](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/#toc_13),
that you know what you are doing.

In practice, it didn't overwhelm me the way `omp` did, and it felt close to the
workflow I enjoy with `opencode`. It made progress, and I still felt in the
loop.

I expect it will take a couple of months before I'm comfortable with `pi`. After
that, I'll either install extensions for the features I need or build them with
AI to fill the gaps. The main benefit of `pi` is that it stays small, which also
keeps token counts down.

## Conclusion

I don't think `omp` is for me. The workflow didn't fit how I like to work. That
said, this was only a single attempt on a Sunday afternoon. I do plan to give
`pi` a longer trial, tackling low-stakes problems as they come up to get more
mileage out of it.
