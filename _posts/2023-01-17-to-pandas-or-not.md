---
layout: single
classes: wide
title: To Pandas, or not to Pandas
tags:
  - pandas
  - python
  - data processing
  - EvE
  - API
  - research
  - execution time
---

# Research on Pandas
I've created a branch on my [market_hub_puller:DataFrame-Only](https://github.com/Xavier-J-Ortiz/market_hub_puller/tree/DataFrame-Only) which leverages the pandas library, and uses the data structure native to pandas, the [pandas.DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) to organize, manipulate, and store data.

My research prior to Pandas mentioned that it was "faster" and more efficient in the long run when dealing with large data sets.

The data sets used are market order data in a game called [Eve Online](https://www.eveonline.com/signup?invc=420d09fc-3559-4317-b9da-202c8ec0ab65). Long story short, there are multiple market hubs in the game where trade happens more than other neighboring hubs. I'd like to fetch this market data and use it to my advantage for market hub arbitrage by outputting it in a useful CSV, presentable webpage, or other medium.

I already had a working model, however, it was very bulky and when I last touched this 8 months or so ago, I had already started to re-write it in a more efficient way, and decided to use this new start to learn a new data structure native to pandas, the DataFrame.

Reason being, pandas DataFrame seemed to pop up whenever the conversation of organizing, processing, or analyzing data on python was talked about. However, I was concerned that the overhead of the additional library and data structure would make the analysis and processing of the data slower than using python native data structures.

When researching on how fast pandas could be, I always found articles espousing that Pandas would be faster for analyzing data, though always with a caveat that for other scenarios outside of the one shown on the article, this may not be the case. So, my conclusion was inconclusive, or rather, that _maybe_ the DataFrame might be faster for my use case, but would need to be optimize for the use case.

Also, I did read a lot of comparisons between pandas and SQL in these articles, a query language which I had a personal desire to brush up on, as it had been quite some time since I used it. Given the similarities in terms of applications between them, the ease of use in implementing pandas in python, and the faster execution time in pandas vs an unoptimized `PostgreSQL` server made it a no brainer to use pandas vs a SQL implementation via python.

So, armed with this information, that pandas DataFrame was the structure to use vs SQL if writing something in python and might or might not be faster than using the native python data structures, I decided to use the pandas DataFrame.

# Implementing
After doing some additional research on how to implement, it was quite easy and straight forward to implement python dictionary data structures to a DataFrame. Using functions such as [`pandas.from_dict`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.from_dict.html) made it very simple to do this with structures already collected using `requests-futures` library. Additionally, [`pandas.read_csv`](https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html) was useful in importing saved CSV data that had been previously fetched and saved.

After importing, and doing a first implementation, I realized that there were some optimizations in terms of how I was manipulating data within these structures, mainly because I was iterating over each row, checking each entry within the row, and then manipulating said row. This apparently is _very_ inefficient as there is a large processing cost between switching from python to pandas to python to pandas.

# DataFrame native alternatives to iterating

This is where things get fun and interesting!

In researching how to best use Pandas to analyze my data, I had read many articles that suggest that you should use the internal functions to search, filter, organize, and parse when using the Pandas data structure, and this would require a bit of thinking. Mainly because sometimes, as someone who writes code in Python, your go-to is to iterate via some sort of for or while loop. I noticed that there were a couple of functions that might be useful in this case.

It also requires some knowledge of searching in databases, which I fortunately have had in past experiences.

## Using Conditional Filtering on a DataFrame
Instead of going through each row, evaluating via an iterator, and then either deleting the rows that don't meet the conditional, you **should** use conditional filtering instead.

I say **should** because it is actually the recommended way to filter rows. Doing it through an Python iterator is not a good idea as it would require the DataFrame to go back and fourth from it's structure and python structures, which would eat up some CPU cycles given it would be translating stuff between Python and Cython from what I understand.

An example used of a conditional filter is as follows:

```python3
filtered_hub_order_data = data[
    (region_all_orders.location_id == int("12345"))
    & (region_all_orders.is_buy_order == False)
]
```

In the above example, I'm filtering each row on the `location_id` that the order is found at, as well as making sure that the order is a Sell order and not a Buy order.

## Using `DataFrame.groupby()` and `DataFrame.agg()` to find relevant rows
`.groupby` and `.agg` were important in my process because I needed to find minimum sell prices between a group of buy orders of the same item within a given market hub.

In this example, since Jita would be my source hub, I wanted to find the least expensive sell hub within this market hub that I could buy an item for. This would basically make up the largest cost of my arbitrage operation, since this would be the lowest price I could source an item.

```python3
jita_sell_value = filtered_jita_sell_order_data.groupby("id", as_index=False).agg(
    {
        "price": "min",
        "volume_remain": "sum",
        "volume_total": "sum",
    }
)
```

This would return a row for each item in which the lowest price would be captured.

## Using `DataFrame.merge()` between multiple rows
In building the new dataset, using functions and operations that are familiar to database manipulation found within DataFrames can help immensely.

In my use case I needed to `merge` a couple of databases together. Mainly sell orders that are to be sourced in the main trade hub (Jita), and sell orders from a secondary trade hub where I would sell at. Lets say for this case, Amarr is the secondary trade hub.

I would want to do an outer merge. Mainly because I want to have all the Jita data merged with all the secondary hub data if a sell order exists in Jita. If not, I'd still like to know because it might be very profitable or a good move to buy said item since there isn't any item in the secondary trade hub. That is, if there is no supply in the secondary trade hub, it might be a good item to look into if the volumes are good and there is sleepy competition. Also, I'd like to know if an item in the secondary market is available, but not in Jita. In this case, could be a short window play, but potentially could move that item to Jita to sell for a quick buck as I'd be the only one in the market.

The merge would look something like this:

```python3
amarr_sell_value.merge(jita_sell_value, how="outer", on="id")
```
Where the join of the two DataFrames would be on matching orders for item `id`s, however, because of the outer join, if either side is join on the id search, the row is still added, with the missing side as null.


## Using `DataFrame.apply()` with lambda functions to process data to actionable data
I believe I applied this in not the best way, but would need to do some research in order to verify it this is the case or not.

In essence, it comes down to using a function and applying it to a DataFrame. This is a much more efficient way of applying some processing on rows than doing it over an iterator.

In this example I used it the following way:
```python3
def process_data(processed_hub_row, region):
    hsv = processed_hub_row.price_x
    jsv = processed_hub_row.price_y
    jbv = processed_hub_row.price

    processed_hub_row["diff"] = hsv - jsv
    processed_hub_row["sell_margin"] = 1 - (jsv / hsv)

    processed_hub_row["sell_margin"]

    processed_hub_row["buy_margin"] = 1 - (jbv / hsv)
    return processed_hub_row

...


df = amarr_sell_value.merge(jita_sell_value, how="outer", on="id")
    .merge(jita_buy_value, how="outer", on="id")
    .apply(lambda x: process_data(x, region), axis=1)
```

In this case, I'm applying a couple of merges as explained before, and then applying a function to them. The function, on a high level, is doing some basic operations between existing rows within these previous merges which would be helpful to evaluate if an item is or isn't a viable candidate to arbitrage. Then adds them to the DataFrame as new rows.

This is the preferred way to do some function processing, instead of using a python iterator over all the rows of a DataFrame. It is much more time efficient.


# Conclusions

Pandas has a lot of built in functions which save time instead of building similar functions to do similar things. Also, makes reading said code much easier. There are advantages to this, especially when dealing with large data sets.

Also, I got to recall a lot of the concepts used in `SQL`, a query language that I wanted to brush up on. Though no `SQL` was used, I did recall many concepts like `RIGHT/LEFT/INNER/OUTER JOIN` through `.merge` and `GROUP BY`, `ORDER BY` through `.groupby` function, which are the fundamentals of the syntax.

However, in testing, noticed that for all the processes needed to yield the final actionable DataFrame took much longer to execute than running using everything via native python data structures. The execution time in using Pandas DataFrames took about 1 minute 15 seconds long, which doesn't include the harvesting of the data from the API (~25 seconds) vs 49 seconds using native python dictionaries!

26 seconds doesn't seem like much, but at this moment, the advantage and functions built into pandas DataFrames are not a huge advantage in this project. In fact, if down the line the pandas DataFrame is useful for other data analysis, then we'll cross that bridge when we get there, and use the CSV data generated from this first phase to feed the new analysis using a pandas DataFrame. But will have to keep in mind the slowness of the data structure.

Additionally, I found out recently about another data structure that, essentially is a faster Pandas library. This data structure library is called [Polars](https://www.pola.rs/). A self described "Lightning-fast DataFrame library for Rust and Python", seems to address Pandas and it's slowness shortcomings. Might be worth a look in the near future, at least to see if it's comparable to Pandas in terms of functionality.

For now, I will continue to use a dictionaries and lists, together with iterators. If the need for a DataFrame outweighs the speediness of native python data structures, then we'll make that decision down the line to use Pandas or Polars.
