---
layout: single
title: To Clean Up a Project Mess, Will Need to Plan
tags:
  - python
  - API
  - Data
  - Programming
---
Today's post will be a bit short.

My intent was to refresh my memory on the market hub puller code and write about it. With this, I'd be able to describe how I found a solution to a problem as well as put myself in a position to further improve the end product so I can use it in a more applicable way.

This API pulling project which fetches data from Eve Online's many market hubs, is found [here](https://github.com/Xavier-J-Ortiz/market_hub_puller) on github.

While reading it over, I kept on getting stuck at certain areas of the code. I started to notice that perhaps the code was not as clear as I thought it was when I first wrote it.

There was a lot to unpack at the time I first wrote this. I wanted to pull the Eve Online API using `requests.futures` library from `python3`, while understanding the API "mechanics" that the Eve Developers allow us to leverage. In that I was successful. _This_ was the main impetus of the project at the time, and spent a lot of mental effort to achieve it. Perhaps it was the fatigue, and just wanting to bulldog my way though to a solution, but I do admit to very little planning in terms of the flow of project, it's details, and nomenclature of functions, files, and variables. I just kind of sat down and started to write code, and tackled each item that needed fixing as it presented itself.

Now, with months between the last time I spent an extended amount of time with this project, I know see things a bit clearer.... _I think_.

Looking with fresh eyes at the API, and each end point is pretty flat. I made the mistake of perhaps combining things a bit too briskly and creating my own data structures, when perhaps the data was already well structured for harvesting. Additionally, doing too much at once also made the program look and feel very monolithic, besides being a quagmire to read through.

Perhaps, I should have:

- Thought of each dump of data in a "per region" fashion. The APIs were segmented out "per region" already, so I think it would have made writing code in a modular way, a bit easier.
- Leveraged the flat structure in which the data was already being delivered on the API end point, and saved the data this way.
- Maybe think about any smaller hub segmentation, as SQL style processes on the above saved data.
- Modularize everything into smaller, repeatable chunks. I know this is what I intended to do initially, but see or think of the best way to do this when I first wrote this code. I did think about this though, _honest_!

In any case, this is something to work on in the near future. Basically a major refactor. Heck, it may even make sense to re-do the whole thing from scratch under the new light.

Literally, will be taking pen to paper and working this out in the next couple of days.

### Adding tags and a bit more polish to portfolio page

On a side note, recently updated portfolio page has been having some more new "features". Added Tags, and Categories to it, though have yet to populate _all_ of the posts with categories and tags. There are some things that don't work, like for example, if you click on one of the tags below on this page that you're reading on, it'll go to nowhere.

I have yet to figure that out. Though have made strides so far. Have added the post dates on the visible post dates on the landing page, as well as the time to read the article. Additionally added my mug onto the landing page as well, though can't think up for the life of me of what kind of 1 sentence bio to put down without sounding pretentious, or boring, or trying too hard.
