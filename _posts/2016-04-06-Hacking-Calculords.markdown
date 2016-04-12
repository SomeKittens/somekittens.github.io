---
layout: post
title: Hacking Calculords
---

My wife was shopping.  And not the typical hunter/killer cruise missile 24-pack-of-toilet-paper-ice-cream-and-that's-*it*.  Ok, full disclosure, I was indulging in the same shopping but the used book section of our local thrift store is smaller than the clothing department.

I was bored.  HackerNews lay stagnant, no one was tweeting (folks having a life instead of entertaining me?  How inconsiderate!).  In desperation I turned to the Google Play store and found what would be my obsession.  [Calculords](http://www.calculords.com/) is a collectable card game based on math.  What follows is my attempt to build a solver.  Along the way we'll learn about algorithmic complexity, garbage collection & dynamic programming.

Here's a typical game board in Calculords:

![game board](//i.imgur.com/9lIYTnD.png)

The player generates numbers to match the cards on the left using the blue numbered cards on the right combined with the three operators on the far right.  For each match, they summon the creature into one of three lanes on top.  If the player manages to use all of their blue cards, they're rewarded with another set of cards to drop even more fighters on the field of battle.  The mechanics of battle are irrelevant here - we're concerned about the math.

## Algorithms

The first method I tried was rather crummy.  The steps worked something like:

 - Stare at the numbers for a while
 - Have a half-cocked 'inspiration'
 - Punch in the numbers only to realize I had yet another off-by-one error.

This worked well enough that I was able to beat the first two levels but victory on the third eluded my grasp.  I started grinding away, trying to gather enough good cards.  The grind was dreary.  In the words of every infomercial ever, there has to be a better way™!

The first thing I needed was better hardware.  My current solution used a processor running at [1.19e-08 MIPS](http://frc.ri.cmu.edu/users/hpm/book97/ch3/processor.list.txt).  While slow, this one has sentimental value (my parents gave it to me).  The slow meat-CPU interacted via a digital medium (my fingers) with my phone, a machine running 490,000,000,000 times faster.  Why not offload some of the work?  Better yet, there was a laptop idling on my lap as I idled at the game, and that CPU was 21.4 times faster than the phone.  A round on the meat-CPU took me 5-10 minutes with no guarantee that the solution I found was optimal.

Converting the processing from meatspace to cyberspace meant I needed a concrete algorithm.  This initial naive implementation recursively searches through the entire problem space.

 - Given `n` integers (where n >= 2)
 - pick two
 - apply one of the operations
 - make a recursive call, passing the result and the unused integers.


Finding the best solution is an NP problem, requiring that we execute every operation  against every possible numerical combination.  In the words of my esteemed (and lazy) math professors, proving so is left as an exercise to the reader.  Ostensibly, this problem is `O(n^2 * m)`, with `n` as the list of integers and `m` being the number of operations.

Ignoring fancy CS terms for now, just how many times do we have to go through this process?  Given an array of 7 integers (the amount in our example above), we'll need to compare each number to each other number in order to check all possibilities.  Additionally, (pun intended) subtraction is not commutative so there are four total ways to smash two numbers together.  A few for loops later, and we have:

```javascript
/**
 * ints (Number[]) A collection of integers left to process
 * operations (Function[]) Math operations (+/-/*)
 * stack (String[]) Tracks operations executed thus far
 */
for(let i = 0; i < ints.length; i++) {
  for (let j = i+1; j < ints.length; j++) {
    for(let k = 0; k < operations.length; k++) {
      let localInputs = ints.slice(0);
      let localStack = stack.slice(0);

      let r = operations[k](ints[i], ints[j]);
      localStack.push(r.str);
      localInputs.splice(i, 1);
      localInputs.splice(j-1, 1);
      localInputs.push(r.result);

      explore(localStack, localInputs);
    });
  }
}
```

Comparing everything to everything else would make this `n^2 * 4` (yikes!  Exponents usually mean code that takes quite a while to finish up).  We do get to cheat a little: We don't need to compare a number to itself and once we've compared two numbers, we can get away without re-checking them the other way around.  The formula for our solution above is a bit tamer: `(n * (n - 1) / 2) * 4`.

Our demo game board above shows 7 integer cards, so the initial execution of the center loop of this code will only run `(7 * (7 - 1) / 2) * 4 = ` 84 times.  Phew, that's not too big.  The next level will run 84 times with an `n` of 6, processing a total of 5,040 cycles just on that level.  Ouch.  Things get a bit scarier as we go on: Chewing through all the numbers reveals that we end up running 295,349,124 calculations.

This involves lots of for loops and intermediate arrays to check and double check everything. There was trouble in the land of computational pancakes: stack overflow errors lead to trips to StackOverflow, which then broke, resulting in even more stack overflows, eventually throwing an overflow in my meatspace CPU so I called it a night and went to bed.

Tricky bits we've revealed so far:

 - Doodling around with math can be fun but is no match for writing code
 - Recursion is hard
 - Exponents mean sloooooooow

## Optimization

After a pile of coding & debugging, the total processing time for a game round has been narrowed down to...

Six minutes (not including data entry)

Adding insult to injury, this was all done in single-threaded JavaScript, so the entire page locked up while the processing happened.  At this point, it was clear I had two options:

 - Armed with a trivial example and an inept grasp of the tools available to me, I could write a snarky Medium post about how terrible JavaScript is
 - WebWorkers

Unfortunately, having experience with JavaScript eliminated the first option, forcing me to (*sigh*) use the right tool for the job.  WebWorkers are a way to offload heavy processing into another thread so the main UI can remain interactive while Big Data Crunching happens in the background (ok, more like Mediocre Data in my case).

At this rate, the time invested was just barely a net gain, given the algorithm would reveal the ideal solution.  Calculords ceased to be a silly diversion and is now an obsession.  I _must_ beat it, by any means necessary!  And so I did what any red-blooded engineer would do when faced with code that's taking an eternity to run: I added a progress bar.

The next step was to fire up Chrome's timeline view.  There were a lot of operations flying about but I had a hunch that there wasn't 360 seconds worth of number-crunching happening on my brand-spanking-two-years-old MacBook.  Some shenanigans later (Timeline doesn't play well with WebWorkers) I had a clear answer:

![Timeline results with lots of GC](//i.imgur.com/H3clFZt.png)

See all the neat orange rectangles hanging off the bottom like insubordinate mynocks?  Those are minor garbage collection events.  Each time, JavaScript needs to shift gears and ditch all of ten zillion intermediate arrays I was creating.

Intermediate arrays are tempting and easy to create but increase GC pressure.  Any invocation of the `Array.prototype` methods (`.map`, `.filter`, etc) creates a new array that JavaScript will need to collect eventually.  This is why I used `for` above instead of the more convenient `Array.prototype` methods.  Programmers prefer the prototype methods except in rare cases where milliseconds matter.  Since we're running this shebang just under 300 million times, it's better to go with the more performant code over readability (make sure to comment liberally [heck, even write a whole blog post]!).

We can trim down the array-splosion somewhat by moving array creation up the for loop chain, though due to the nature of the problem we need to create at least two arrays in the core of our looping in order to pass them on to the next layer of recursion:

```javascript
/**
 * ints (Number[]) A collection of integers left to process
 * operations (Function[]) Math operations (+/-/*)
 * stack (String[]) Tracks operations executed thus far
 */
for (let i = 0; i < ints.length; i++) {
  let left = ints[i];
  let localInts = ints.slice();
  localInts.splice(i, 1);

  for (let j = i; j < localInts.length; j++) {
    let right = localInts.splice(j, 1)[0];

    for (let k = 0; k < operations.length; k++) {
      let r = operations[k](left, right);

      explore(stack.concat(r.str), localInts.concat(r.result));
    }
    if (init) {
      postMessage(++doneWork / totalWork);
      console.log(left, right);
    }
    localInts.unshift(right);
  }
  localInts.unshift(left);
}
```

Unfortunately, the performance improvement provided by marginally fewer garbage collections is, well, marginal.  We started out with fast code.  The overall runtime is slow because we're running our fast code millions of times.  Is there anything that can be done to reduce this number?

## Dynamic programming

Theoretically, we need to check all 295,349,124 possible results in order to ensure that we find the best solution.  In reality, there's a few shortcuts we can take.  Our problem has a fortunate property: Once we've computed the solutions for a subset of our input, we don't need to revisit it, _regardless of order_.  `[1,2,3]` has the same result as `[2,3,1]`.  We can record our position as we go along, and skip any further processing when we find ourselves on the beaten path.  This path-tracking technique is known as [Dynamic Programming](https://en.wikipedia.org/wiki/Dynamic_programming).

Implementing dynamic programming with our problem is easy:

```javascript
// Before the recursive calls
let paths = {};

// Inside our recursive function
// If we've already gone down this path, no need to redo work
let key = ints.join();
if (paths[key]) {
  return;
} else {
  paths[key] = true;
}
// Continue on to our checking and looping
```

These few lines of code reduce the search space - by _four orders of magnitude_.  Keeping track of already-calculated solutions allowed us to greatly reduce the amount of checks we needed.

Tune in next time when I go completely overboard and build an OCR system in JS that can teach itself how to play the game so I'm not needed at all.

You can find the solver here: https://rkoutnik.com/calculords-solver/
Source code: https://github.com/SomeKittens/calculords-solver