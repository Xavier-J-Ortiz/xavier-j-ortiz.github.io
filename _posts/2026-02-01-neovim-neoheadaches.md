---
layout: single
classes: wide
title: Neovim, neoheadaches

tags:
- Vim
- Neovim
- Opencode
- Lua
- LSP
---
# Neovim.... more like Neoconfig :am_i_rite?:
I was a bit naive to think that I could straight up use my `.vimrc` and use it as a starting point `nvim` and start to move some of the plugins to their `nvim` versions in a day or two.

I should have just set up `lazy.nvim`, added the `opencode.nvim` plugin, and walked away continuing to use my `vim` plugins (pulled in by `lazy.nvim`) and `.vimrc`.

But, I had a lot of thoughts and some decisions to make.

# Install `opencode.nvim` and `lazy.nvim`

On installing these two plugins, I could immediately see the chasm of what the neovim ecosystem was.
To set the stage, in `vim` every time I needed to install a plugin, I used the `vim-plug` plugin, which could be auto-bootstrapped, and the `vim-plug` config for installing plugins is super easy to understand. It's just added in `.vimrc` like so:

```vimscript
" Automatic installation/bootstrapping of vim-plug
let data_dir = has('nvim') ? stdpath('data') . '/site' : '~/.vim'
if empty(glob(data_dir . '/autoload/plug.vim'))
  silent execute '!curl -fLo '.data_dir.'/autoload/plug.vim --create-dirs  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

" Run PlugInstall if there are missing plugins
autocmd VimEnter * if len(filter(values(g:plugs), '!isdirectory(v:val.dir)'))
  \| PlugInstall --sync | source $MYVIMRC
\| endif

call plug#begin()
Plug 'preservim/nerdtree'
Plug 'tpope/vim-fugitive'

...

call plug#end()
```
For the most part, "everything just worked". I don't think I've had to dive down to add much config to these plugins, as the defaults of all the plugins are quite sane.

I knew adding plugins and config the `nvim` way would require understanding a new language for me (`lua`), and understanding the way a new install plugin works (`lazy.nvim`).

Installing `opencode.nvim` and `lazy.nvim` was relatively painless, but not without some frustrations.

