---
layout: single
classes: wide
title: Jekyll and Minimal Mistakes on Debian (12) Bookworm
tags:
  - jekyll
  - minimal mistakes
  - blog
  - ruby
  - gems
  - debian
---

# Short Evaluation on What Framework to Use for this Blog

Couple of days ago, I wanted to continue writing on here, but given that I hadn't done it in a while, and in the vein of starting anew, had overhauled my webserver workflow to use microservices and migrated to GCP, I thought maybe it's time to reconsider the web technology powering the blog itself!

However, when looking at what I had, I didn't feel like conjuring up a script to port all my posts into some new input format, find a new technology, then get it to run for development, and finally, publish it.

So I decided to stick with [Jekyll](https://jekyllrb.com/) and [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/). Basically, the pain and effort to migrate and use a new web technology was far greater than the perceived benefit. Perhaps there will be a time when the script gets flipped. Any recommendations welcome!

# Getting a Dev Environment it to Work Again

I didn't want to do any web development on Ruby. And in all honesty, I didn't have any interest in doing any web development in the short term either. So, because of this, I didn't want to use third party repos to install `rvm` or any other ruby version manager.

I just wanted to stay vanilla and use whatever was in the Debian repo on my local machine. Simple.

Again, perhaps another project in the future is to use a Ruby container for this, but for the scope of what I want to achieve right now, this is fine.

## Jekyll

Initially I had forgotten that I had used Minimal Mistakes. So my initial reaction was, I'll start with a fresh Jekyll install. So I went to the Jekyll page and on their landing page, I see the following quick-start instructions:

```
  gem install bundler jekyll
  jekyll new my-awesome-site
  cd my-awesome-site
  bundle exec jekyll serve

# => Now browse to http://localhost:4000
```

I believe Debian already had some Ruby files installed tangentially from other programs that I required, so the `gem install bundler jekyll` worked, however, hiccuped when it started to run. I had to install `ruby-dev` onto my system, which was quite easy and achieved with an `apt-get install ruby-dev`.

On running `gem install bundler jekyll` again, I was getting some different errors. I had permissions accessing the `/var/lib/gems/3.1.0` folder.

I started to remember why `rvm` was so useful. It installed things locally, and I did not have to go into folders that I did not have access to as a regular user. Using `sudo` to do this could make things go haywire, as I would install these gems system wide, and perhaps install conflicting commands to myself and other users, so I was kind of stuck. So I was kind of stuck with using an external management tool like `rvm`. But `rvm` was more useful if I was going to develop on Ruby, and since I wasn't, I didn't want to add external libraries if not absolutely needed.

So I did some research, and found that if I add `export GEM_HOME="$HOME/.gem"` to my `.bashrc`, the `gem install` command would install gems in the folder locally. Which is exactly what I wanted to do. After adding that line, and `source ~/.bashrc`, running `gem install bundler jekyll` ran without a hitch.

I followed the rest of the commands, created a new folder for my blog, and tested it by running `bundle exec jekyll serve`. Copied my old `_posts` folder to the new setup. However, it looked plain and boring!

That's when I remembered that I did something to spruce it up.

## Minimal Mistakes

During my last overhaul of my blog site, perhaps over 2 years ago, I was using the default setup and layouts within Jekyll. I did some research then, and stumbled upon Minimal Mistakes, which is a Jekyll theme. At the time, I was not able to get it to work on Github Pages, so I moved it to self hosting.

I noticed this time, however, that the minimal mistakes website was hosted on `github.io`. So, I thought I'd give this another try.

On their [landing page](https://mmistakes.github.io/minimal-mistakes/), I clicked a very visible `Install Now` button, and it redirected me to some quick-start documentation.

I followed the `Remote theme method`, as in the documentation it mentions that this method is:

> ... Ideal for sties hosted with Github Pages

, and my goal was to have the site hosted by Github Pages.

So I modified my Gemfile to look like this:

```
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins
```

, then ran `bundle`. It installed a bunch of necessary gems.

I then, as instructed, added `remote_theme: "mmistakes/minimal-mistakes@4.24.0"` to my `_config.yml` file, and removed any other `theme:` or `remote_theme:` entry.

I ran into a small issue when running `bundle exec jekyll serve`. I was getting a `LoadError` mentioning ``in `require': cannot load such file -- webrick``. A quick google landed me on [this](https://talk.jekyllrb.com/t/load-error-cannot-load-such-file-webrick/5417) article, that had multiple solutions.

I opted to use the `bundle add webrick`, which added the module. Also, it added a line to my `Gemfile`. After running that command, my Gemfile was modified and it looks like this now:

```
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins

gem "webrick", "~> 1.8"
```

I was now able to see the proper formatting after moving some other folders that contained some formatting and layout information from the old blog files.

# Type Away!
I wanted to capture this process as it was relatively painless to get up and running, and allows me to just continue posting as I had previously. But it did require some finessing to get to work correctly.

Hopefully this helps others get up and running, and in the future is a breadcrumb for me if I find myself needing to re-install Jekyll/Minimal Mistakes.
