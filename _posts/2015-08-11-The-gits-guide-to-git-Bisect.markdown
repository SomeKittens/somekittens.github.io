---
layout: post
title: 'The git''s guide to git: Bisect'
permalink: The-gits-guide-to-git-Bisect.html
---
Debugging is hard.  Often you'll be presented with a bug that was introduced "some time ago" without any further information.  Before I learned about [`git bisect`](https://git-scm.com/docs/git-bisect), my primary strategy was to flail around blindly, hoping my fingers would strike the keyboard just right to reveal the bug.  The loud typing showed I was a hard worker and eventually I was promoted to senior architect.  Once I joined the inner circle of the cabal, I was taught the secrets of git.  I was eventually kicked out for my insistence that Wedge Antilles was a better pilot than Luke Skywalker (he *is* dangit!) and so as revenge, I bring you The Git's Guide to git - a series on using git to its fullest.
<!--jump-->
Here at Kittenitech, we've got a multi-billion-dollar SaaS product: UnicornTopia.  It allows UnicornOps folks to easily manage large herds of distributed unicorns.  Problem is, sometime in the last week, we introduced a really nasty bug.  Paula over in Marketing tells us they're receiving quite a few reports that setting the header color to blue causes unicorn riots.  Fortunately, this is timeboxed - Paula helpfully says complaints started coming in less than a week ago, so we know the problem was introduced recently.

Bill thinks we should use `git diff HEAD 'HEAD@{1 week ago}'`.  This'll give us all of the changes in the past week, in a gigantic, difficult to sift through diff format.  Then again, Bill was talking earlier about how his nifty electric drill doubles as a hammer if you swing it hard enough.  Let's look at a better solution - `git bisect`.

`git bisect` works by taking a known *good* commit and a *bad* commit and performing a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) bounded by the two commits to find the exact commit where things went bad.  It is excellent for situations where you know a bug was introduced in a given time frame.  It's not used every day but can be a lifesaver when there are reams of commits to dig through.

There's only eleven commits to check (or bad news, we only pushed 11 commits in a week, yipes).  Note that this'll only take four steps - binary searches are `O(log n)` - they require a number of steps equal to the natural logarithm of the total items to check (For the math-adverse, this means we only have to check a small amount in order to find the problem commit.  Checking 10,000 commits requires 10 steps).  Here are the eleven commits we need to search through (in order from newest to oldest):

```
* 40c974a (HEAD) Increased alfalfa yields during bumper car festival
* 06f002b Allow write-in votes during unicorn elections
* 8226ff8 Turns out that wasn't a typo at all...
* d67e999 refix typo fix
* a8e03b3 Tyops: SPeeling wrongs
* 6f3e26c Ensure Unicorn Park converts to anti-aircraft batteries upon Godzilla event
* 1c75ea6 Correct corner case in round houses
* c8e1db2 Fix edge case where Unicorns gain sentience and demand rights
* 74ed286 Automatically spin up new unicorns when config.carousel is true
* 4ad0ca1 Styling: Add peppermint swirls to unicorn housing
* b51dd30 Race condition: Add checkered flag
```

Let's try it out.  We have a known *bad* commit (QA has verified that the unicorns riot when we're running the latest code, which is known in git land as  `HEAD`).  We also know that the commit with the sha `b51dd30` is *good* - the unicorns don't riot at all!  We tell bisect all this information:

```bash
# Start bisecting, passing in a HEAD as the buggy commit and then a known good commit
$ git bisect start HEAD b51dd30
Already on 'master'
Your branch is up-to-date with 'origin/master'.
Bisecting: 11 revisions left to test after this (roughly 4 steps)
[6f3e26c40436f69e9d4bfb4ea518c89bf3b7219a] Ensure Unicorn Park converts to anti-aircraft batteries upon Godzilla event

$ git status
HEAD detached at 6f3e26c
You are currently bisecting, started from branch 'master'.
  (use "git bisect reset" to get back to the original branch)

nothing to commit, working directory clean

```

