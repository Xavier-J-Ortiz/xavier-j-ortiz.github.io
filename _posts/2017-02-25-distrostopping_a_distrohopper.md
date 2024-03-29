---
layout: single
title: Distro-stopping a Distro-hopper
tags:
  - Linux
  - Debian
---

To the uninitiated, a distro-hopper is someone who hops from Linux distribution to Linux distribution, trying out the different flavors that this marvelous OS provides.

I believe that I have tendencies to do this. However, for the past 2 and a half years, I have been, mostly trying to stick to a single distribution. In this time frame, I initially settled for Fedora. However, after a couple of months, and an uninspiring/problematic migration from Fedora 21 to Fedora 22, I migrated almost all of my systems to Debian stable (then and currently Jessie) except for a single CentOS laptop that I kept for work purposes. I moved to another company in late 2016, and then, all my systems were on Debian stable. Including my wife's laptop.

However, there's always an itch to try a new distro. To install something new, with newer software at the core.

Fedora is awesome in it's own right. The problem I had with it were packages. There were packages that were not on Fedora, that were located on Debian by default. VirtualBox, which I need for work, works properly and is in additional Debian hosted repositories 'non-free'. I had to install a different repository for VirtualBox to work on Fedora. It had some extra complexity in Fedora, due to kernel modules needing akmod, kmod, or dkms to run VirtualBox properly. Since VirtualBox was in a Debian repository, it had the Debian way of installing it ingrained and would install automatically without having to do anything extra in order to get the kernel modules to work.

Not that I don't have to use 3rd party repos for other programs now, such as slack, or google-chrome. But I have to use these in Fedora also.

Though true that Fedora has way less packages, you could complement the Fedora repositories with highly trusted 3rd party repos. [RPM Fusion](https://rpmfusion.org) is a trusted and an extremely popular 3rd party repository that I had used. Really brought a better experience to Fedora.

Also, stability was another factor. Not stability as in, 'doesn't crash', which also is factored in. But stability as in the state of all packages in a distribution. In Fedora, the refresh cycle of a distribution is 6 months. So, for about 6 months, Fedora focused it's resources on the most recent release. After the first six months of a release, there are an additional six months of support, however this is just mainly limited to critical bug fixes and security updates.

Debian's much slower release cycle makes for a longer 'standing' release. Debian Jessie was released in late April 2015. As of this article, this is still the stable distribution of Debian. However, right now there has been a freeze for the next distribution of Debian. Code name Stretch, it should be released somewhere in the first half of this year. Currently the freeze is used to suss out any bugs that would not make it worthy of the 'stable' label.

So, why have I written a bit on both of these distributions? Well, because in these past 2ish years, I've had to stave off wanting to install other distributions because I am using Debian stable.

Fortunately, I've always asked myself the question, if I do choose to hop, is there a good reason to?

The answer to this question is, there always is a good reason to hop. However, is it a compelling enough reason to hop and lose time re-installing a system, or is it just better to stick to the distro at hand.

Although I haven't really truly distro-hopped in the past 2 years, I have had various stints on the different branches of Debian.

Typically, I will gravitate towards Sid. Sid is their development distribution, but it is also a moving target, so there are moments where the system cannot be fully updated because of missing libraries that have been phased out, or because of library migrations. So this requires a bit more attention to detail when upgrading. This means, checking the Siduction forums, and checking the Debian weather page. Siduction is a distro based off of Debian Sid, that aims to provide a usable day to day Sid distro. They follow any transitions, and if there is an issue during a transition, it is reported on their forums. Debian weather is a tool that shows you if it's a good day, or a not so good day to do a dist-upgrade on Debian Sid.

After the soft freeze of Debian stretch, I had used Debian stretch for a while. Although there is a software freeze, and isn't as bad of a moving target as Sid, there are still things getting worked on, and for a system that needs to work so that I can do work, I couldn't run the risk of finding an issue that I couldn't resolve because of a known bug.

These typically stave me away from a distro-hop.

However, I am compelled recently to try Fedora.

There are a couple of reasons. The main one is because Debian's VirtualBox repository for stretch does not include VirtualBox, which was a criteria when installing Debian. Because of this, I installed my `vmdk` image of Windows that I was using on VirtualBox in Debian stretch on KVM. This worked well in Debian stretch. However in Debian stretch, because it is not stable yet, I am running into issues with ruby-build and rbenv. Both ruby additions are necessary for my studies at Bloc.io. I rolled back to Debian stable.

On Debian stable, the version of VirtualBox is no longer supported, and because of this, I don't want to use it as there might be a security bug in there that will never get fixed. So, I've been using VirtualBox 5.x, however I wanted to install the KVM instance.

Compared to Debian Stretch, the KVM instance after tweaks of the windows machine was usable but not up to par as with Debian Stretch. There have been updates to the libvirt libraries, KVM, and what not, that have made it run much faster in the newer versions of KVM.

Which begged the question, why am I on Debian stable to begin with?

I might do an exploratory Fedora outing in the next months, however because of the time commitment, it might be a while before I get around to it.

Do I want to go through the hassle of installing, testing it out for a couple of weeks/months, and see if it's worth it, and if it is, migrate ALL of my systems over? Right now, for curiosity's sake, I think I would be interested in at least installing Fedora on my bare metal system. Testing it out for a couple of weeks might be a bit of a leap.

This is where I'm at, and this, in my opinion is the way to defeat the distro-hopper in me. Look at the reasons why you want to do it (shiny new toys/software isn't a valid reason by itself) and the amount of time that it would take to accomplish this. Then, ask the question again, what are your gains (KVM will be much more responsive), what are the issues you're going to run into (shorter release cycles on Fedora, if CentOS, very very old software, having to reinstall and test the system on  your main computer, then install across the board in all computers which include your own, your wife's, and your work laptop). At this point you're realizing the amount of effort it'll take. And this is where you keep and stave off the feelings of distro-hopping. :)
