---
layout: single
classes: wide
title: Custom Domain for Github Pages Hosted Blog
tags:
  - webserver
  - DNS
  - domain
  - github pages
---

# Using Github Pages as CI/CD, and using my custom subdomain

Lets get to it 2024! Already beat my 2023 posting record!

A quick google yeilded a github doc linked [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) _seems_ to show me how to use my custom domain to point to the Github Pages blog.

If all works well, you should be reading this from my domain [www.xavierjortiz.com](https://www.xavierjortiz.com) instead of [xavier-j-ortiz.github.io](https://xavier-j-ortiz.github.io).

## Pretty simple?

* Add my custom domain `www.xavierjortiz.com` to `Settings --> Pages --> Custom Domain`
* Update my domain registar to have `www.xavierjortiz.com` use a `CNAME` that resolves to `xavier-j-ortiz.github.io`.

Could it be that simple?

I update `www.xavierjortiz.com` to point to the github URL, verified that it's resolving to the github URL, and then added it to the repositories `Github Pages` settings. However, I receive a red box mentioning that both `www.xavierjortiz.com` and its alternative name are improperly configured.

I'll give it some time, and in the meantime dig into the documentation some more in case I missed something.

After reading and making sure that I hadn't missed anything, I caught that the `Enforce HTTPS` option was able to be toggled. So I went and checked that as it's important to enforce `HTTPS` for security purposes.

## Patience is Virtue

After about 10 minutes, I was able to see the new articles posted, however, had to open the website via Firefox for first confirmation, given that there seems to be some persistent DNS (or other) cache on Chrome. Something screwy.

After confirming on Firefox, I closed my chrome session, and on reopening and disabling cache on the developer's tools I was able to see my previous post my most recent post, that was not hosted on the GCP webserver.

## LetsEncrypt Certificate
After enabling `HTTPS` in settings, I was relieved that the certificate was generated for my domain via github pages, and was generated today of course. Very nice integration that I don't have to worry about.

## Overlooked Verifying the Apex Domain
After singing my praises and publishing this article, I noticed that after about 10 minutes, I was not able to access the website anymore from my `www.xavierjortiz.com` subdomain.

After digging a bit more, realized that I hadn't verified that I actually _own_ the apex domain `www.xavierjortiz.com`.

This totally makes sense, and after digging a bit, stumbled upon [this](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) github article on how to verify the apex domain.

The gist of it is to go to your github _account's_ `Settings --> Pages --> Verified domains`, and add your apex domain. After doing this, you're then instructed to add a github specified subdomain to your domain, and have it resolve a `TXT` record with a specific code value.

This is a way to verify that you are in control of the apex domain that you're going to be serving any subsequent github pages from github from via a subdomain.
## Overlooked CNAME file
One thing that I also overlooked was the `CNAME` file.

As happens when looking into guides for the first time, I did see a reference to a `CNAME` file, however it seemed to me that I didn't need to add a file in the repo. I was mistaken, as I had misunderstood the language.

The `CNAME` was added to the repo automagically by github. But since I was not doing a `git pull` on my repository, every time I updated my repository with a post, and then `git push origin main --force` into github, I would force my local main branch which did not have the `CNAME` file, and would misconfigure Github Page's configuration that would allow me to use my subdomain `www.xavierjortiz.com`.

Once I noticed this, I ran a git pull, updating my repo, and am now updating this post. I _now_ hope that `www.xavierjortiz.com` will not have any issues forwarding Github Pages webpage.

# Great success!

First small victory of the year. I am now confident that you're reading this from my website!

Additionally, one less thing that I'll need to host on my webserver! Huzzah!
