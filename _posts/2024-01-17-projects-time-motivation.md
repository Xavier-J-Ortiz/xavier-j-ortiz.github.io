---
layout: single
classes: wide
title: Finding Time with Shifting Priorities

tags:
- life
- projects
- career

---
When I started this blog, I had just gotten married and we lived in a rented apartment in Brooklyn.

Since then, we've had a beautiful daughter who is now 5 years old, have moved to the suburbs, and are definitely well into a different stage in our lives than when I started this blog.

Because of all of this, needless to say, I have to spend my time differently given different daily priorities and motivations.

# Time and Motivation
I had initially started this blog effort in order to showcase any projects I might have had when I was at an early stage in web development and programming.

Back then, I wanted to find a role where I would be writing code for a living in some capacity.

It took a bit to reach the goal, but I can safely say that this goal has been achieved.

Today, I'm a Site Reliability Engineer, a role that requires writing code, though not 100% of the time. This isn't a bad thing. It does leverage a lot of my previous experiences in Linux, networking, cloud computing, CDNs, Terraform, customer success skills, and troubleshooting. Because I grew into this role, and moved laterally to get here, I didn't have to take a financial hit while arriving.

So, my original goal has been achieved. Because I _still_ do want to write code as a developer, I should continue to work personal projects that I can find motivation for and showcase my growth in programming. Not necessarily because I want to find a different role, but because I actually enjoy it, and think that the development experience will help me in my current role.

Though I still have motivation and interest in doing them, I find myself fatigued at the end of the day. So I end up doing anything but these projects, mainly brainless or leisure activities.

On top of that, I've recently started at a new company due to an acquisition. New companies mean new processes and new things to learn. I'm about 2.5 months in, still getting used to the role, at the end of the work day, my mind is exhausted. So when I do have free time, I want to veg and do non-productive activities after work.

Mind you, I don't immediately just turn into a mindless mush as soon as I disconnect from work. I spend quality time with my family, and am 100% there for them of course.

All this is to say, I have much less time available for personal projects, have less motivation, and have less bandwidth to do them than before.

# Finding Time and Motivation to Focus