Fortunately, opencode does have a one chunk of `lazy.nvim` config/setup text that allows to just get up and go using the [installation](https://lazy.folke.io/installation) docs. To someone who is brand new to the `nvim` plugin ecosystem, the fact that they show a working example of how to install is great.

On the installation page, I can't help but notice that there is a `single file setup` option as well. I opt for the `structured` setup using two files. Seems better to separate config stuff from plugin stuff.

The config below taken from the [`opencode.nvim`](https://github.com/nickjvandyke/opencode.nvim?tab=readme-ov-file#lazynvim) section. It is referenced as `lazy.nvim` setup, presumably to install the plugin.

```lua
{
  "NickvanDyke/opencode.nvim",
  dependencies = {
    -- Recommended for `ask()` and `select()`.
    -- Required for `snacks` provider.
    ---@module 'snacks' <- Loads `snacks.nvim` types for configuration intellisense.
    { "folke/snacks.nvim", opts = { input = {}, picker = {}, terminal = {} } },
  },
  config = function()
    ---@type opencode.Opts
    vim.g.opencode_opts = {
      -- Your configuration, if any — see `lua/opencode/config.lua`, or "goto definition" on the type or field.
    }

    -- Required for `opts.events.reload`.
    vim.o.autoread = true

    -- Recommended/example keymaps.
    vim.keymap.set({ "n", "x" }, "<C-a>", function() require("opencode").ask("@this: ", { submit = true }) end, { desc = "Ask opencode…" })
    vim.keymap.set({ "n", "x" }, "<C-x>", function() require("opencode").select() end,                          { desc = "Execute opencode action…" })
    vim.keymap.set({ "n", "t" }, "<C-.>", function() require("opencode").toggle() end,                          { desc = "Toggle opencode" })

    vim.keymap.set({ "n", "x" }, "go",  function() return require("opencode").operator("@this ") end,        { desc = "Add range to opencode", expr = true })
    vim.keymap.set("n",          "goo", function() return require("opencode").operator("@this ") .. "_" end, { desc = "Add line to opencode", expr = true })

    vim.keymap.set("n", "<S-C-u>", function() require("opencode").command("session.half.page.up") end,   { desc = "Scroll opencode up" })
    vim.keymap.set("n", "<S-C-d>", function() require("opencode").command("session.half.page.down") end, { desc = "Scroll opencode down" })

    -- You may want these if you stick with the opinionated "<C-a>" and "<C-x>" above — otherwise consider "<leader>o…".
    vim.keymap.set("n", "+", "<C-a>", { desc = "Increment under cursor", noremap = true })
    vim.keymap.set("n", "-", "<C-x>", { desc = "Decrement under cursor", noremap = true })
  end,
}
```

However, with this chunk of code, you need to know how `lazy.nvim` consumes this information. As a newbie to `nvim`, it is not clear _where_ this config should be saved to, or how to separate the plugin part from the config part. Let alone that copying and pasting this anywhere in your config isn't really going to work as expected as is.

After some reading about how this should be installed using `lazy.nvim`, I found the [examples section](https://lazy.folke.io/spec/examples) which has examples on how to add plugins.

```lua
return {
  -- the colorscheme should be available when starting Neovim
  {
    "folke/tokyonight.nvim",
    lazy = false, -- make sure we load this during startup if it is your main colorscheme
    priority = 1000, -- make sure to load this before all the other start plugins
    config = function()
      -- load the colorscheme here
      vim.cmd([[colorscheme tokyonight]])
    end,
  },

  -- I have a separate config.mappings file where I require which-key.
  -- With lazy the plugin will be automatically loaded when it is required somewhere
  { "folke/which-key.nvim", lazy = true },

  {
    "nvim-neorg/neorg",
    -- lazy-load on filetype
    ft = "norg",
    -- options for neorg. This will automatically call `require("neorg").setup(opts)`
    opts = {
      load = {
        ["core.defaults"] = {},
      },
    },
  },

  ...

}
```
Note that the configs found in the examples section are bite sized and don't have a lot of stuff being added to them. But writing a plugin file in this manner _just_ for `opencode.nvim` to start, makes sense. I can separate files later.

Some of the config in the referenced `opencode.nvim` setup code is familiar from my experience with vim and `.vimrc`. `vim.keymap.set`, though new within itself, is containing familiar vim keybinding format. Though this does not seem to be strictly plugin declaration text, I'd like to separate it to it's own config file.

To fast forward a bit, there is a section in the `lazy.nvim` docs that explains [structuring plugins](https://lazy.folke.io/usage/structuring). This shows how to structure the config files and the plugin files.

I end up separating as much of the `opencode.nvim` plugin config spec as possible, and ended up with this setup:


- `~/.config/nvim/lua/plugins/`
```lua
return {
        "NickvanDyke/opencode.nvim",
        dependencies = {
                -- Recommended for `ask()` and `select()`.
                -- Required for `snacks` provider.
                ---@module 'snacks' <- Loads `snacks.nvim` types for configuration intellisense.
                { "folke/snacks.nvim", opts = { input = {}, picker = {}, terminal = {} } },
        },
        config = function()
                require("config.opencode")
        end,
}
```

- `~/.config/nvim/lua/config/`
```lua
---@type opencode.Opts
vim.g.opencode_opts = {
        -- Your configuration, if any — see `lua/opencode/config.lua`, or "goto definition" on the type or field.
}

-- Required for `opts.events.reload`.
vim.o.autoread = true

-- Recommended/example keymaps.
vim.keymap.set({ "n", "x" }, "<C-a>", function()
        require("opencode").ask("@this: ", { submit = true })
end, { desc = "Ask opencode…" })
vim.keymap.set({ "n", "x" }, "<C-x>", function()
        require("opencode").select()
end, { desc = "Execute opencode action…" })
vim.keymap.set({ "n", "t" }, "<C-.>", function()
        require("opencode").toggle()
end, { desc = "Toggle opencode" })

vim.keymap.set({ "n", "x" }, "go", function()
        return require("opencode").operator("@this ")
end, { desc = "Add range to opencode", expr = true })
vim.keymap.set("n", "goo", function()
        return require("opencode").operator("@this ") .. "_"
end, { desc = "Add line to opencode", expr = true })

vim.keymap.set("n", "<S-C-u>", function()
        require("opencode").command("session.half.page.up")
end, { desc = "Scroll opencode up" })
vim.keymap.set("n", "<S-C-d>", function()
        require("opencode").command("session.half.page.down")
end, { desc = "Scroll opencode down" })

-- You may want these if you stick with the opinionated "<C-a>" and "<C-x>" above — otherwise consider "<leader>o…".
vim.keymap.set("n", "+", "<C-a>", { desc = "Increment under cursor", noremap = true })
vim.keymap.set("n", "-", "<C-x>", { desc = "Decrement under cursor", noremap = true })
```

In describing this, I tried to be brief. These two plugins were the _easiest_ ones to install in my experience. They sort of just worked out of the box, which I think is the point of both of them.

There was a lot of reading and head scratching between reading sessions, frustration due to incorrect configs, and time to make sense of it all and arrive to the right setup.

# Compare this experience to installing something in `vim`
I can recall in vim that setting up `vim-plug` was pretty much self contained. Most config were self contained in the plugin, except for perhaps having to setup a keybind or two. Even `dense-analysis/ale` for `vim`, which was a game changer for me but required pointing out linters and formatters, was pretty straightforward to setup.

Adding a plugin to `nvim` is not a ubiquitous experience. Many times in the `README` file would not do a great explanation on how to install a plugin in a clear cut way.

In starting to explore possible plugins to use, I could see that many times, they were not backwards compatible. At the moment, typically `10.x` or above is required for most plugins I've seen. This is the version that debian's stable release, `trixie`, has available. But some key plugins require `11.x` which is the current stable tip of `nvim`. One of these is `nvim-treesitter`.

This opens the question as to which version of `nvim` to use, and how to acquire it. I've decided to use the nvim `deb` package found at [`neovim/neovim-releases`](https://github.com/neovim/neovim-releases/releases). The strategy, use the version `11.5` until plugins start complaining about incompatibility, or there is a "must have" new feature that might be worth an upgrade.

When using vim, and searching for a plugin to use, I don't think I've had to think about the version of `vim` I'm using. I suspect this is because `vim` is more focused on stability and backwards compatibility. Making it very easy for plugins to work, regardless of the version you're using.

Having to think about this also points out that the `nvim` plugin ecosystem, as well as `nvim` itself is in active development and a moving target. The culture that I sense is that plugins could move forward and things can break very quickly. Heck, `nvim` itself is a moving target where between versions a change could break, or a behavior could change.

This introduces another pain point, as I now am using something akin to unstable. Not that the editing platform will crash on me, but that rather, I may have to revisit my config in the middle of the work week because a plugin or `nvim` has changed and is causing some unpleasantness on usage.

My strategy is to keep my version of `nvim` up to date using `neovim/neovim-releases` packages when required. My hope is that this should keep from having to spend time fixing a broken setup.

With `vim`, I didn't have to think about this at all. If I was able to install a plugin on whatever version of `vim` was available on the linux dist that I was using, I knew I could continue using it until the end of time (don't quote me on that).

This experience has made me appreciate the stability of `vim`'s plugin ecosystem, and almost touchless configuration that it requires.

# Is `nvim` worth the hassle of giving it a try?

After going through all this thought process, learning how to use `lazy.nvim`, and installing the `opencode.nvim` plugin, I could see the chasm that would be necessary to get `nvim` to a useful state using only plugins that are native to `nvim`, instead of using a hodge podge mix of `vim` plugins and `nvim` plugins.

I told myself that I wanted to give `nvim` a full try. Staring at the chasm, I can tell that if I do go all in, I will have a [sunk cost](https://en.wikipedia.org/wiki/Sunk_cost) in terms of effort and time taken to get `nvim` to a good state. I could see it would take a week, if not more, to get it to a good point.

I can also see a future effort cost as plugins move forward with changes and potential breakages in my `nvim` setup. Hopefully these are few and far between, and if there is a breaking change coming up, I'll see some warning on starting `nvim`. That way any modifications can be changed before the breaking change comes through.

So the question is, with this new information on setting up `nvim` to a usable and better state than what my current `vim` platform is at, is it worth it?

I decided it was. For multiple reasons.

- There is a lot of buzz about `nvim`'s LSP native engine. Working with large codebases at my job, I believe that this would be beneficial to make the platform as agile as possible. All research pointed to `nvim` having an edge over `vim` due to this and having more modern features.
- The integration with `opencode.nvim` is quite neat. I can select sections of code using the `VISUAL` mode in `nvim`, and throw that with a reference to opencode with a keybind. Though I could get by with `vim` + `tmux` by opening a `tmux` pane to invoke and use opencode, the glue to easily throw or reference _specific_ lines within code is super useful. AI prompts improve the more context and specificity you give it.
- I have admittedly been lagging in updating my `vim` plugin situation. This includes integrating with LSPs, staying up to date with formatters and linters given the languages I'm using, as well as using the plugins that I have available to the best of my ability. Installing `nvim` and getting the platform up to speed with plugins is the perfect opportunity to get myself up to date. I'll have to pay the price up front, but will make any new technologies available easier to integrate. Even upgrading currently integrated ones as well.

Even with all the downfalls, I've decided to take the plunge. Understanding the wiring between `nvim` and the underlying interfaces is useful moving forward with `nvim`, _and even if I move back to_ `vim`.

# First attempt at adding more plugins
My first attempt I found myself in a plugin/config mess. The strategy was to attempt to onboard by importing my `.vimrc` file to `nvim`, and "one-by-one" remove all `vim` plugins and install equivalent `nvim` plugins.

Don't do this kids.

I had to restart after a couple of hours, and thought that starting from scratch was the best thing I could do.

So far, It's going well, but I've spent about a week getting things to a working state for me. Plus, I find myself finding some odd edge that requires a small config tweak to fix. This is expected as this is the first time using `nvim`.

# Time to write code!

All this config talk, and I haven't written any code!

Well, strictly speaking, I have been since I've been wrestling with `lua` as I get `nvim` to a good state.

But now it's time to use `go` and `python` and give it a spin. So far, I'm liking the experience of _actually coding_, but will need to write more of it to continue tweaking the config for a better experience, as well as to see if this is all it's cracked up to be.
