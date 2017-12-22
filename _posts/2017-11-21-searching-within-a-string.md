---
layout: post
title: Searching within a string
date: 2017-12-21
tags: JavaScript
---

When you are just starting out with JavaScript or coming from another language it isn't always
clear how to do seemingly easy tasks, for example finding a certain value in a string. This article
covers some built-in JavaScript methods you can use to find characters or words inside a string.

## String.prototype.indexOf()

The `indexOf()` method is the most basic one and also has the best browser support. This function
returns the position of the first occurrence of a specified value in a string. If the value is not
found it will return `-1`.

```js
var str = "The quick brown fox jumps over the lazy dog.";
var query = "jump";

console.log(str.indexOf(query)); // 20
```

In the example above we can see that the term `jump` is found at position `20` of the sentence.

## String.prototype.search()

The `search()` methods works the same as `indexOf()` but instead matches a regular expression
with a string. If the query is not a regular expression it is automatically converted to `RegExp`.

```js
var str = "The quick brown fox jumps over the lazy dog.";
var query = "jump";

console.log(str.search(query)); // 20
```

## String.prototype.match()

```js
var str = "The quick brown fox jumps over the lazy dog.";
var query = "jump";

console.log(str.match(query)); // jump
```

## String.prototype.includes()

```js
var str = "The quick brown fox jumps over the lazy dog.";
var query = "jump";

console.log(str.includes(query)); // true
```
