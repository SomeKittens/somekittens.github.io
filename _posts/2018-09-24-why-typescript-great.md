---
layout: post
title: Why is TypeScript so great?
---

In my developer career, I don't think I've met anything as revolutionary as [TypeScript](https://www.typescriptlang.org/).  There are plenty of shoulders TypeScript is standing on (everyone who worked to get JS devs to accept build systems!) but TypeScript is a brilliant cumulation of that work that's fundamentally changed how I do my job.  So much so, that I finally switched off my beloved Sublime Text to Visual Studio Code for better TypeScript support.

(As an aside, the fact that I'm using a Microsoft editor to write a Microsoft language and that both are open source still feels weird)

For those of you new to frontend development (or those who are returning after a long hiatus), TypeScript is a new language that's a superset of JavaScript that adds optional types into the mix.  Here's a snippet of TypeScript:

```typescript
let currentUserId = 7;
let users = [{
  id: 7,
  firstName: 'Robert',
  lastName: 'Smith'
}, {
  id: 12,
  firstName: 'Dana',
  lastName: 'Jones'
}];

let currentUser = users.filter(u => u.id === currentUserId);

console.log('Hello,', currentUser.firstName, '!');
```

Most importantly, you'll notice that there aren't any type annotations or other funky business in this snippet.  _All JavaScript is also valid TypeScript_.  This is TypeScript's greatest asset.  All you need to do to convert a codebase to TypeScript is a single command:

```bash
find . -name "*.js" -exec bash -c 'mv "$1" "${1%.js}".ts' - '{}' \;
```

(ok, ok, so there's more to it than that.  We'll get to that later).

So all your JavaScript is valid TypeScript.  So what?  The answer lies in just how dang _smart_ TypeScript is.  It's not just "We jammed a bunch of types into JavaScript", but an entire ecosystem of tooling around that, all built with the developer in mind.  It took some time to get where we are today (I gave up on TypeScript several times in the dark days of `v0.x`).

TypeScript takes a look at the above snippet and knows that `users` is an array of objects and `filter` is a method on an array that returns another array.  Therefore, `currentUser` is an array and ...wait a minute!  Arrays don't have a `firstName` property!  TypeScript then slams a red squiggle underneath this glaring issue, allowing you to fix it right in the editor itself.  No need to content switch to the browser, stare at a bizarre `undefined` that shouldn't be there, and eventually track it down to a `filter` that should be a `find`.

Before TypeScript, I made these kinds of mistakes all the time and caught _most_ of them before they got to production.  Now I still make these sorts of mistakes all the time but they're caught immediately instead of creating incredibly quirky bugs.

TypeScript changed the game even without needing to modify our code at all.  Even at the start, it's a super-linter that allows us to offload an enormous amount of working memory about our codebase and JavaScript to a tool, allowing us to spend those brain cells on a better architecture and writing mushy love letters masquerading as blog posts about said tools.

TypeScript is incredibly powerful as a super-linter and would be just fine if that's all it did.  Next time we'll talk about types, how to define them in TypeScript, and just why that's useful.