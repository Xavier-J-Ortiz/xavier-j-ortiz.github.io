---
layout: single
classes: wide
title: Creating Redo/Back-off Logic when Fetching Regional Market History of Items

tags:
- EvE
- Python
- Market
---

# The EVE ESI Market History End Point
I have a [market_hub_puller](https://github.com/Xavier-J-Ortiz/market_hub_puller) project which has been in progress for quite some time.

It's a passion project for my market arbitrage characters in a game called [EvE Online](https://www.eveonline.com/signup?invc=420d09fc-3559-4317-b9da-202c8ec0ab65). It fetches prices across all secondary market hubs, and compares them with prices from the universe's primary market hub. With this outcome, I would consider recommended items for purchase in the primary market for subsequent exporting to the secondary markets for sale and profit.

I had the basic functionality ready a long time ago. However, in an effort to gain more insight on items, I wanted to add information from the market history end point. This information will give me about a year's worth of daily sales data for an item in a given region.

An example of the market history end point would be [this link](https://esi.evetech.net/latest/markets/10000042/history/?datasource=tranquility&page=1&type_id=46521).  Currently, at the time of this writing, the aforementioned link is showing the following data:

```
[
  {
    "average": 64860000,
    "date": "2024-08-13",
    "highest": 65000000,
    "lowest": 64720000,
    "order_count": 2,
    "volume": 2
  },
  {
    "average": 300000000,
    "date": "2024-12-13",
    "highest": 300000000,
    "lowest": 300000000,
    "order_count": 1,
    "volume": 1
  },
  {
    "average": 200000000,
    "date": "2025-02-03",
    "highest": 200000000,
    "lowest": 200000000,
    "order_count": 1,
    "volume": 1
  }
]
```

More information on EVE Swagger Interface (ESI) can be found in it's [documentation](https://developers.eveonline.com/docs/).

The idea behind fetching this information is to calculate the weekly item turnover average in the past week, month, 3 month, and yearly time frame for an item.

With this information, an item could be determined as a consistent seller on a weekly basis (on average) across different time frames. This data would give us an idea if the item is a consistent seller, or if there has been a "fluke" short term demand for it.

# The Problem
For every item that is purchasable in a region, the application would need to fetch it's yearly market history via it's unique end point for the region.

From experience in gathering other data from the ESI, I had not had issues in terms of rate limiting. The ESI, generally speaking, is not rate limited _except_ for the market history end point. It seems there is a 300 call per minute rate limit for the history end point ([source](https://forums.eveonline.com/t/esi-market-history-endpoint/387151/45)).

Since a busy region can easily have 40,000 items or more on the market, each item would have a unique URL to fetch it's market history. This would be a lot of requests of data dense information for every item end point. Unsurprisingly, we observe errors given the sheer amount of requests.

Though there is error handling in the application, I did not have any retry/back-off logic present. Fortunately, there is some data in the ESI response header that could be useful for said logic. The values `X-Esi-Error-Limit-Remain` and `X-Esi-Error-Limit-Reset`, which indicate how many more errors will be allowed before being rate limited and how long you have to wait for the error limit to be reset respectively, could be used for this purpose.

Below is an example of an ESI header. Note that it has an allowance of 18 errors left, and a reset time of 4 seconds. Meaning that if I have another 18 errors, I'll be blocked from making other calls, and will have to wait out at least 4 seconds before the `X-Esi-Error-Limit-Remain` gets reset back to `100`.

```
{
  "Date": "Tue, 04 Feb 2025 14:12:56 GMT",
  "Content-Type": "application/json; charset=UTF-8",
  "Content-Length": "72",
  "Connection": "keep-alive",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type,Authorization,If-None-Match,X-User-Agent",
  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers": "Content-Type,Warning,ETag,X-Pages,X-ESI-Error-Limit-Remain,X-ESI-Error-Limit-Reset",
  "Access-Control-Max-Age": "600",
  "Allow": "GET,HEAD,OPTIONS",
  "Etag": "W/7a112f16613270c989f5efeba577c1a954d525d6decfd1c49950de7f",
  "Strict-Transport-Security": "max-age=31536000",
  "X-Esi-Error-Limit-Remain": "18",
  "X-Esi-Error-Limit-Reset": "4",
  "X-Esi-Request-Id": "685f76b8-bc4b-4e4b-924f-3546efc50459"
}
```

A lack of retry/back-off logic in the application can result in an excess of errors, which besides being inefficient and of poor netiquette, will cause issues and crashes within the Python application.

# The Bad Sleep Timer Assumption
Previously, the application was not handling the retry or back-off logic properly due to my misunderstanding of the python library, [requests-futures](https://pypi.org/project/requests-futures/).

In short, previous attempts at creating retry/back-off logic for futures were not made correctly. The thought was that adding a `sleep` of the amount of time specified in `X-Esi-Error-Limit-Reset` after creating futures would "freeze" any in flight futures from additional requests to the ESI, and in turn, halt any additional errors. This was a bad assumption.

The idea looked something like this:

```
pages_futures = create_futures(urls)
# in the wrapper function, error_timer = X-Esi-Error-Limit-Reset
pages_results, redo_urls, error_timer = futures_results(pages_futures)

if error_timer != 0:
    sleep(error_timer)
while len(redo_urls) != 0:
    pages_futures = create_futures(redo_urls)
    pages_results, redo_urls, error_timer = futures_results(pages_futures)
```

In the example code shown above, `create_futures` and `future_results` are wrapper functions of `requests-futures`, of which we don't need to go deep into. The `urls` variable are the URLs of all of a region's items. In some regions, there are over 40,000 items on market. Each of which has a unique URL that would need to be called.

The application is trying to sleep after parallel bulk fetch of 40,000 items (with unique URLs). However the sleep would not stop any of the 40,000 in-flight futures created resolving all of these in parallel.

Lets be generous and assume that after 38,000 calls, errors commence. I would have about 2,000 errors in queue, before I would be able to sleep off the `X-Esi-Error-Limit-Reset` timer.

After a while of receiving all these errors, `Python` would crash due to not being able to handle the sheer size of actions and errors (and having to re-do them, and possibly erroring again).

Now, the maddening part about this is, depending on what time of the day the application is run, many errors are observed when fetching history, or none at all 🤷. This made it difficult to troubleshoot.

Another piece that made troubleshooting difficult is that the information within the errors themselves will lead you to believe that the issue lies on the application end, given the error output, even if it is an issue on the server or ESI side.

# What was Actually Happening on the ESI

From conversations that I had in the `tweetfleet` slack channel, and other information from the `EvE Online` discord channel, it seems that the underlying issue is one of these two scenarios.
- The information at the end point is not already built when the user request occurs, and it takes a moment to create and process.
- The information at the end point _is_ built before user request, but given the high request rate (40,000 at a time), the caching process isn't able to keep up and eventually starts erroring due to the volume of requests.

Whichever the scenario, the end result boils down to the errors not being ready to be served to my application.

This is empirically confirmed. If you wait about 6 hours or more after the endpoint refresh time you'll observe less errors, during which fetching the market history data is manageable without any retry/back-off logic.

I did not get a definitive answer about which scenario is what is occurring. But, either way, improved retry/back-off handling on errors is needed in order to take [CCP games](https://www.ccpgames.com/)' recommendation.

# Incorporating Redo/Back-off Logic

With the `create_futures` wrapper, I was providing the URLs and then letting `requests-futures` create futures for all of them in bulk. I thought that a future was not an actioned HTTP request. After some thought though, I should have been treating it as such.

Though a `future` _is_ an HTTP request "in waiting" and allows flexibility to call other futures in parallel without having to sequentially complete before starting another HTTP futures request, they should effectively be thought of as a regular HTTP request. Calling in parallel has the advantage of being able to do a lot of calls all at once, which saves time. But, in the event of an error due to a bad state of the ESI or a genuine application error, you will also get a lot of errors in parallel all at once.

Instead of doing all the 40,000 calls for a region all at once, I opted to create futures in chunks, determine if they have an `error_timer`, and if they do wait it out before fetching the next chunk of URLs. This would repeat until all of the URLs for a region were actioned.

The code example ends up looking like this:

```
chunk_length = 100
i = 0
# create a list of (at most 100 url) lists called `urls`.
for url in len(urls):
    chunk_modulus = (i) % chunk_length
    if chunk_modulus == 0:
        urls.append([])
    urls[ i // chunk_length ].append(url)

for chunk_urls in urls:
    pages_futures = create_futures(chunk_urls)
    pages_results, redo_urls, error_timer = futures_results(pages_futures)
    for result in pages_results:
        deserialized_result = json.loads(result.text)
        deserialized_results += deserialized_result
    # sleep before actioning `redo_urls`
    if error_timer != 0:
        print(f"Sleeping order fetching due to error timer being {error_timer} seconds")
        sleep(error_timer + 1)
    while len(redo_urls) != 0:
        pages_futures = create_futures(redo_urls)
        pages_results, redo_urls, error_timer = futures_results(pages_futures)
        for result in pages_results:
            deserialized_result = json.loads(result.text)
            deserialized_results += deserialized_result
        # sleep before redoing any erroring `redo_urls` or before moving on to next `url_chunk`
        if error_timer != 0:
            print(f"Sleeping redo order fetching due to error timer being {error_timer} seconds")
            sleep(error_timer + 1)
```

# Further Improving the Handling of the Market History end point

Even though this improvement has been implemented already ([link](https://github.com/Xavier-J-Ortiz/market_hub_puller/pull/19)), there are further considerations to think about for improving the application and user experience.

- Though I am using the `X-Esi-Error-Limit-Reset` timer to create a `sleep`, I am not _explicitly_ doing anything to follow the 300 calls per minute rate limit for the history end point ([source](https://forums.eveonline.com/t/esi-market-history-endpoint/387151/45)).
  - Project issue [#23](https://github.com/Xavier-J-Ortiz/market_hub_puller/issues/23)
- Make fetching the market history a stand alone process, independent from fetching all other market data for a region.
  - Project issue [#24](https://github.com/Xavier-J-Ortiz/market_hub_puller/issues/24)
- Fetch market history only if saved data is stale
  - Project issue [#16](https://github.com/Xavier-J-Ortiz/market_hub_puller/issues/16)
- Provide the URL of the item, instead of a full market fetch by the application, for subsequent processing if required or deemed necessary
  - Project issue [#25](https://github.com/Xavier-J-Ortiz/market_hub_puller/issues/25)
- I am seeing python crash from time to time when running the application. Mainly after error handling, the application has crashed due to a `Lookup Error` of an item. It happens sporadically, so difficult to troubleshoot.
  - Placeholder project issue ([#26](https://github.com/Xavier-J-Ortiz/market_hub_puller/issues/26)), as am unable to reproduce.
