---
layout: single
classes: wide
title: config pruning `vim` and tentative `nvim` migration.

tags:
- Vim
- Neovim
- Opencode
---

# It's time to revisit `vim`
Every year or so, I go through my `.vimrc` with a more critical eye, adding and purging configurations that were once useful but have become obsolete.

This year's cleanup comes with additional factors that may transform this routine refactoring into a full coding platform or IDE modernization migration.

# My main motivation: exploring AI coding agents
I haven't tried any coding agents yet, mainly due to lacking time to investigate and implement the necessary integrations, combined with it's _still_ early days for AI development tools.

Additionally, we had our yearly work on-site this past week. After various chats with my peers and a couple of edicts from above, I've decided to _finally_ evaluate an AI coding agent and integrate it into my development workflow.

To date, the only AI I've been forced to use (and that I'm consciously aware of using) has been whatever Google throws at me when I search for something while coding.

From my experience, it's been hit or miss but ultimately informed by my Google search query and its results, so at least the source is as good as what you're going to get without it.

I've found myself reading the AI blurb quickly to discern if there's any useful information before scrolling through the search results. The AI summary does provide a good overview, though sometimes it can be wrong, or might combine two pieces of information that are correct individually but incorrect when combined.

# Development Environment Choices: keeping it simple
Given that AI integration is top of mind, I'm limiting my input variables to make my IDE choice fairly obvious.

At work, we're only allowed to use a handful of AI agents: Windsurf, OpenCode, and Gemini 🙄. From chatting with my peers, it seems that Windsurf is OK but not great. The consensus is that OpenCode is the best coding agent available.

With Windsurf out of the picture and me currently using `vim`, I'd prefer to stay with `vim`. Unfortunately, there's no plugin that would integrate OpenCode with it.

However, there is `neovim`!

I tried `neovim` in the past, and while I did like the features it provided, at the time there was nothing in `neovim` that `vim` couldn't offer for my workflow. Also, although I could port my `.vimrc` to `neovim` directly into an `init.vim` file, the preferred way to configure things in `neovim` is with `lua`, which I had no real interest in learning. So, as the saying goes, if it ain't broke, don't fix it.

Fast forward to today: I want an AI integration plugin. This is the impetus I needed to give `neovim` a proper try.

Given my current situation, `neovim` would maintain the same "feel" as my current `vim` environment. I can port my existing `.vimrc` to `neovim` to ensure a smooth landing point during migration, and I'll have the option to add the `opencode.nvim` plugin once I'm fully set up.

I don't need to try out a slew of other IDEs; instead, I can continue using something that feels familiar and isn't far from what I'm currently using.

`vim` does have some AI coding plugins available, mainly Windsurf since it's whitelisted, but others exist as well. Unfortunately, none support OpenCode.

# It's a new day with `neovim`!
Time to dust off the `.vimrc`, import it into `neovim`, and give it a whirl! I'll be writing about my experience with `neovim`, integrating and pruning my old `.vimrc`, and adding the `opencode.nvim` plugin. I suspect I'll be pruning my `.vimrc` much more aggressively than I would have if I stayed with `vim`, mainly because there may be better native `neovim` plugins than the ones I used in `vim`, but also because there may be incompatibilities with certain plugins I'm currently using.

I've been putting off moving away from `vim` for quite some time because it works for me and there hasn't been a compelling reason until now. I know many IDEs have "vim motion" plugins that have enticed me enough to give them a try (looking at you, `vscode`), but having tried some in the past, they aren't quite the same and are missing some things that made `vim` hard to beat. `neovim` has been touted as the better `vim` by some, and while `vim` did catch up a bit in version `9.x`, `neovim` still has an edge.

Time to try it out for myself.
