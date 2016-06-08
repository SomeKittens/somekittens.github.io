---
layout: post
title: Bypassing two-factor auth in Protractor
---

Two-Factor authentication is practically mandatory in today's world.  The attack surface presented to malicious actors means that a short string is no longer sufficient to prove our identity.  We can double down on effective authentication by centralizing it via OAuth.  This decreases the attack surface, putting our precious identities in the hands of a few highly-skilled engineers instead of a swath of WordPress installers.

Additional security comes at a cost and part of this cost is paid in the complexity of testing - now that we've added an external provider, we no longer control the entire process.  End to End (e2e) testing can still work with OAuth, though this means we need to add our passwords everywhere.  Hopefully you're not checking them in to git but you'll need to enter it somewhere if you want the test to be completely automated.  Once two-factor auth enters the picture, the test cannot both go through the OAuth login flow _and_ be fully automated.

In this tutorial, I'll walk through the process of writing testable Angular code that allows fully-automated tests to bypass the OAuth login flow.  We'll be using [Protractor](angular.github.io/protractor/#/), the de facto Angular e2e tool.

### On to the code!

The first order of business is to write testable code.  We need a service that will handle the login process for us.  This service returns a promise that resolves into our user data:

```javascript

// Use a factory or service, whatever you prefer
.factory('fetchUser', function ($q) {
    return $q(resolve => {
      // Poll gapi or your own API
    });
});
```

This service should communicate with an API (either a third-party like [Google's JS API](https://developers.google.com/api-client-library/javascript/start/start-js#how-it-looks-in-javascript) or your own) and redirect to the OAuth login page when needed.  So long as you're doing all the fetching/redirecting inside this service (no side effects), you're good so far.

Now we need to write a second service with the _same name_, this time in our Protractor configuration file.  This will be the `onPrepare` property, as we want to run this code _after_ Protractor has loaded all of its globals in.  Specifically, we want `browser.addMockModule`.  Contrary to what the docs imply, this function can be used to retrieve existing modules.  Let's take a look at the code:

```javascript
// conf.js

onPrepare: function () {
  // First argument is a string of the module we want
  // This will ensure that module is loaded before this function executes
  browser.addMockModule('app', function () {
    let mockUser = {}; // User data
    angular.module('app') // Using getter for module
    .factory('fetchUser', function ($q) {
      return $q.resolve(mockUser);
    });
  });
}
```

Angular stores all components in a single global namespace, for better or worse.  Overriding previous components is just like writing a new property to an object - Angular doesn't care or warn that it's happening.  Tools like [Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en) attempted to fix this (sadly, Google abandoned the project).  We're overwriting our previous `fetchUser` and replacing it with a mock.  For all intents and purposes, the rest of our app will think the e2e user is logged in.

Voila!  You now have an app that combines the best user authentication practices with the ease of fully automated e2e testing.  There is one caveat before we go.  We no longer test a section of the app that every user will hit.  This means CI tools will not find bugs introduced at this level (and any bugs here will almost certainly be critical).  The good news is manually testing this segment is fairly trivial and unit tests can still be written.  Any changes to the login section should go through additional scrutiny before hitting prod.