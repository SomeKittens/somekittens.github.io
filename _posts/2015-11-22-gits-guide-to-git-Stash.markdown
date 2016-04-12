---
layout: post
title: 'git''s guide to git: Stash'
permalink: gits-guide-to-git-Stash.html
---
Last time we checked in with our favorite unicorn management company, we learned about git bisect, a rarely-used tool that can absolutely save your bacon when the time comes.  In this episode, let's learn about `git stash`, something I use almost daily.
<!--jump-->
Remember the last time you were elbows-deep in some code change and some PM came rushing over with a P0 bug that they'd *just* discovered (we reported it two weeks ago).  Bob does.  He finally got time to work in the big refactor we've all needed for *months* and this stupid bug crops up.  Welp, someone has to fix it but Bob has a pile of unsaved changes.  How should Bob proceed?  He weighs his options:

 - Throw everything into a `wip` commit
 - Use this `git stash` thing he just read about on some weirdo's blog

The wip commit option has some problems - mainly that he'll need to either clutter the commit history with non-atomic commits or rewrite history.  No one likes having a git history littered with wip - they're useless at telling you what actually changed in that commit.  Even worse, what if someone pushed a commit to the refactor branch in the interim?  Bob could be stuck for hours in conflict doom.  Bob *could* keep that wip commit to himself but there's a better way...

### git stash

As it turns out, git has a built-in way to save the current state of the index *without* resorting to misusing commits.  It's as simple as:

```bash
$ git stash
Saved working directory and index state WIP on master: 51eada7 Release KRAK-N
HEAD is now at 51eada7 Release KRAK-N
```

Ta-da!  All of our changes to the current working directory are now saved in a special "stash" stack.  Let's double check to make sure:

```bash
$ git stash list
stash@{0}: WIP on master: 51eada7 Release KRAK-N
```

Our stash stack has a single entry - the one we just saved (as well as the commit hash & message we were working against when we stashed our changes).  We can push more items on top of that in the future, but for now let's just move on with the other fixes that need fixing.

A quick digression: The stash will only save the changes against the current index - so new files that haven't been checked in won't be part of the stash.  If you want to include new files, add `--include-untracked` to your stashing.

We've fixed the tyop in the master branch, bringing harmony to the Force (Geez, imagine if Order 66 had been executed before we corrected that.  The Unicorn-Jedi might have been wiped out!).  Back to the refactor!  Our changes are stashed, how do we get them back?

Remember, the stash is a stack.  We have two different ways of grabbing the top of the stack & bringing our changes back into the current working tree:

 - `git stash apply`, which leaves the entry in our stack.
 - `git stash pop`, which removes the entry

Bob likes a nice, clean stash stack, so he pops off the top:

```bash
$ git stash pop
On branch master
Your branch is up-to-date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   index.js
        modified:   homestarmy0.tmp.07.zip.tar.jpg

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (da0fcb2ae535f1e23dbf0da8cb120c4045c4cb82)
```

Boom!  We're back in business without ever worrying about commits.

### Stash tricks

Use `git stash branch <branchname>` to create a new branch (Setting the HEAD of the branch is the commit the stash was against) with your changes.  You can also name your stashes with `git stash save <stashname>` (helpful when you come back after a night of gaming and wonder what on earth you were thinking).


There's a bit more to git stash but that should be enough to get you going.  Read about the complete power of stash at [the git docs](https://git-scm.com/docs/git-stash)