"Finding time" is a bit unfair to say. I know where the time is. And there is _some_ time. Just a lot more things competing for it, on top of my mind being fatigued from the day. Think of Lois in the clip of [Stewie trying to get his mother's attention](https://www.youtube.com/watch?v=6W8t7JOX6i0). It feels like that some times.

The best time for projects is when everyone is in bed. However, when everyone is in bed, it's late and I probably have to go to bed soon too. Though not ideal, this is probably the best scenario that I can find myself on semi-consistent, daily.

The down side of this "best scenario" is that sometimes I get into a flow state, and I can't ride that wave because it's late. So that means that mentally there are going to be diminishing returns if I ride that flow state for too long because it's late. If I do ride the flow state, I might not realize I've hit a wall due to it being late, and I'll pay the price of being exhausted the next day. This constraint is something that I can't really get around too much since we do need rest.

To get around this, I have to be mindful of every minute I spend on a project has to be fully dedicated to that project. I need to focus when I find time. No self-imposed distractions.

# Current Portfolio Section
As a disclaimer, my web app projects _currently_ on this site point to nothing. I mean, the description section is still there, and the git sources are also still there, but the web apps themselves aren't showcased or reachable.

The reason for this is:

* They are old projects.
* I've moved to hosting this `jekyll/minimal mistakes` blog to github pages. Hence, the old projects were hosted on my old webserver are not reachable. May try to work through getting the web apps hosted on Github Pages, which may or may not be possible.
* The projects are quite outdated in terms of reflecting my skills. I've done things recently at work that make these projects look basic and simple.

I plan to remove the current projects, or update the verbiage at least so that this is clear, but that has yet to happen.

## So What Will I Showcase?

I have 2 possible applications that are rough, but are much more up to par with my skills and work. Both applications are linked to the game Eve Online.

### Intel Tool
One is an intel program, which scrapes Intel logs and warns me if there is a bad guy within a predetermined number of jumps from where I'm located.

That way, I can be doing a mindless activity, and if something is reported on Intel, I'll have an advanced warning that the bad guys are coming, and can go from mindless mode to alert mode and not become prey.

It's a CLI tool, that runs on Linux, so might be worth looking into putting together a "packaging" for python on this one, that way it doesn't depend on dependencies to run.

Besides that, improving this tool further could encompass a GUI.

### Market Tool
The second application that I have is basically a market intel scraper, where I can compare market prices between Eve Online market hubs to find interesting items for arbitrage. It uses the Eve Online API to fetch relevant data, which is then processed and formatted for use.

This is a fun thing I used to do when I played the game. Very useful in the real world as well, as I have to figure out how to fetch, scrape, parse, format the API into useful data.

I have the preliminary logic setup. But the program can be improved a bit as it's all CLI output. Clunky, and definitely can be improved loads.

Among the improvements to be done:

* **Presentation** - The program just outputs text data. I'd need to find a way to use that data and leverage it in the game. Finding a good presentation for this would be ideal.
* **Linking searches and items to a Character** - There is a way to authorize your character to an application, so that  additional REST API that is accessible that will allow you to access in game market window for an item that is owned by a character in the game. This could be invaluable in game as if I am being undercut on an item, I could identify the item and immediately have that link setup so that when I click it, it pulls the item up, and update my order. Can save some time in searching for items I'm being undercut on. Any time saved in terms of tedium is time gained for other things, and less tedium means less burnout.
* **Paste Buffer** - Copying output into desktop buffer to paste somewhere useful.
* **Requirements packaging** - As with the previous project, figure out how to add requirements to a project to allow more flexibility with python.

### Work I Wish I Could Show
There was a really interesting effort I did at my previous company. I created a script that created functional Terraform from a customer's Azure Resource Management file representative of their cloud footprint.

Of course I can't put this work up, because it's proprietary. But from a professional progress point of view, I wish I could because I learned so much from it. It was large, complex, yet worked.

In any case, it got me working with Terraform and understanding it better, and I'm a better person for it.

# Being Practical with Time Spent

This is where I can do some mental motivational trickery:

1. Working on a personal project is `Good`. Shows self motivation and curiosity.
2. Working on a challenging personal project is `Better`, as it shows deeper curiosity and higher problem solving skills.
3. Working on a challenging personal project that can save me time in a video game leisure activity is `Best`, as not only does it showcase all of the above, but also is _motivating_ for me as it will help me on something that I like to do for fun.

So, item #3 is a sweet spot. Finding a project that is challenging so that you can showcase what level you're at right now, as well as applying it to real world scenarios is crucial for a Portfolio projects. Mainly because it shows you've moved on from tutorials and are applying real world solutions via programming.

Also, #3 is _fun_ to do, as when completed, it'll help in a _fun_ leisure activity. This is key to motivation and continuing forward with the project. Otherwise, you'll reach burn out and have abandoned projects, which are the worst.

## On the topic of incomplete projects
A project is never _really_ incomplete. You can always find something to improve. Perhaps new features or extending it might be something to tackle. Sometimes a refactor might be useful.

When I say complete projects, it means that you've reached a usable minimum viable product (MVP). With this, you can get up and start using it as is. Anything else on it is an improvement or polish.

Not that a project might have reached as far as it might go, and be fully mature, but it's always nice to look at a project a couple of months down the road, and see things that could improve, make it better, or make it more efficient.
# Time saver: Avoid Blogging for the Sake of Blogging

Writing about things without a point is not helpful. I've made sure that I don't write just to be filler. Filler helps no one on a personal blog site. It's not good for anyone, and it's a waste of time that could be better put into something else.

Writing something thoughtful takes time and effort. Fortunately, the publishing part has been streamlined through Github Pages, but typing things in, proof-reading, making sure that what you're writing makes sense and isn't just gibberish takes time to create. Time that could be better put to use towards completing a project.

I say this because when I started writing this post, I asked myself it if was worth my time.

Because it has been a while since I worked on my personal projects, I needed to find focus, assess where I was, remind myself what the goal is, and think about what projects I could improve or work on next.

I have improved a lot at my previous job in terms of programming, I needed to give some thought as I have a different (hopefully better) view of programming and projects.

This post has helped me with focusing on that and forces me to think about where to start.

Arguably, I could have taken a note pad and jotted down these ideas in short hand and saved me a bunch of time. This post could be seen as overkill, but the good thing about writing something thoughtful out and publishing it in public gives the ideas and motivations thought of here more importance. So not only did I give my intentions and ideas importance by typing them up, formatting them, proof-reading, and creating a space to express them on the internet, but also by putting in a public space will keep me accountable. At the very least, on a sub-conscious level.
