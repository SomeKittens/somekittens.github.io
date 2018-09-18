---
layout: post
title: Stateful Filters in RxJS
---

I'm just finishing the last stages of writing [Building Reactive Websites with RxJS](https://pragprog.com/book/rkrxjs/build-reactive-websites-with-rxjs), to be published through Pragmatic Publishing.  I'm a huge fan of RxJS, even if it is a bit complicated to get used to.  In an effort to demystify this library, I'd like to walk through a few case studies over the next few weeks and analyze how to use it in real-world scenarios.

The first case study comes from one of my old jobs at a cybersecurity company.  This company had an offering where they'd crawl The Dark Web (I still can't belive sales folks said that with a straight face) and look for keywords set up by clients.  Ostensibly, this tool could be used to detect leaks of software and/or internal documents.  In order to achieve this scanning ability, we need to build a filter that can be dynamically updated.

The crucial thing to think about when writing software using RxJS is to model everything as a stream of events over time.  If your application does not lend itself well to this modeling, RxJS may not be for you.  Fortunately, this task is easy to model as two separate streams.  One, from Kafka, is new data from the crawler.  The other comes from a database poller and contains the keywords our filter needs to test against.

We'll start off with two magic variables that represent these streams, as dealing with Kafka is outside the scope of this post.  Appending a dollar sign to the end of the variable is a convention used to show that variable is an observable.

```typescript
crawlResults$;
latestKeywords$;
```

RxJS already has a built-in filter operator, so this would work, at least until the list of keywords was updated.

```typescript
crawlResults$
.pipe(
  filter(content => keywords.some(content.includes(keyword))
)
```

The tricky part of this challenge is that we're implementing a _stateful_ filter.  Clients could update the keyword list at any time.  We'll need to store that state somewhere.  One option is to just create an array of keywords and manually keep it updated:

```typescript
let filterKeywords = [];
// every five minutes
interval(5 * 60 * 1000)
.pipe(
  mergeMap(() => dbQuery())
)
.subscribe(newFilterKeywords => {
  filterKeywords = newFilterKeywords;
});
```

This leaves us holding the bag around both state and managing subscriptions.  In this example, we need to make sure that the subscription is properly disposed of, otherwise we might accidentally create tons of pollers and overwhelm the database with queries (this never happened, I don't know what you're talking about and don't belive anything my former coworkers say about this).

The obvious advantage of RxJS is modeling everything as streams but a lesser-known advantage is that RxJS provides many ways to store state inside the framework, ensuring that the library worries about subscriptions and filtering.  Combining two streams together in RxJS is known as 'merging' and there's a variety of merge operators to utilize here.  Most merges don't maintain an internal state and just send data on when they get it.  Here, we want to know the latest value from both streams on every event, so we turn to `combineLatest`.  The `combineLatest` constructor tracks multiple streams and on an event from any stream, emits the latest value of all streams as an array.


```typescript
combineLatest(
  crawlResults$,
  latestKeywords$
)
```

We're almost there.  The one remaining problem is that whenever `latestKeywords$` updates, this might pass along the latest hit from the crawler as well.  There's one operator that'll save us: `distinctUntilChanged`, which is a stateful filter that only passes a value if it's different from the previous value.  Throw in a `map` to extract the results from the keywords, and this looks like:

```typescript
combineLatest(
  crawlResults$,
  latestKeywords$
)
.pipe(
  filter(([results, keywords]) =>
    keywords.some(results.includes(keyword))),
  map(([results, keywords]) => results),
  distinctUntilChanged()
);
```

Tada!  A stateful merge filter, with the heavy lifting offloaded to the RxJS library.  If you want to learn more about RxJS, including building many functional examples, check out [Building Reactive Websites with RxJS](https://pragprog.com/book/rkrxjs/build-reactive-websites-with-rxjs), now in beta.