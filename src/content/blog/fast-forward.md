---
title: "Neovim, AI, and updates... oh my"
description: "A mid-year update: settling on a neovim config, the AI wave and layoffs reshaping the industry, migrating this blog from Jekyll to Astro, and putting study plans on pause."
pubDatetime: 2026-07-31T16:37:10Z
---

# Wow have things changed

Back in January, I was naively plonking away, kicking off and iterating over a `neovim` config to enable me to _UsE Ai_ (ominous noise).

Fast forward to July, and AI is here. Things have happened both across the industry and within the company I'm working at, and right now the tech world and many other industries are adrift.

In a nutshell, here's an update on what pertains to this blog:

- I did end up crafting a `neovim` config that I like. It's not perfect, but it works, and I had been tweaking it little by little as I found and fixed nuances.
- I migrated the blog from `Jekyll` to `Astro`, with AI lending a hand.
- Between the AI wave, layoffs across the industry (my company included), and some personal events, I've put my study plans on pause.

# Neovim and development plan re-direct

I've converged on a `neovim` config. I may write specifically about this in a follow-up post, pointing out which plugins I've chosen, but I'm still doing minor tweaks here and there.

It's difficult to get things perfect, and perfection is the enemy of done, especially with `neovim` configs. I don't want to fall into a trap of being an expert at tweaking the config, instead of writing code and doing projects.

Once I reached a usable config that I was happy with (warts and all), I focused elsewhere and continued to get things done. Any remaining tweaks are minor and can sit for a while before I get around to them; the heavy lifting is done.

That said, while writing this post, I spent about a day fixing my `opencode.nvim` integration because something was off. On updating, I noticed that one of the functions of the plugin which I enjoyed using had been deprecated. In fact, the plugin itself changed quite a bit, so I got up to speed, modified the specific plugin config, fixed the underlying issue, and then tested this on my workflows. I had to update my `tmux` version and config on a remote laptop I use for work, as well as start using `wezterm` in order to get the right behavior out of `tmux` and `neovim` on said remote laptop.

## A note on Vim

I've abandoned `vim` altogether, as the push towards `neovim` was non-trivial, and also because I truly believe that diving deep into a tool is the best way to "learn" it. Using `vim` to keep a familiar experience and creature comforts intact did not merit continuing to use it over `neovim`, especially given all its features and advantages. At work, we do have a couple of gigantic codebases, and that alone provides an advantage, given `neovim`'s snappier LSP integration. Also, a lot of tools that I need can just be automatically updated via `neovim`'s internal plugins.

Before the push, my `vim` setup was _exceedingly_ out of date. So, the `neovim` config push was very useful in understanding changes that have occurred in the past couple of years.

`neovim` is a very fast moving target, and things change quickly. One reason my `vim` setup was out of date was that _it always worked_ across different repos and OS upgrades. I don't think I spent as much time on my `vim` config in the past as I have on my `neovim` setup, and I kinda like that, and I miss it. Though `neovim` is what I'm currently using, due to its better LSP integration support, I'll continue using it. I may still revisit my `vim` config, just to have it around and up to date, similar to what I've added in `neovim`, and try to get it as close to parity as possible. If I can get some parity, I may be swayed back to `vim`.

# Migration from `Jekyll` to `Astro`

I've migrated the blog site to `Astro`. I had been using `Jekyll` since this blog started, if not before kicking off the website. I started using it almost 10 years ago, as one of the projects within my web/software dev coursework! So yeah, it definitely predates the actual website.

It _was_ working well, besides feeling a bit dated, which I was fine with. I had made an overhaul once, basically updating to the most current `Jekyll` and `ruby` versions in order to not be _too_ out of date. But for the most part _"if it ain't broke, don't fix it"_. I tried to "re-skin" the `Jekyll` framework, but realized that changing the `Jekyll` theme into something I liked would take just as long as migrating to `Astro`, mainly because updating `Jekyll` to a theme I liked required a theme framework upgrade, updating some ruby `gems`, and removing some old config options that either broke with these upgrades or were missing required parameters. After what felt like a lot of effort and not a lot of progress, I decided this was too much work just to add a new theme on an old, dated framework/platform.

I believe that if you have the "base" framework, in this case `Jekyll`, adding a theme should not require that much tweaking. Granted, the `Jekyll` framework had some "easy" themes that you could change to; these were just the same website with some different colors. I wanted some different layouts, features, maybe things that made the page seem more dynamic. It should be just a download or a pointer to a new repo, and done. This was a huge part of my motivation to look for a _new_ framework.

Plus, the newer `Astro` framework removed the annoying ruby `gem` dependencies, and `ruby` altogether. All in all, it had a snappier performance as well.

I did use AI to do the migration. At the time, I used `opencode` and its internal AI model `Big Pickle` to do this, and had good results. `Astro` looked better in my opinion, and was less tedious to update.

While I'm at it, I'm also planning on modifying some of the `vale` packages that I'm using for writing, especially in markdown. I'm getting a lot of `warning` and `error` "noise" at the moment, and to be honest, I'm not sure if I need all of that, since I'm mostly ignoring it. I'm looking at you `write-good.E-prime`, pointing out that I should not use is/are/am.

# Study plans on pause

I had planned on diving a bit deeper into `golang` and `python`, improving my fluency in both languages. Generally speaking, I do believe in the value of diving deeper into writing code and improving in a language or two, even with the forced push towards AI.

Besides focusing on `golang`, I also had plans to contribute to [saltstack/salt](https://github.com/saltstack/salt), as well as to [golang/go](https://github.com/golang/go).

On the Linux side, I was considering creating a mini home lab, maybe going through the course material of some advanced Linux certificates, or other more advanced courses that I might find online.

With changes in the industry, layoffs at work, and an unfortunate passing in the family, I paused those projects. At work, AI took hold in Q1 of this year, and by March, I was using a lot of it for my workflows. The industry is in flux right now, and nobody knows what's next for this technology, or how it will reshape industry roles.

Not writing code and outsourcing coding work to an AI agent brings on brain rot, which is harmful to other aspects of planning during larger projects, and to the review process of real humans with real eyeballs. People still need to read things and understand them during review. If you can write good code, you can also read and curate good code created by AI, so that others can read good code for review. AI slop stops with you.

But there are things that AI can save you time on. Search is a huge one; also, tedious boilerplate starter code is another thing AI is perfect for.

As with `neovim`, which is a tool that requires understanding some of the features that you are willfully adding to it, AI is also a tool that requires some usage and then some thought on how to improve it within your workflow.

For me, at this moment, I'm thinking quite a bit about this. I want to continue doing what I'm doing in tech, without losing the enjoyment, while staying relevant. Based on this, I'll make core decisions on what I'm going to work toward in the upcoming months.

The short answer is to keep writing code with my own hands, keep this blog going, and treat AI as a co-worker, not a brain replacement. Change is constant. There is no way around that.

As a next step, I think I'll start with [exercism](https://exercism.org) to brush up on key concepts in `golang` and `python`. The exercises there are bite-sized enough to warm up, and will build the muscle memory of writing code and keep me up to speed on any new features added to the languages. This, in turn, will combat brain rot as well.

Once I'm back in the rhythm, and once I've tested my `neovim` setup, I'll revisit contributing to an open source project. With the open source project, I'll keep in mind using AI in order to stay up to speed with useful tools that have reached maturity. But I'll also use it while avoiding AI slop, reviewing any additions to code, scanning to make sure they can be easily reviewed by human eyes and aren't adding bloat to the software.

I believe that this is a good way forward, to soak in where the tech stack is now, while I think a bit more on the big picture.

