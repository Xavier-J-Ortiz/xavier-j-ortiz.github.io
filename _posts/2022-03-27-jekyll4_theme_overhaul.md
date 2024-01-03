---
layout: single
title: Upgrading to Jekyll 4 and overhauling Theme
tags:
  - jekyll
  - upgrade
---

I'm motivated. So I decided to upgrade to Jekyll 4 last night. Fortunately the Jekyll upgrade was actually not that difficult. I decided to keep being on Jekyll as it is easy enough to add posts, and I generally understand what's going on without needing to do anything to heavily programmatic, while the site files will stay statically generated and be served real quick with very little compute resources.

# Jekyll 4 upgrade steps

To be honest, I don't _exactly_ know how I did the upgrade ... 100%.

And this sort of highlights the things I detest about Jekyll in general. The fact that it's all on Ruby and requires gems, `bundler`, and `rvm`. It gets real confusing at times.

Anyway, I had to run some of these commands to get the environment _just_ right.

First, make sure that you're in console in the folder of your profile.

The next steps would be to re-generate bundle gemfile. Because I'll be calling for the new package, it'll use the newest version of whatever I'm calling via `bundle`, which includes Jekyll 4.

```
# update to most recent gems and remove former gemfile files
gem update --system
rm Gemfile
rm Gemfile.lock

# must add webrick when using jekyll 4, as it isn't automagically bundled in
bundle add jekyll bundler webrick

# now run server
bundle exec jekyll serve
```

This was the gist of what was done. And everything worked great, as expected!

# Overhauling to [minimal-mistakes](https://github.com/mmistakes/minimal-mistakes)

Now, to overhaul stuff, I followed the following site instructions of the same question that someone had asked in StackOverflow. The post mentions basically to keep all folders which you have generated content for, as well as other web assets such as images and whatnot, that _you_ may have specifically generated, such as `_posts/`, `_portfolio/`, `assets/`, `img/`, etc.

I chose to basically fork the `minimal-mistakes` repo on an orphaned git branch, then start to add supporting files that I had in the latest `master` commit. [This post](https://stackoverflow.com/questions/31327045/switch-theme-in-an-existing-jekyll-installation) is what I based the migration on.

```
# checkout an orphan branch, and delete everything in there
git checkout --orphan new-theme
git rm -rf .
git clean -dfx

# add upstream repo
git remote add upstream https://github.com/mmistakes/minimal-mistakes.git
git fetch upstream
git pull upstream master

# build the theme
bundler install
bundle exec jekyll serve
```

This sets up basically the default new theme without any content.

Now to re-add the content you have so painstakingly created! Fortunately git makes it a bit easy for that.

```
git checkout master -- _posts
git checkout master -- _portfolio
git checkout master -- img
git checkout master -- assets
git checkout master -- Jenkinsfile

# also made a copy of the old _config.yml file, just to have it
git show master:_config.yml > _config.yml.old
```

One nice piece of information is if you accidentally remove a theme file that is necessary, you can restore it by doing

```
git checkout upstream/master -- about.md
```

That link explains very well, and provides commands with exactly what you need to do a proper migration.

However, you still need to get this on the master branch!

```
git checkout new-theme
git merge -s ours master
git checkout master
git merge new-theme

# and just to get github and your local repo all synced up...
git push
```

Now, you're basically done with migrating your content... sort of.

# Slight changes in the new theme
There were some slight changes that needed to be done. Besides populating the `_config.yml` file. That's pretty boring and tedious and I won't get into that.

But one thing that I needed to do was modify slightly all the markdown posts. It seems that the previously used `layout: post` now doesn't exist anymore. So, I had to change these to `layout: single`. In other words:

```
$ git diff HEAD^ _posts/2022-3-26-rvm.md
diff --git a/_posts/2022-3-26-rvm.md b/_posts/2022-3-26-rvm.md
index 522835a9..450e2478 100644
--- a/_posts/2022-3-26-rvm.md
+++ b/_posts/2022-3-26-rvm.md
@@ -1,5 +1,5 @@
 ---
 -layout: post
 +layout: single
  title: RVM and Jekyll install for Jenkins
   ---

```

After doing this change, the posts came up nice and clear.

# No portfolio!
Well not quite. I had to do some modifications as mentioned [here](https://mmistakes.github.io/minimal-mistakes/docs/collections/) in the `minimal-mistakes` theme documentation.

I had to create a `_pages/portfolio.md` file like so:
```
---
title: Portfolio
layout: collection
permalink: /portfolio/
collection: portfolio
entries_layout: grid
classes: wide
---
```
As well as add some information on the `_config.yml` like so:

```
collections:
  portfolio:
      output: true
          permalink: /:collection/:path/
# creates a default Front Matters for portfolio entries.. I think.. :)
defaults:
  # _portfolio
  - scope:
      path: ""
      type: portfolio
    values:
      layout: single
      author_profile: false
      share: true
```

Also, the old Front Matters for each file was not applicable, so I had to do some modifications to it based off of the example file of a portfolio entry found [here](https://github.com/mmistakes/minimal-mistakes/blob/master/docs/_portfolio/foo-bar-website.md):

To get it to work quick, This is the diff between the old and the new markdown portfolio entry file.

```
git diff HEAD^ _portfolio/reactchat.md
diff --git a/_portfolio/reactchat.md b/_portfolio/reactchat.md
index ef315e71..ee9de9d0 100644
--- a/_portfolio/reactchat.md
+++ b/_portfolio/reactchat.md
@@ -1,10 +1,9 @@
 ---
 -layout: post
  title: Chat App in React
  -feature-img: "img/react_chat.png"
  -thumbnail-path: "img/react_chat.png"
  -short-description: A chatroom application created in React
  -
  +layout: single
  +header:
  +  image: img/react_chat.png
  +  teaser: img/react_chat.png
   ---
```

Currently, as the site stands, I am not 100% happy as the portfolio doesn't show up together with the posts on the landing page. There _is_ a link on the top right that I was able to enable that will _go_ to portfolio. _But_ I would like to have the portfolio on the landing page, and below it the posts.

Oh well, I guess that is some theme customization for another time!
