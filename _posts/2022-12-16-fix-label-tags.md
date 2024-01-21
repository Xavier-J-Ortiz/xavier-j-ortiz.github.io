---
layout: single
classes: wide
title: Fixing Tag Labels Redirect
tags:
  - Minimal Mistakes
  - Jekyll
---
# Fixing things that hadn't worked

Circling back to fixing some bits and bobs on this page and other projects.

For the longest time the Tags were sort of broken. Within the top right navigation link, you _could_ got to the tags page. So that was always working.

The problem that I had was more along the lines of the tag labels _within_ each post.

# Seek and ~~Destroy~~ _Improve_

Adding the tags label within each post is fairly easy. For this page, as an example, my header that includes the tags is the following

```
---
layout: single
title: Fixing Tags in this Porfolio Page
tags:
  - Minimal Mistakes
  - Jekyll
---
```

The actual issue was the link within the tag labels.

When I would click on one of the link labels before, lets assume I clicked on `jekyll` label, it would send me to `/tags/jekyll`. However the page would not exist.

This confused me slightly because the [`/tags/`](https://www.xavierjortiz.com/tags/) page did exist if I removed the `jekyll` portion of the URL.

I looked at an example page [here](https://mmistakes.github.io/minimal-mistakes/markup-text-readability-wide-page/) from Michael Rose, who is the developer of [Minimal-Mistakes](https://github.com/mmistakes/minimal-mistakes), which is the jekyll theme I'm using for this site. I focused on what redirect it used in the URL. I saw that it would generate the following link when clicking the `readability` tag. [`https://mmistakes.github.io/minimal-mistakes/tags/#readability`](https://mmistakes.github.io/minimal-mistakes/tags/#readability).

This lead me to believe that there must be a configuration entry somewhere that would let me modify the creation of that URL so I could add the `#`.

With this research and my hypothesis/hunch, I noticed that my link was missing the `#` before the name of the tag. Now, I had to find where this was defined. Hunting and pecking a bit, searching for the keyword `tag` within folders of my git repo, I found that the `_config.yml` had the following lines.

```
tag_archive:
  type: jekyll-archives
  path: /tags/
jekyll-archives:
   enabled:
     - categories
     - tags
```

I stated to modify some lines around this area to see if I could get the desired effect on tag label link.

Modifying that block of code the following way, yielded the correct behavior that I wanted.

```
tag_archive:
  type: jekyll-archives
  path: /tags/#
jekyll-archives:
   enabled:
     - categories
     - tags
```

# Conclusion

Minimal Mistakes is a great jekyll theme. It's minimal, sleek, customizable, but doesn't look cheap.  I think that the documentation, for addressing my issue was lacking. Perhaps I googled incorrectly, and was too focused on finding solution within the Minimal Mistakes page. Maybe I should have searched for more jekyll documentation for the solution.

Regardless, the solution was found by hook or crook. Though, I would like to find some more robust documentation on toggles and flags that I may use within the theme and jekyll in general.
