---
layout: post
title: Searching within a string
description: Exploring some Javascript methods to find a value inside a string.
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

The `search()` method matches a regular expression with a string. If the query is not a regular
expression it is automatically converted to `RegExp`. This allows some more advanced searching.

```js
var str = "The quick brown fox jumps over the lazy dog.";
var query = "jump";
var regex = /jUmPs/gi; // global + case insensitive regex

console.log(str.search(query)); // 20
console.log(str.search(regex)); // 20
```

## String.prototype.match()

The `match()` method works the same as the `search()` method. It also requires a regular
expression as a parameter but instead returns an `Array` containing the entire matched string as
the first element.

```js
var str = "The quick brown fox jumps over the lazy dog.";
var query = "jump";

console.log(str.match(query)); // jump
```

## String.prototype.includes()

This method is probably the simplest to work with. `includes()` return `true` if a string is found
inside another string and `false` when it is not found. The method is case sensitive, so make sure
to convert your query using `toLowerCase()` for example when using this method.

```js
var str = "The quick brown fox jumps over the lazy dog.";

console.log(str.includes("fox")); // true
console.log(str.includes("quick red fox")); // false
```

Note that `includes()` is not supported in Internet Explorer.
