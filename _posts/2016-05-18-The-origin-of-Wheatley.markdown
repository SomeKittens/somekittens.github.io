---
layout: post
title: The Origin of Wheatley
---

The alarm bells rang as the call went out: "Prod is down!"  Our site had been felled by the Red Dragon of 500's.  I lept into action, logging in to see the foul beast face to face:

`SyntaxError: missing ) after argument list`

The entire site was down because someone had taken this:

```
fooBar(function () {

});
```

and added this, neglecting to _close the opening paren/bracket combo_:

```
fooBar(function () {
  barFoo(function () {

});
```

This was a WTF, but it was a mere skirmish for what was to come.  The CTO (let's call him Dale) had pushed this "fix".  Had Dale run the code at any point, the error would have emerged so it could be fixed.  Instead, it was pushed directly to the live site.

At this point, you're probably pulling your hair out, screaming "CI?!?  Tests?!?  _*STAGING?!?!*_".  You'd be right, we had all of those things.  Dale had decided such paltry checks were beneath him, and had a habit of sshing directly into prod and pulling his latest "quick fix".  He used to edit files directly on the server until we had a cron job under a hidden user `git reset --hard HEAD` so Dale lost any changes he made.

(This is the glamorous startup life you keep hearing about!)

Knowing Dale's prelediction for attempting to be a jedi and force-pushing, I had snuck over to his desk when he was "at lunch" and added in a few git hooks to run tests locally.  Fortunately two wrongs made a right, as he was too protective of his ego to ask why all of these tests were running (and failing).  For a while, all was calm.  Then came the crisis mentioned above.

Once the truant bracket/paren combo had been added, I went through the five whys:

Why, _why_, **why**, ***why***, ***WHY*** do I work here?!?

Then, I did some root cause analysis:


> Me: Dale, did the githooks run before you pushed commit `abcd1234`?
>
> Dale: Of course.
>
> Me: Can you check to make sure all the hooks are there?
>
> Dale: Yep, everything's running fine.
>
> Me: Just to humor me, can you run `cat .git/hooks/pre-commit` and tell me what happens?

> Dale: `cat: .git/hooks/pre-commit: No such file or directory`
>
> Dale: Now that you mention it, I did delete the `.git` folder yesterday because GitHub was down and I thought it was me.

I had to go lie down.  This was the day that Dale ceased to be, and Wheatley was crowned in his place.  We built a Chrome extension to replace Dale's avatar with Wheatley in the company chat.  Helped a LOT to relieve tension.