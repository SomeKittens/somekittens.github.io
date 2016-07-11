---
layout: post
title: How I Interview
permalink: /articles/How-I-Interview.html
---
Technical interviews are terrible because we don't know what we're filtering for.

## Interviews are filters

I think we all can agree that a *good* interview filter passes those who will do well at work and fails those who won't.  The trouble arises when we try to come to a common agreement on what "do well at work" means - every company is different. Instead, when we discuss interviews, we should grade them not on conformance to some holy standard but in how effectively they model day-to-day life at the company.  This allows us to remove some of our pre-existing bias and focus on finding candidates who knock it out of the park, not ones that look good on paper & whiteboards.

<!--jump-->

Candidates are also reviewing a company.  They'll be dedicating several years of their lives to this workplace and will be looking at the interview filter to see what it takes to get in.

After running lots of my own interviews and talking with industry vets, I've found three things an interview needs in order to accurately evaluate a candidate's performance.

#### Easy access to Google/StackOverflow/etc

I once had a conversation with a newcomer to programming who was ashamed of how often they needed to look something up.  We compared notes and it turns out I looked things up *more* often than they did!  The internet is a vital source of knowledge essential to programming.  You wouldn't evaluate a chef's ability to cook by depriving them of saucepans, why cut off Google?

#### Comfortable situation (IDE, keyboard, OS)

