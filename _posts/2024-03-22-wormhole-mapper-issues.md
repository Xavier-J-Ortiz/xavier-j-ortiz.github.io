---
layout: single
classes: wide
title: Wormhole Mapping Tool Dilemmas

tags:
- EvE
- Docker
---

# Thought all was well
I haven't played EvE in quite some time. When I was a bit more active I had a wormhole mapping tool to use in game, and late last year, decided to move everything from a single huge monolith to docker. It was quite an effort, but achieved getting `Nginx`, `MariaDB`, `PHP-FPM`, and `Certbot` all working together in harmony.

However, soon after getting the tool to work on docker, I stopped playing for a while! Because of this, I had not caught some bugs.

# Issues Noticed, and Troubleshooting
Was having issues adding and/or updating signatures.

From trying different things, on the faulty view, I've noticed:

* It does seem like the signatures get loaded onto the page, even if they don't get rendered into view initially
* One way to render signatures that are not showing up is to toggle the sorting on the main field name of one of the signature column.
* Another way is to type something into the comment of the system. This makes it so that if a system has a comment, it _will_ show the signatures as expected.

Certbot doesn't have anything to do with this issue, so we don't need to go look at this service with a fine tooth comb.

Unfortunately, errors were not very useful. The only errors observed were DB errors complaining about the `mysql` database, which does not inform the tripwire app. These errors were fixed in order to reduce any noise in the logs.

I tried to install different modules into `php-fpm`. `opcache` is one that sticks out due to it being a suggestion that pops up a lot when pages are being unresponsive.

I've updated the MariaDB version of the container, as well as updated the `php-fpm` container to no success.

Without any smoking gun to show for in logs, it has been fruitless troubleshooting and to be honest the next step would be to reach out to the `tripwire` app's discord, which I'm already on.

# Alternative to Tripwire

Foreseeing the amount of time needed to pour into fixing the issue, I thought it would be a good time to try out another wormhole mapping tool.

`Pathfinder` is a very well known mapping tool, and is quite a good looking too at that. The original project has been take up by other people, and _also_ has a separate repository where things can be containerized, which is exactly right down my alley.

https://github.com/goryn-clade/pathfinder/
https://github.com/goryn-clade/pathfinder-containers?tab=readme-ov-file

This is great as I don't have to putt around figuring out what containers and services to use to get started with this app.

The Container repo has some instructions that are _easy_ to follow, and voila! In less than an hour I have `pathfinder.xavierjortiz.com` spun up on a separate VM!

Also, they have white lists of who can or can't use the app! I had been looking for something like this within `tripwire`, but it doesn't seem to have this feature. I can white list characters, corporations, or alliances, which is straightforward and simple.

## Great tool, just not for me

I gave it a shot for about a week or so. There were some minor nits that for me, made `tripwire` superior.

One thing I remember was needing to right click every WH connection "tube" between systems to update some information about it. Particularly if I wanted to update the wormhole being EOL. This was much more straightforward in Pathfinder, and did not require actually going through signatures to _only then_ be able to update the life cycle of the wormhole.

Another difference was that systems that were no longer connected stayed in the `pathfinder` map. Required extra clicks to cleanup and could cause a bit of confusion.

On `tripwire`, on a new day, if you pasted in the new sigs and used the easy delete function to remove old sigs not present in the system, the non connected systems would disappear from the chain. Very nifty.

Also, `pathfinder` felt more like a large map where you drop important connections to your little etch-a-sketch.

`tripwire` seems more "chain" oriented, where you have a central focus system, and as you scan, you branch out of it... building the wormhole tree map that would represent the chain. So you focus where  you're living out of, and just on that.

If someone's chain that is sharing their map with you happens to link up with your chain, you have an extended map to different places, for a short while at least.

I gave `pathfinder` a college try, but unfortunately, it wasn't going to work for me.

 Did some spelunking, and I fixed `tripwire`!

Though I was able to very quickly deploy `pathfinder`, I preferred `tripwire`.

I decided to just start to emulate the hints that were on the `docker-compose.yml` file from the `tripwire` repo.

You might ask yourself, "why don't you use this as your `docker-compose` instance and call it a day?". Unfortunately, the file is quite out of date, and the versions of some of the os base, as well as the versions of `php-fpm` were a bit out of date. Thought it was a good idea to just start fresh.

Also, I wanted to learn docker, and I wouldn't learn much if I took an existing set of scripts and files and just ran `docker compose up`.

I did a deep dive, looking at the `docker compose logs` of my cluster. Not much information as before, but I also did ask in the `tripwire` discord for any hints. Though I didn't get much, they did at least confirm that it was a _me_ problem, and not an issue with `tripwire`. Doesn't sound helpful, but it is very helpful as it points to something that I might have configured incorrectly.

I saw some new `warnings`, some sporadic `root@localhost` issues from `mariadb` container. But that turned out to be a red herring. Nevertheless, I did clean up the user situation in the database, just to discard that `mariadb` was the culprit of my woes.

Started to look at differences of things that were used in the `tripwire` repositories. I streamlined a bit of the networking portion of my docker-compose file to make sure that extra overhead was not causing the issues. I flattened the network by removing per container IP address assignments, as not needed if I refer to the containers with their name referenced in the `docker-compose.yml` file.

I noticed that my `php-fpm` `Dockerfile` was missing a couple of references to files when compared to the repository's version.

One was `php.ini` as well as the `www-conf` as well. I added these and restarted `docker compose`, only to observe that I could not reach the wormhole tool anymore!

I started to look at every variable, and figured out that `session.save_path = "/var/lib/php/session"` mentioned in the php.ini file, or more specifically the path `/var/lib/php/session` did not exist! After creating the folder, still had issues. Read up a bit on the topic, and noticed some suggestions on stackoverflow that this folder needed `www-data` permissions for it to work properly. So, this was remedied by `chown -R www-data:www-data /var/lib/php/session` in the `php-fpm` container.

Voila! This fixed my issues!
