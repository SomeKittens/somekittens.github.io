---
layout: post
title: "The git's guide to git: Commits & their messages"
---

The core unit of git is the commit. A commit is simple on the surface (some code changes and a message).  Such simplicity belies the complexity within.

## When to commit

I've heard many opinions on when one should commit from "commit early, commit often" to "one commit per release" (yikes).The only method I've found that consistently reduces developer headaches is to make one commit per change.This requires some discipline to break up small changes into their own commits and squashing multiple commits that all accomplish parts of the same change.  "Change" itself is subjective, my rule of thumb being "The smallest edit to the code that can be considered complete". Half a refactor might be able to run & pass tests but it's not 'complete'.

Making one commit per change supercharges tools like [`git bisect`](/articles/The-gits-guide-to-git-Bisect.html) and [`git revert`](https://git-scm.com/docs/git-revert). As tempting as it is to integrate several small changes in a single commit, you'll be much happier with multiple commits if one of those changes need to be reverted later.


## Commit messages

Technically speaking, commit messages aren't that exciting.  There are two ways to write 'em.  If you run `git commit`, git will helpfully open an editor to write the commit message. (Unhelpfully the editor is always Vim, git is credited with being the only reason developers know how to exit Vim [0]).  On the other hand, you can add the `-m` flag to add an inline commit message: `git commit -m 'my commit'`.

On the other hand, if you're _not_ a mythical 10x programmer, you work on a team with other people. (if you are, [we could use a fellow like you](/2016/04/29/Wanted-Ninja-Rockstar-Code-Monkey-Hacker-Unicorn.html)). Even if you _are_ flying solo, you're on a team comprised of now you, one-month-ago you, two-month-ago, etc. We all need some trail of breadcrumbs to follow whatever insane trail of logic February us was thinking.

Which is why commit messages like this really tick me off:

```
commit 32f4410abb2a901016c4a8b23c4b487e36be9916
Author: Randall Koutnik <souper_leet_h4x0r@rkoutnik.com>
Date:   Tue Jun 14 15:05:51 2016 -0700

    Fix error on alert page
```

*What was this guy thinking?* Seriously, what was he thinking?  I need to know the motivation for this commit - why, of all possible uses for his time, did this coder decide to make this one?

### Context is king

When I was in college, I took Calc 2 and passed by a single point. I am not good with advanced math.  As I was cramming for the Calculus final, searching the textbook for any hint of explanation that would impart an understanding of antiderivatives, I came across the most terrifying sentence ever written:

> The explanation for such a phenomenon is so trivial it is left as an exercise for the reader

I hadn't exercised in three days, so I went for a run.  This didn't help my understanding of integration by parts at all.  The author of the textbook is well-read in calculus, as he literally wrote the book on it. He had a much greater context for calculus than I did and assumed I'd be able to pick up the finer points.

The author of the commit message above knows what bug was fixed.  Their issue is in assuming the reader has the same context.

### The three questions

Commit messages need to answer three questions:

 - What changed?
 - How was the change implemented?
 - Why was that change nessecary?

The commit above only answers "what" (and poorly at that). We're still left wondering _which error?_  Any code that's existed for 90 seconds has multiple errors.  If I know that a fix when cloning alerts that had an ampersand in the name introduced a regression and am combing through the history trying to find said commit, this message is near-useless.

This message also doesn't provide a high level "how" of the fix. Was the answer better parsing?  A less-restrictive regex?  Skipping all the relevant unit tests? Answering "how" in the commit message saves the reader the effort of reading through the diff.

Finally, and most importantly, _why_?  Fixing errors is important, sure.  Why this error?  Most modern git systems allow linking to an issue tracker; apply links liberally.  Some, like GitHub, allow you to close an issue with a commit message containing `Fixes #1234`.  Two birds with one stone!

### A better commit

Let's take a swing at fixing up the commit above.  Using our new heuristics for message quality, we need to add:

 - _Why_ the commit happened (through some external links)
 - _How_ the change works
 - More details in the summary


```
commit 32f4410abb2a901016c4a8b23c4b487e36be9916
Author: Randall Koutnik <souper_leet_h4x0r@rkoutnik.com>
Date:   Tue Jun 14 15:05:51 2016 -0700

    Fix name parse bug when cloning alert with a '&' in the name

    Previously, the API would choke because we weren't escaping '&' in alert names on cloning.
    Now the clone service escapes the name before the API call.

    Fixes #1337
```

We now have a neat little summary, an explanation of the actual fix and a connection to external details.  Now if (horrifyingly) some part of the system relied on unescaped data, we'd know exactly what commit to start with when the regression tickets come piling in...

[0] Seriously, you can set the editor git uses either through `git config --global core.editor "your-editor-here"` or the environment variable `GIT_EDITOR`.