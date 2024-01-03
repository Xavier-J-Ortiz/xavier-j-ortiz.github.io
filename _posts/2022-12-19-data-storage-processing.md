---
layout: single
classes: wide
title: SQL, Pandas, or Python Dictionary for Analyzing Data
tags:
  - SQL
  - pandas
  - python
  - data storage
  - data processing
  - EvE
  - API
  - JSON
  - research
---
I've done a review of the [`market_hub_puller`](https://github.com/Xavier-J-Ortiz/market_hub_puller) repo that is my current project. It seems that I've done a slight overhaul on how to fetch said data, and have left it at that.

Though the main branch does fetch and format the data as expected, it does things in a very slow way. It uses the python dictionary data structure, and then pickles it to preserve the data in the short term.

However, this is less than ideal. Pickling is time consuming, and the dictionary data structure being pickled requires that the data be loaded via python in order to load and analyze it, adding an additional layer before I can sift through the data.

So, in order to analyze it, or even present it, I would need to unpickle a set of harvested data, and then format it into a more presentable format besides just working on the presentation.

Given the `overhaul` script is fetching things in a much more streamlined and cleaner way, I'm taking the opportunity to also think about the data storage and presentation in a different light. Mainly, for analyzing in the short and medium term, as well as to have a easier data structure when thinking about the presentation.

But what should I use?

# First, some research
To mind, it seems that the best way to process data would be either SQL or use Pandas data structure.

However, I want to check what the consensus is by doing a quick google. Nowadays, it would be a waste to not find a couple of articles, read what they have to say, and use their conclusions to form a better opinion about the tools available and their current landscape.

# Side Benefit Learning
In searching, the first thing I noticed is that there is a lot of info on fetching said API data. Finding articles on how to process and store, which is my main objective of this research, is a bit more involved.

However, there _were_ some nice tips that I found. Though I did not save these articles as they were many and would distract from my main goal of research, there were some repeated things that I found in them.

- Keep an unmodified copy of the source data
- Create and Keep metadata (documentation)

## Keep an unmodified copy of the data
The reason behind keeping a copy of unmodified data is quite obvious. Mainly because if your end goal is another cut of data, it's better to have the unmodified cut saved, just in case you plan to do other things later on, you have a copy that you can play with without having to do a fresh pull, or create a new script to do this for you.

## Create and Keep metadata
On this second item, have never heard documentation be called metadata, but of course, totally makes sense. Documentation will help others use your program, as well as remind future you of what the heck you did, and perhaps why you did it.

# Main Research
After refining my search terms a bit, I started to find a lot of articles that were recommending SQL, or Pandas. One over the other.

Main reasons to choose pandas was flexibility in doing the data processing and leveraging the python ecosystem as a whole.

The main reasons found recommending SQL were, of course if you had a Relational Database, and the other was that once you know what you want in terms of the outcome, you can optimize said searches for speed and can be done more efficiently.

When searching solely on storage, I found articles talking about libraries such as `pickle`, `feather`, and `msgpack` for storing. Mainly, a lot of articles comparing speed tests on these technologies.

The storage aspect of my research me reconsider and think if I should even incorporate any of these storage libraries at all. That is, if for my project, would speed be a factor considering, given the size of my data set.

Worth mentioning, most articles, regardless of the technology they were espousing the advantages of, had a disclaimer of sorts saying, "In this article XYZ library/package/technology is best for this type of data, but doesn't not fit for every type of scenario and may not fit yours".

Bringing me back to some planning, and turning my eyes within to ask important questions.

# What do I need in the project

There are a couple of stages that I can think of for this project:

- The data harvesting portion is already achieved for the ingest of data by leveraging `requests-futures`. It allows to pull multiple REST API end points in parallel, and not serially. The JSON data is saved currently to a dictionary, but this can be easily changed once we gravitate to a better data structure decided in a latter phases.
- Considering Pandas and SQL, I would like to do the data processing in one of these two technologies. Both of these libraries are useful as I can do data operations on them to get closer to my end goal table or data frame. Once chosen, I'd circle back and import the data harvested via API REST directly to that technology and start to apply operations and other data processes.
- Though different end application when compared to the previous data processing phase, storing relevant data does have some overlap. Though not the main immediate focus, at some point in the future, we would like to be able to have the original source data accessible, as well as the processed data as well. Some data storage technologies like  CSV, SQLite, or a pickled/feather/msgpack data frame were mentioned in my research. There are advantages and disadvantages to each one. But two mainly stood out above others for this use case. CSV can immediately be read without any additional technology layer other than a text editor, making it an idea candidate for an easy peek at data. Another technology is SQLite , which can leverage `SQL` technology of RDBMS and the lower barrier of entry by not requiring a dedicated SQL server by using SQLite. Though other technologies mentioned are useful, it requires loading said saved data structures within python in order to be able to check and manipulate said data. The end goal _could_ be a CSV file as the output of the source data as well as the processed data. Maybe keeping copies of old data could be done by compressing old files if a new cut of data is created.
- In terms of presentation, I could generate some type of ephemeral or static google doc with formatting in it already, which could help with high sec arbitrage effort, or have the output be in a web app.
- Eventually, I could also incorporate some authentication, which would allow me to create links that would pop up the market window for an item within a specific market character for each dataframe/table, since each dataframe/table would be a single character's domain. For this, a webapp would probably be easier to incorporate than a CSV to google sheets.

# Conclusion
After looking at my project in a different light, I will look at this from 2 separate use cases.

For data harvesting and processing, I believe the best way to go about this would be to use pandas. I could dump the REST API JSON into a pandas dataframe, then do the data processing and generate something useful all within the python ecosystem. Additionally, if I choose to present my data in a python html framework, I believe that pandas would make my life easier.

In terms of storage, I think that pickling, or any storage of a python data structure would be out of the picture. Mainly because storage would pigeonhole me to use python for analysis of a certain dataset. I think currently, perhaps a compressed `CSV` file might be the solution. CSV would be ideal since I could import to SQL or Google Sheets if needed, while being text compressed. I could not do the same with a pickled dataframe, at least not without having to go through python first.

Though I would like to use SQL for this project, I think that unfortunately it doesn't make sense given the flexibility of pandas, the fact that I don't need a RDBMS, and the smaller dataset size that I'll be using. I cannot justify using SQL in this case. Perhaps if my operations grow to other regions within eve, and the subsequent rows grow to over a million, it might make sense.
