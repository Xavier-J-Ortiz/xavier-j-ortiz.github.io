---
layout: single
classes: wide
title: Time to Sleuth! --or-- What's that folder about?!
tags:
  - Python
  - EvE
  - API
  - Data
---

# New Overhaul Folder Forgotten

I'm amused sometimes of the breadcrumbs left in the past, just by the way I've been accustomed to naming things and to work, that help me piece together where things were left off, even if I could not remember where things were left at.

Case in point, in my [market_hub_puller](https://github.com/Xavier-J-Ortiz/market_hub_puller) project, within my last working folder on my laptop, there was a branch called `overhaul-rework`, and a folder called `new overhaul`.

I could not remember creating this folder, let alone actually doing _any_ work in this folder towards an overhaul of the market hub puller API.

However, after running through the main script, I couldn't decided if the branch name was a result of a "clean up" of the main market API scripts. Mainly because there is a script which pulls data using [requests-futures](https://pypi.org/project/requests-futures/) library in python.

I do recall using this library, and thought I had worked it into the main script. But if that's the case, why is there an "overhaul" section.

Most likely, this is probably a:

1. Work in Progress
2. Folder where I tested requests futures at one point, to then incorporate it in the `master` branch
3. A partial implementation, and will not yield the same output as the main script

Regardless, I have been thinking about looking at this project again, and taking the opportunity to re-think other aspects of the script. Mainly, how to store and present the data fetched from the API pull. I think that will be a lot of fun to implement, but for now, time to grab a Sherlock pipe and hat!

# What I _Do_ Remember

I do recall the excitement and advantage of using `requests-futures`. It basically would setup a number of HTTP Requests and run them in parallel, shortening the time to fetch data. So, in fetching data from the [EvE Online](https://www.eveonline.com/signup?invc=bca90c89-290b-4667-b465-90297cc7a165) market API for thousands of items across mutliple regions in game, we would be able to fetch chunks of the market data in parallel instead of having to do the calls sequentially.

So, in short, I remember the feeling, but not what I actually did or where I left off.

# Detecitve Work

We can start to find clues both in the code, as well as by scanning in the `git log`'s commit messages.

Between both of these avenues, we can hopefully start to get a gist of what this folder is about. Though, a deeper scan will probably be necessary.

All this is work and Information found will be super useful in the next stages of the code development.

## Code Scanning
On scanning again, I do see references to `requests_futures`, as well as references to it's use. For example, within the file `competitive_prices.py`:

```
import json
import os
import pickle
from concurrent.futures import as_completed

from requests.exceptions import HTTPError, RequestException
from requests_futures.sessions import FuturesSession

import get_active_items
import get_all_orders
```
In the library import section snippet shown above, note `from requests_futures.sessions import FuturesSession`. Also, within the code there is a reference to it's use.

```
def create_names_future(ids):
    session = FuturesSession(max_workers=200)
    if len(ids) <= 1000:
        url = 'https://esi.evetech.net/latest/universe/names/?datasource=tranquility'
        header = {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
            }
        future = session.post(url, json=ids, headers=header)
        return future
    answer = []
```
Another example of it's use, just shown from scanning, is seen in the above snippet. Note `session = FuturesSession(max_workers=200)`.

These two above code snippets, when cross checked with the examples shown in the linked [requests-futures](https://pypi.org/project/requests-futures/) pypi page, verify that `requests_futures` are being used in the main script.

## Let's check `git log`

So now that we've confirmed that `requests-futures` is within our main script, do we need the `new overhaul` folder still? Currently, it seems that this may have just been a folder to test `requests-futures`, but lets dig through the `git log`s and see if we can get some more clues.

```
$ git log
commit 4ddf35bb63299d66043bdee79826bb487e1433ce (HEAD -> overhaul-rework, origin/overhaul-rework)
Author: Xavier Ortiz <xavier.ortiz.ch@gmail.com>
Date:   Mon Apr 4 09:12:00 2022 -0400

    minor spelling correction, `README.md` update, and some moving around of functions

...

commit d7a9ef3a31ab460f92813ca56acbbe7ab76e3305
Author: Xavier Ortiz <xavier.ortiz.ch@gmail.com>
Date:   Sat Apr 2 14:08:37 2022 -0400

    overhaul first commit, here we go

commit 6e522081033b6cc6c304d7042cfe904320d2161d (origin/main, main)
Author: Xavier Ortiz <xavier.ortiz.ch@gmail.com>
Date:   Sat Mar 26 15:23:23 2022 -0400

    added a secondary example, just to make sure it was pulling correctly

...
```

After scanning the previous output, there are 3 commits that tell us the story.

The first commit, is telling us that the current `HEAD` is `overhaul-rework` branch. We knew this, but it's good to see this confirmed in the git logs.

The second interesting thing in the `git log` output is where the `main` branch is left off. The commit that follows where the `main` left off has a super interesting message. It states "overhaul first commit, here we go".

From this, it seems that more likely than not, the `new overhaul` folder is part of a new effort. However, we don't know if it's been incorporated into main or not.

## Check commits to view changes

Finally, now we know what to look for, lets analyze the commits to find the definitive proof that this was a test, or otherwise.

Commit [234e7c6](https://github.com/Xavier-J-Ortiz/market_hub_puller/commit/234e7c6810043fe9d2a1958b1bbb9e134e48fbf2) shows that the file within `new overhaul` is created. This was something that I came in expecting.

However, on continuing to inspect the other commits in this branch, I'm surprised to see that that the work done within `new overhaul` folder was not integrated or moved over to the main script.

I am curious as to when I added the `requests_futures` library into the repo, and am going to scan `main` branch to find when this may (or may not have) happened.

Commit [2b81ea5](https://github.com/Xavier-J-Ortiz/market_hub_puller/commit/2b81ea5dbafa97fa9810db71b434b7ae837820bd) shows some work done in the past, where I started to work on the main branch with `requests-futures`.

## Now What?
So, can confirm that `requests-futures` _is_ part of the main branch and main script. It was worked in in October 2021. So what is the purpose of `new overhaul`? It was created _after_ the main branch.

We're going to have to dive deeper than just a quick scan into this script found within the `new overhaul` folder, to find the answers.

Viewing the `fetch_data.py` script within the folder being analyzed, we see functions `create_active_items_url` and `create_all_order_url` that create the URLs for active items being sold in a region, and then creates the list of all orders in a region respectively. Then there is `create_name_urls_json_headers` which creates the URL needed to fetch the names of the items.

From these functions, I believe that the result of the script is to get all active market orders in a region, and their names. Though initially wasn't sure why we were pulling all active items in a region, I believe it makes sense after giving it some thought. The result of all active market orders within the region will help directly feed into the `create_name_urls_json_headers` to build the item id to item name mapping.

# Conclusion

There are then some functions that create the futures, and then actually fetch the relevant data. This leads me to believe that this is probably a much slicker, slimmed down script to pull all the _relevant_ data is needed for my market needs.

That being said, the overhaul is not finished. There needs to be some formatting, storage, analysis, and processing needed, but in my opinion, it is a perfect moment to start to redesign the workflow.

Which leads me to believe that the "overhaul" branch and folder were being worked on and kept there because this was going to be the next big phase.

Now that we have done this research, the next logical step will be to determine exactly what is going on in this script, how those previously talked about functions all come together, and also clean up the script in order to make it a bit more readable and extensible. With that, I'll be able to satisfy my "housekeeping" itch that needs to be scratched, and also allow me to create a fresh branch for any other efforts needed as next steps.

Taking a step back and looking at the bigger picture, I think the next large effort for this project would be to think about _how_ to store said data, and also how to process it as well. Will require some research, though I think I'll start to google and read up on this, starting with search terms such as "data processing REST API" and "storing data from REST API". Will also look into searching if technology such as `SQL` (I'm thinking SQLite as it might have a lower barrier of entry to setup) or the python library [`pandas`](https://pypi.org/project/pandas/) library would be useful for my use case.
