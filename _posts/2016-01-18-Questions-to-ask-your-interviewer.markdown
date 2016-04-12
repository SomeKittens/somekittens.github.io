---
layout: post
title: Questions to ask your interviewer
permalink: /articles/Questions-to-ask-your-interviewer.html
---
[Last time](https://rkoutnik.com/articles/How-I-Interview.html), we talked about how to design a technical interview as a filter, starting primarily with determining what sort of person is "good".  This time, I'm turning the tables to look at the other side of things.  Let's talk about some questions you can use to determine if a company is where you want to work.
<!--jump-->
The tech world is a seller's market for [talent](https://rkoutnik.com/articles/Valley-Talent.html).  It's difficult to get a good read on a company from the information you have pre-interview.  Companies of all shapes and sizes want to throw you through their gauntlet.  Some interviewers will say whatever it takes to get you to sign, others look at their company with rose-tinted glasses.  Neither will help you find a job you'll love.  Most questions are easily dodged ("What's the worst part of this job?", "There's too much to do but you'll fix that!").

On the other hand, an attentive interviewer will see these questions as a positive - you're the sort of person who thinks things through and knows what they're after.  This also helps the interviewer determine what you're looking for and tailor the rest of the interview to that.

### Why general questions fail 

Many traditional questions fall short because the interviewer isn't incentivised to provide a candid answer.  Consider: "Do you trust management?"  "Trust" is a strong word with some emotional charge.  If the interviewer expresses doubts, that may be enough to kill the candidate's interest altogether.  No one wants to be the person who lost a promising candidate, so a little white lie emerges.  "Sure!" they say.  Two months into the job you realize they *actually* meant you could trust management to get paychecks in on time (and not much else).

Instead, use a specific question or ask something general and drill down for details.  In the above example we could instead ask "What is your management's vision?"  This doesn't cover all of the bases we had previously but the answer is more likely to be actionable.  It tells us how good leaders are at communicating where they want to go.  It gives a window into the future of the company - do they just want to get bought?  Is there just vague "Change the world" promises?

Many engineers can optimistically gloss over problems.

Q: How does your team overcome challenges?

A: I believe in clear, open communication and have noticed that in general everyone at Initech seems to as well. Transparency has helped my team overcome obstacles and move forward together.

Q: Can you give me an example of your team overcoming a difficult obstacle recently?

A: Well, I guess we talk about blockers at our daily standups.

Getting concrete examples means you get past the marketing fluff to a company's real values.

## Finding red flags

> What are you hoping I'll change?

There are two things I'm looking for in this question: another angle on the job description and wishful thinking.

Job descriptions tell part of the story.  Now that you're in for an interview, it's time to get the other half.  This is a great time to talk about potential projects, advancement, and how you in particular will fit in.  If the interview seems tense, asking this question can lighten the mood a bit.

On the other hand, I've often heard things like "Tests are important but we don't have them.  We're hoping you'll be able to help out with that."  Did you catch the wishful thinking there?  If tests are important then the team should already have a test suite.  The interviewer is expecting you to change the company culture without any power to do so.  The interviewer isn't twirling their moustache Snidely Whiplash-style, expecting massive change from a new hire - it's just the optimism that curses every engineer.

> How often are you pulled off your primary task?

It seems obvious that someone with the title of "Software Engineer" would spend most of their time engineering software.  In some places, a more accurate title would be "meeting attender who writes code on occasion."  Other places expect developers to expand beyond their role, creating their own wireframes or deployment strategies.  Even worse, your job requirements could change dramatically.  A startup hired one of my friends as a full-stack engineer and he spent most of his time managing ad campaigns on social networks.

## Technical

> How does your development process work?

This question is essentially a simple [Joel test](http://www.joelonsoftware.com/articles/fog0000000043.html).  Lack of source control, tests & code review are all smells that shouldn't nix the company altogether but will need consideration.

> How does your deployment process work?

I once joined a company without asking this question and to my dismay discovered the answer was "ssh into all of our servers (one by one) and manually copy/paste the files".  This should be a gimme for any modern company.

A basic deployment process should be:

 - able to roll back
 - easy to see what changed
 - deterministic

Even `git pull` suffices here (though only as a bare minimum).

> The last person who was fired - why did that happen?  Do you think it was for a reason other than the official one?

This is tricky and I wouldn't ask it at every interview (in fact, I received pushback on it from almost every reviewer).  Often there's some difference between the official reason for a firing (if management provides one at all) and what the rank and file suspect.  Other times it's "This guy was a total jackhole" - a great sign that management is willing to prune a branch for the benefit of the tree.

If "firing" seems a step too far, substitute "disciplined" or the like.

> What tools does your team use to communicate?

For virtually all information, async communication methods trump synchronous ones.  Async tools like chat, bug trackers, email and the like send information so that the receiver can pick it up on their own time.  Synchronous communication (face-to-face) means that someone's going to get interrupted.  It also means that remote workers often [get pulled out of the loop](http://randsinrepose.com/archives/the-pond/).

A good follow up is "How was the last big announcement handled?"  It's common for upper management to flub communication and expect the telephone line to make sure everyone's properly informed.  Big events where everyone gets the same info (or heck, even an email blast) are important.

## Culture

> Imagine a realm where we're expected to make decisions on a daily or weekly basis.  Let’s say you and I disagree on an important decision.  We can’t reach a consensus and have to agree to disagree. What then? Whose approach wins?

Here we're measuring how autocratic our potential employer is.  [Flatness](https://rkoutnik.com/articles/Flat-is-weird.html) is the hip thing to be these days and companies want to show off how much autonomy their engineers get.  You want to dig beyond the dazzle.  If the answer seems flaky, ask for a real-life example.  It's a red flag if the interviewer has trouble coming up with an example that fits the company's claims.

> What does it take to succeed at this company beyond "hard work"?

We're trying to separate the marketing from the real culture.  Virtually every interviewer will start their answer with chaff like "hard work, being smart, writing good code".  Go deeper and find the difference between "general expectations" and what this company uniquely wants from you.

Good answers will be specific.  Great answers will be tailored to you as a candidate.

> If I'm not meeting expectations, how will I know?

You can't improve without feedback of both kinds.  I've worked at companies that would rather an engineer drag along, closing tickets than dare to ask them to improve and risk them leaving.  Others can be sudden - quick firings without much warning.

You're looking for a company with a culture of [candid feedback](http://firstround.com/review/radical-candor-the-surprising-secret-to-being-a-good-boss/).  Everything works better when people are honest with each other.  A workplace that values consistent, high-quality feedback means you'll improve your technical skillset and be surrounded by constantly-improving folks.

> How will I get better at my job?

There's a lot of great answers to this question: training budget, conferences, Friday tech talks, mentoring program (and more!).  A good answer is anything beyond a shrug or minor platitudes.  In those cases it's very likely you'll be left to your own devices in improving.

Finally, the most important question of all:

> The tortoise lays on its back, its belly baking in the hot sun, beating its legs trying to turn itself over. But it can't. Not without your help. But you're not helping.

It's important to work with empathetic people who aren't [murderous replicants](https://en.wikipedia.org/wiki/Replicant).

You probably don't want to use all of these questions at every interview.  I hope I've helped you re-think how to interview a company.  Think I missed something?  [Let me know!](mailto:blog@rkoutnik.com)
