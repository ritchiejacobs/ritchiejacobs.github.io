---
layout: post
title: Don't forget about currentColor
description: >
  With CSS preprocessors like SASS or LESS being a must to use in every new project we often forget that CSS already
  comes with some powerful built-in features nowadays. One such feature is the `currentColor` keyword.
date: 2018-07-08
tags: CSS
---

With CSS preprocessors like SASS or LESS being a must to use in every new project we often forget that
CSS already comes with some powerful built-in features nowadays. One such feature is the `currentColor` keyword.

This property allows you to use the color value on other properties such as `border-color` and `background-color`.

If you want to create an outline button that always has the same text color and border color you can just do this:

```html
<div style="color: red; border: 1px solid currentColor">button</div>
```

It also inherits the color of its parent:

```html
<div style="color: blue;">
  parent
  <div style="background-color: currentColor">child</div>
</div>
```

This can be very handy when your are building UI components and also helps keeping our code a little shorter.

The `currentColor` keyword is supported in all major browsers.
