---
layout: post
title: Don't start a hosting company
permalink: /articles/Dont-start-a-hosting-company.html
---

I talk to a lot of people who are just starting their first startup. A large percentage of them want to know what it'll take to start a webhosting company. This isn't surprising, as web hosting companies like GoDaddy are very visible. The first step to any project is some sort of hosting. The technical challenges don't seem overwhelming to the beginner - chances are, they've played with some sort of server already. Most importantly, hosting services seem to make a _lot_ of money. To the uninitiated, this seems like a great area to enter. In this essay, I hope to explain why you shouldn't start a hosting service, while also explaining more general pitfalls beginners encounter.

## Current market size rarely matters

Lots of beginners fall for the [1% fallacy](http://successfulsoftware.net/2013/03/11/the-1-percent-fallacy/) (the idea that all they need to succeed is 1% of the market) when selecting what to build. They see large, entrenched players as a good sign - there's money to be made here. Large companies are particularly keen on not letting an upstart steal their profits. More than likely, they'll steal whatever makes you special and you'll lose your customers.

Every major tech company has had either an entirely new product or one that was ten times as good as the competition. "Yet another hosting company" doesn't cut it. [0]

Speaking of that...

## You're not special

You'll need to do something to differentiate yourself from other companies - it's called a competitive advantage. It'll be hard to compete on price with the big guys and their massive scale. Most other factors are just as difficult - bandwidth, server power and uptime are all costly. Ease of use may be one option. Heroku made it incredibly easy for developers to get an app online and keep it updated. Digital Ocean has won many customers based on their easy-to-use administration panel. You'd need to find a target demographic that doesn't have their particular interests served and build something for them. The trouble is finding a niche in between developer-friendly solutions like DO and Heroku and non-technical people that just need a Wordpress install [1].

## It's not easy

I remember setting up my first server and finally coaxing Ubuntu 8.10 to life. It's a wonderful experience seeing a web page you wrote load, and fairly easy to repeat once the basic steps are learned. Selling web hosting space is _much_ more difficult. You'll need to consider how to:

*   Isolate different servers (cheaply!) so that users can only access their own data?
*   Give everyone a fair share of the server's resources?
*   Determine how much you bill for what?
*   Prevent hardware failure (and what do you do when the inevitable happens?)
*   Design a dashboard that people want to use (i.e. not cPanel)
*   Send email!
*   Deal with spammers using your service
*   Deal with the FBI when they accuse you of assisting software pirates (or worse!)

This last section is not an explicit reason to not start a web hosting company, but as an example of how difficult starting anything is [2]. Most who want found web hosting companies chose hosting because "I know what I'm doing" - even though they couldn't answer the above questions. This shouldn't be insulting, everyone was a novice at some point. A good exercise to learn more in this area is to use a competitor's product. Go through the process slowly. Think about what it will take to copy each of their features [3].

This being said, there are still plenty of opportunities to find in the startup space. Your first, tenth or even hundredth idea doesn't have to be the one. Keep building new things, learn from your mistakes, and eventually something will stick.

[0] It should be noted that while Google started in an already-crowded market, they had a product that was orders of magnitude better than the others. For more on this, see: [https://www.youtube.com/watch?v=5_0dVHMpJlo](https://www.youtube.com/watch?v=5_0dVHMpJlo)

[1] An argument could be made that WP installs _are_ a form of web hosting. If I haven't convinced you to do something other than hosting, this may be a lucrative way to start.

[2] The business side of things has been deliberately left out. However, these can be just as hard as the technical stuff.

[3] If you notice anything particularly annoying across the board, there may be opportunity there to do it _right_ and differentiate yourself.