At this point, git has checked out the commit at the middle between `HEAD` and `b51dd30`.  We're in "Detached HEAD" state: We're pointing at a specific commit instead of a pointer to "The latest commit of a branch".  Don't sweat this - if everything goes kerflooey, we can run `git bisect reset` to return to our original, pre-bisect state.  Phew.

Our next step is to check if the bug exists on this commit.  If it does, bisect knows all commits *after* this commit also contain the bug - we need to search through older commits for the bad code.  If this commit is bug-free, then the offending code was added *later* and bisect will search through *newer* commits.

We open up `dev.unicorntopia.com` and set the header to blue.  Unicorns fly everywhere, rioting in the streets.  Looks like this commit is broken.  We tell git that the current commit contains bad code through the command `git bisect bad` (finally, something about git that's intuitive).

```bash
$ git bisect bad
Bisecting: 5 revisions left to test after this (roughly 3 steps)
[74ed28665dae9c24f43cbafce313baec945a9f5d] Automatically spin up new unicorns when config.carousel is true
```

Once that's run, bisect determines that all the commits between `6f3e26c` and `HEAD` *also* contain the bug, leaving us with just under half of our original commits under suspicion.  We then move to the commit halfway between `6f3e26c` (the one we just marked as bad) and `b51dd30` (the one we know is good).

```
(Newer commits assumed bad)
(known bad)  * 6f3e26c Ensure Unicorn Park converts to anti-aircraft batteries upon Godzilla event
             * 1c75ea6 Correct corner case in round houses
             * c8e1db2 Fix edge case where Unicorns gain sentience and demand rights
(checking)   * 74ed286 Automatically spin up new unicorns when config.carousel is true
             * 4ad0ca1 Styling: Add peppermint swirls to unicorn housing
(known good) * b51dd30 Race condition: Add checkered flag
```

This time, our commit looks good.  Blue header, docile unicorns.  Hurrah!  Git now knows that our malfunctioning code is enclosed by `74ed286` (known bug-free) and `6f3e26c` (known bugged).  There's only two commits left to check!.

```bash
$ git bisect good
Bisecting: 2 revisions left to test after this (roughly 2 steps)
[c8e1db20505e16161888f19515137bf113a169dd] Fix edge case where Unicorns gain sentience and demand rights
```

```
(Newer commits assumed bad)
(known bad) * 6f3e26c Ensure Unicorn Park converts to anti-aircraft batteries upon Godzilla event
            * 1c75ea6 Correct corner case in round houses
(checking)  * c8e1db2 Fix edge case where Unicorns gain sentience and demand rights
(older commits assumed good)
```

Repeating this process a few times gives us the problem commit:

```bash
$ git bisect good
6f3e26c40436f69e9d4bfb4ea518c89bf3b7219a is the first bad commit
commit 6f3e26c40436f69e9d4bfb4ea518c89bf3b7219a
Author: Jebediah Kerman <jebkerman@kittenitech.co>
Date:   Sat Aug 8 21:37:46 2015 -0700

    Ensure Unicorn Park converts to anti-aircraft batteries upon Godzilla event
```

D'oh!  It was the first commit we looked at!  At least now we know exactly where the problem commit is.  Let's look at what changed with `git diff 6f3e26c^ 6f3e26c` (compare the commit immediately preceding our problem one and the problem one itself).  Digging through the code there, we find:

```javascript
// Don't riot if blue
if (header.blue) {
  unicornMob.riot();
}
```

Welp, there's our problem.  `git bisect` saves the day!  Imagine how much work it would have been to dig through a week's worth of code instead of a single commit.

### Downsides

`git bisect` isn't perfect - there's a few scenarios where it isn't helpful:

 - The problem is an external source.  I once spent far too long bisecting to discover the database had bad data.  If bisect says your last known good commit is the only good one, this may be something to look into.
 - Your team doesn't write atomic commits.  If each commit changes multiple things, it's harder to discern the problem.  Each commit should only do one thing.
 - The problem is a race condition.  In this case, it's incredibly difficult to tell if a commit is good or the race worked out in your favor.
