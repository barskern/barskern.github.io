---
title: Why I built this blog with Gatsby
tags:
  - discussion
  - web
  - gatsby
description: "This blog was built using Gatsby, which is a framework for generating static sites using React. In this first blogpost I will discuss my usage of this framework in the creation of this blog."
---

_This blog was built using [Gatsby][1], which is a framework for generating static sites using [React][2]. In this first blogpost I will discuss my usage of this framework in the creation of this blog._

**_Disclaimer!_**
_I am not a professional programmer, but I'm aspiring to become one. Therefore my conclusions or reflections might not be perfect. However I am open for feedback, so don't be afraid to leave a issue on github if something I say is wrong. This is my experience and hence will be highly subjective._

This blogpost will be divided into three sections. First I'll explain the root of the problem regarding the "old" way of making webpages. Then I will talk about why I wanted to use React, and then lastly about why I chose to generate a static site with Gatsby.

## Background for the problem

Before deciding to make a blog, I made a lot of small project websites using pure HTML, CSS and JavaScript while I was in the process of learning these languages. While learning you normally do small tasks which end up becoming websites with around 100 lines of code. These websites are easy to manage, and using frameworks can become more of a hassle than a benefit. 

When I was going to build a larger project, namely [maanelander][7], I quickly realized my old model for solving smaller tasks was not suitable for a bigger project. Keeping the code organized and managable became exponentially harder with each line of code. Luckily in that case, the project didn't grow to the point were it was hopeless to manage, but I definetly noticed a problem. One big takeaway I had was that writing a full game in a single JavaScript-file gets messy.

As I was growing as a programmer, I learnt more about **separation of concerns**. This concept is based on the premise that a program should be divided into sections, which each deal with one concern. In a similar way that I had separated my game-objects into different classes, the code itself should be separated into different files. Of course I could just include all the different files in the `index.html`-file with a `script`-tag, but with `HTTP 1.0` the user would have to make endless amount of requests for a more complex project (`HTTP 2.0` is destined to solve this issue). 

To solve the issue of big monolithic JavaScript-projects, bundling JavaScript became a goto method for more complex applications. This made developers able to create several JavaScript-files, and then use a tool to combine them into a single file which the user downloaded. [Browserify][3] is a tool which bundles JavaScript-files, and one could argue that this solves the problem, but I think there are more aspects to take into consideration. 

Another point is that webpages don't only consist of JavaScript, but also HTML and CSS. Despite that our JavaScript is bundled, the CSS and HTML that is being controlled by our JavaScript are still inn a singular mess. There are languages to assist in those regards aswell, such as [SASS][4] and [Pug][5], which are languages which enabled a build-tool to combine and transform our module-based source code into fully-fledged webpages.

Taking above points into consideration, we now have a system where JavaScript, CSS and HTML are separated. But are they really separate concerns or **separate technologies**? This is the question that [Facebook][6] answered with [React][2].

## Why use React?

[React][2] is a JavaScript library for building user interfaces, that combines HTML and JavaScript into a singular file. To be more specific it uses JSX which looks like HTML, but it can be used render many different types of visual interfaces. So in essence this solves the separation problem by grouping code into components, which can contain logic (JavaScript), layout (JSX/HTML) and styling (CSS). This is a brand new way of looking at the web, and personally learning about this was like having an **epiphany**!

Here is a small list over what's truly amazing with [React][2]:

- Declarative
- Component-based (_separation of concerns_)
- Generalized for different types of UI (web, mobile with [React Native][8])
- A bunch of great, community-made assets

After learning about this library through countless tutorials and other blogposts, I decided that it was time to use this library to make a greater project. That's how my homepage was born. However when I was just about to start the project, I heard about [Gatsby][1], and I had to check it out.

## Why use Gatsby ontop of React?

The reason I got excited when I heard about [Gatsby][1] was that it could render a static version of a webpage with custom data. To clarify, then I could write markdown-files and let it turn them into HTML-pages. This way I could combine content and [React][2] without needing to host the content and get it throught an API. Ontop of this, generating a static site is hella fast, and using the site is even faster!

Another thing that this tool does beautifully, is enable the user to add plugins and functionality to the build process. This makes the generator powerful in the sense that you can fully customize it to fit your needs. An active and resourceful community are making tons of greate plugins which can be used and extended. When I was looking through all the different plugins at [gatsbyjs.org/docs][9], I had to hold back to not choose them all.


## Conclusion

Choosing to build my blog with [Gatsby][1] and [React][2] was a great choice for me because it gave me the ability to make a static site which had all the bells and whistles of modern web development. By using a component-based layout I managed to separate code based on concerns, rather than technology, which made the ever-growing project managable and fun to develop. Working with these technologies has been a plesure and I highly recommend trying them out for yourself!


[1]: https://gatsbyjs.org/
[2]: https://reactjs.org/
[3]: http://browserify.org/
[4]: https://sass-lang.com/
[5]: https://pugjs.org/
[6]: https://github.com/facebook
[7]: https://barskern.github.io/maanelander/
[8]: https://facebook.github.io/react-native/
[9]: https://www.gatsbyjs.org/docs/plugins/