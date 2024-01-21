---
layout: single
classes: wide
title: To Add Comments, or Migrate from Jekyll to Something New
tags:
  - Blog
---

# I want comments

The one thing that is lacking from this portfolio page, turned blog. A comments section!

Within the `_config.yml` there are a few mentions of comment integrations mentioned within the file, which are `disqus`, `discourse`, `facebook`, `staticman`, `staticman_v2`, `utterances`, `giscus`, or a custom comment script.

Off the bat, I'm eliminating the custom comment script as I don't want to spend the time to write my own code extension for this in `ruby` for this, and also `facebook` comments because... well... Facebook. :)

It seems that I have 6 other comments technologies to research up on.

Things I want to make sure I don't miss are effort to integrate, cost, community recommendations, and long term perceived commitment.

# Researching Comments Integrations within Jekyll
Seems like the lowest hanging fruit, and probably the lowest effort to implement and achieve desired "comments" as opposed to finding a new portfolio platform.
`
Will be mainly focusing on search terms that include the technology and `Jekyll`, which will (hopefully) lead to better results and perhaps a `jekyll` specific guide.
## Disqus
Already off to a good start. In searching, the first two links that show up are Jekyll specific install instructions on the disqus website ([1](https://disqus.com/admin/install/platforms/jekyll/), [2](https://help.disqus.com/en/articles/1935528-jekyll-installation-instructions)). I'm kind of surprised in how simple it is to integrate. Though I do think my `minimal-mistakes` jekyll theme already has this integration, and the instructions are focused to regular `Jekyll` users that perhaps modify the `ruby` code needed to add this integration.

On this same search term, there were multiple other blogs explaining and showing how to integrate disqus ([1](https://desiredpersona.com/disqus-comments-jekyll/), [2](https://poanchen.github.io/blog/2017/07/27/how-to-add-disqus-to-your-jekyll-site)). Though one of these sites explains how to integrate disqus, but doesn't have any comments section (!), the second site does have a section. It has a "facebook" aesthetic, which hopefully can be tweaked. One positive thing is that it seems to allow commenting via multiple auth services, such as it's own disqus service, facebook, twitter, or google, which is kind of neat.

As expected, all info and time stamped information seems to be between 2016 to 2020.

In searching some more, I found some information regarding [disqus forcing ads](https://www.cesarsotovalero.net/blog/replace-disqus-with-a-better-alternative.html). Might be a way to force it's users to pay something to remove said ads? Seems there is a $10/month fee to remove these ads. A couple of the alternatives suggested will be covered by research (giscus, utterances).

Unfortunate, but seems like disqus which was once the leader within the blog space, now is a non-starter IMHO for most small business and self-hosted sites, like myself.
## Discourse
In checking out [discourse](https://www.discourse.org), but seems to have a cost, so a non starter.

*However*, I soon realized that I was checking out the managed services page. Urgh, I've got gripes about this. Not about a project trying to monetize via a managed service, but more that the self-hosted github project itself is not front and center of the page. I understand that saying "free and open source project" will always affect those looking for a paid service to then weigh self-hosting, but I also feel it does the open source project a dissrevice. Anyway, that's a different conversation. 10 points from Hufflepuff.

Though, self-hosted is interesting the [github project](https://github.com/discourse/discourse), I think that it would be way too much effort for a comments section for my self-hosted blog. Would be an interesting project, but I also think that time could be used better. Will put a pin in this for now, but may revisit once I've researched other options.
## staticman and staticman_v2
Not sure what the difference between regular and `v2` are, but lets look into this comment tech.

Looks like it integrates with github, and leverages it on some level as does giscus and utterance.

Though the initial google search showed some user articles integrating into `jekyll`, they were pre-disqus charging a monthly fee to remove ads.

When going to the project's [website](https://staticman.net), the site already looks great. A `View on Github` link shows up on the top right, not the bottom right buried under a ton of text. That's right `discourse.org`, I'm looking at you. The page is clean, and the bottom seems to be leading me to "Getting Started". Quickly, after a high level explanation of how staticman does it's thing, it mentions that it requires some hosting and suggests some options. I like this as it leads directly towards what I need to stand up the service.

For now, will stop searching, and consider this option. It uses NodeJS, so would require me installing that on my server as well, which is another thing to track and not desireable. However, would choose this over "Discourse" if other better options don't arise.

## utterances
OK, so the initial yeild of search output seems like a good start for this comment project.

I like how the [utterances](https://utteranc.es/) is github integrated. Additonally, all you have to do is add a `script` tag with a client javascript on the `jekyll` site, maybe less since I think the integrations may already be there for `minimal-mistakes`

Looking at a couple of these sites, the comment section looks neat as well, with appropriate aesthetics IMHO.

So far, it seems that this is the way to go.

## giscus
Lots of positive search terms on first search. Though many are pointing to the use case of a github hosted jekyll page.

In the [first article](https://blog.jakelee.co.uk/migrating-from-utterances-to-giscus-comments/) with, from what I can tell, has the most overlap of answers to the questions I'm asking, _PLUS_ is an article from this year! Neat!

The article mentions 3 benefits from utterances. Mainly, using github discussions instead of issues, more features, constant maintenance and being updated (which was to be looked into in the last section long term commitments). These benefits on top of the utterances' original benefits which are that it's open source, no paywall, no adverts, no tracking, and is light weight.

On top of that the article shows how to deploy, and the output looks really slick and neat as opposed to the other alternatives I've seen!

Talk about saving the best for last!

## Community recommendations
Though I was expecting to do more research here, from the sites read for each comment section prior, I think I have a handle of what the community thinks.

- *Boo!* - `disqus`
- *Yay!* - `utterances`, `staticman`, `discourse`. `utterances` integrates with github, the latter two can be self-hosted. `Discourse` has a paid manage service.
- *Deafening Cheers!* - `giscus`. It's `utterances` but better.

## Long Term Commitments
Will only look at `giscus` and `utterances`, as fully self-hosted is not an option.

Though `utterances` is a top contender, one really interesting thing is that it doesn't sem to have much work done on it. That is OK, as perhaps it's reached maturity. I've confirmed this just from reading the converstaions in some [PRs](https://github.com/utterance/utterances/pull/222#issuecomment-864655492). Which just means that this will probably not get any new features.

`giscus` does seem a bit more lively, but then again, it is a newer project with lots of features built on top of what is offered by `utterances`. As I think about this, I could also pick up a bug or two in the future, should I feel interested and want to brush up on JavaScript, which is probably not a bad idea.

# Conclusion
I think that most importantly, looking at new platforms, while something that I do have to think about in the near future, probably won't be something I do in the short term.

The main reason is, that it seems that `giscus` is fairly simple to deploy, by following the instructions on it's landing page.

I may implement this soon, maybe even before the next post!