Programmers are *notoriously* nitpicky about our environment.  Imagine if you arrived at work and found a memo dictating that employees have freedom in choosing their text editor but must run it vanilla.  No custom config, no plugins and absolutely no [absurd themes](https://github.com/SomeKittens/ST-Hot-Dog-Stand).  Oh, and if you don't perform up to spec, you're fired.  How would you do?

Speaking of coding with your job at stake...

#### (Relatively) low stress!

I hope you don't have to prove yourself every day to stay employed.  Bugs pop up, servers crash, schedules slip.  It happens.  We pride ourselves on building systems that catch the plethora of mistakes we make every day and then refuse to permit any whatsoever in an interview.

By definition, an interview is stressful.  The interviewee is coding for a job.  *No one* performs their best under stress.  A good filter puts the candidate at ease to get a better read on their abilities.  A bad filter cranks the stress up with combative interviewers and trick questions, failing qualified candidates that your competitors will gladly pick up.

"But Randall" one might interject "programming is a high-stress environment.  Wouldn't it be prudent to test people to see how they perform under the gun?"

Didja miss the bit above about people not doing their best under stress?  If the average day in the life of your team is stressful enough that you think "Can survive immense pressure" is a prerequisite for joining, putting your current employees at ease should be your priority, never mind hiring.


### Common interview antipatterns

On the other hand, somehow we've collected a whole pile of interview styles that provide information that's orthogonal to the candidate at best and actively blinds the interviewer to the interviewee's skill at worse.

#### Algorithm analysis

Conventional wisdom says that those who can dig through traditional CS topics - big O notation, sorts, n-queens - are also skilled programmers.  This antipattern persists because it is true to an extent.  People who can candidly discuss such topics usually also have experience writing production code (we should remember that correlation does not imply causation).  Two exceptions:

 - False positive: CS students coming from programs that veer towards academic topics over writing code will appear more skilled than they are.
 - False negative: Self-taught programmers don't do much in-depth study of CS topics.  To turn a stereotype, they're more concerned with getting things done (and you should be too).

These false negatives should worry you.  Every good programmer is, to some extent, self-taught.  Why bias your interviews against that?  Filter for people who are good at doing their job, not someone else's.

This antipattern is also easily gameable.  Most questions in this vein are alike - it takes a night or two of study to get up to speed.  I want to find [talent, not knowledge](http://rkoutnik.com/articles/Valley-Talent.html), so I skip anything that's a quick Google away.

#### FizzBuzz & Whiteboard coding

Asking the candidate to write code on a whiteboard fails two of our three options above - they're outside of their environment and can't look anything up.  No one codes on a whiteboard outside of interviews (though I wouldn't be surprised if someone has figured out how to compile dry-erase to LLVM).  This goes double for the fizzbuzz-like questions that accompany a whiteboarding session - I ensure I know a candidate can code before we bring them on site.  Otherwise we're wasting everyone's time.  Asking trivial questions to people who have shown they can code is insulting (and how you miss out on [stellar engineers](https://twitter.com/mxcl/status/608682016205344768)).

(Sidenote: Working with the candidate to talk design & architecture is a different matter.  Whiteboards are a great medium to design a system, just not implement it).

#### Trick questions

There's a category of programming trivia where it's difficult to find the answer without a brilliant flash of insight.  Some interviewers have deluded themselves into thinking that memorizing answers to an array of trivia is an indication of a good developer.

Google tried these and [failed miserably](http://www.deathandtaxesmag.com/200732/google-admits-its-famous-job-interview-questions-were-a-complete-waste-of-time/).  Turns out knowledge of trivia (programming or not) has little to do with *actually programming*.  I'm not Google but I will gladly learn from their mistakes.

#### "See how you think"

There is a (fortunately) rare form of interview question that starts out as a trivial task for the interviewee to implement.  Once the candidate solves the task, the interviewer bans the method used to solve the problem.  The interviewee must complete the task again, using another, more unorthodox technique.  This repeats until the interviewee is out of ideas.

Unless your company has some moral argument against if statements, this technique only provides a good signal on the candidate's tolerance for mindless bureaucracy.

Alright, enough of the bad stuff.  Time to talk turkey about how I run things.

When I run in-person interviews, I'm usually interviewing someone with at least moderate experience in JavaScript.  Here's the problem I give interviewees:

> You have one hour to implement as much of Minesweeper as possible.  I've provided a JSBin for you though you're free to use whatever development tools/libraries/frameworks you're most comfortable with.  You're allowed to use whatever internet resources you need, excluding plagiarism.  I'll be available to answer any questions you may have.
> You're not expected to finish!  In fact, no one ever has.  Do your best and we'll chat about how things went afterward.

The work conditions fulfill our three criteria above:

 - The interviewee has full access to any resources they may need for the task (just like any decent dayjob).
 - A candidate can use whatever tools they need.  Most tend to use the laptop & JSBin provided - though there's a large variety in the libraries and frameworks used to put things together, from jQuery to canvas to React.  I also provide links to the icons, it'd be silly to rank a candidate based on their icon search abilities. 
 - I try to take the first five minutes and joke around with the candidate, get them talking about what they like (technical or not).  They're also not required to finish - Dropping the deadline relieves some of the pressure a candidate may feel.  I like to mention no one's finished so they don't come up with an imaginary super-hacker opponent.

Some say that using real code over whiteboards makes it harder for the candidate to explain as they go along.  Good!  I've _never_ had to explain code as I've been writing it in my roles as a software engineer.  I talk about my work *after* I've written it.  This interview mimics that behavior.  Don't you hate it when you're interrupted while coding?  Why put interviewees under the same strain?

### Why Minesweeper?

Minesweeper offers a host of interesting challenges for the candidate to select.  A good solution has three challenges: determine bomb placement, maintain cell state and render it all to the screen.  Most candidates touched on all parts but focused on one, showing off where they did best.  The code review afterward sends a strong signal - good candidates are eager to show off their work.

Having a consistent test also allows me to compare candidates easily and without bias.  It's important to have an understanding of what is "good" so you're not making pass/fail calls on your fallible gut (For instance, [judges tend to be more lenient after they've eaten lunch](http://blogs.discovermagazine.com/notrocketscience/2011/04/11/justice-is-served-but-more-so-after-lunch-how-food-breaks-sway-the-decisions-of-judges/).  Anecdotal evidence shows the same is true for interviews.)

Finally, I assumed that most everyone played Minesweeper at one point and I wouldn't need to explain the rules.  I was wrong on this one, I needed to review the rules about half the time.  This did give an opportunity for the candidate to show off their skills at extracting requirements from an ill-formed spec.

As an added bonus, if the candidate took the JSBin I was able to read it over on my own time & share the code they'd written with the rest of the team.  Take that, whiteboards!

I modeled this interview as a take-home task that took place at the office.  Take-home tests pass our three criteria above with flying colors though they have a fatal weakness - they take lot of our candidate's time when they're job hunting.  I'd love to see more companies use a 4-6 hour *instead* of an on-site rather than augmenting the interview.

### Critical success!

I consider it a success when a candidate is able to sketch out a game plan to tackle the problem at hand, execute against that plan and deal with difficulties that come up during the hour they spend coding.  Good questions impress me, as well as the ability to frankly discuss tradeoffs during the code review session.  One candidate who did not get as far talked about how they had designed the code to be flexible for a future settings menu.

I have not noticed any correlation between tools and success - of the two best performances, one eschewed frameworks entirely, using the browser's built-in canvas while the other depended on a large framework.

### Failure

Minesweeper determines the interviewee's ability to take on non-trivial tasks.  A candidate who had just breezed past a handful of fizzbuzz-style questions stumbled badly when handed Minesweeper.  They talked around the problem for a half-hour, never digging into the problem itself.  Questions are good - but you don't want to thumbs-up a candidate who's all talk.

Another candidate surprised me by spending the entire hour silently typing but never running the code.  As they hit their time, they handed me the laptop and asked "Did I get it right?"  Programmers need to know how to check their own work.

(If you're interested in trying out this exercise, you can find the JSBin [here](http://jsbin.com/jucesisaki/2/edit?html,js,output).  [Let me know](http://rkoutnik.com/contact) what you come up with!)
