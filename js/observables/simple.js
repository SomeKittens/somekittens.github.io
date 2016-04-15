(function () {
  'use strict';

  let result = document.querySelector('.basic-result');
  let subscription;

  Reveal.addEventListener('basic', function() {
    result.innerHTML = '';
    subscription = Rx.Observable.create(o => {
      let myInterval = setInterval(() => o.onNext('hello'), 1000);
      return () => {
        clearInterval(myInterval);
        result.innerHTML = '';
      };
    })
    .map((val, idx) => {
      if (idx === 10) {
        return 'Adele mode engaged';
      }
      if (idx > 10) {
        return val + `, it's me`;
      }
      return val + '!';
    })
    .subscribe(val => result.innerHTML = val + '<br>' + result.innerHTML);
  }, false );

  Reveal.addEventListener('slidechanged', function( event ) {
    if ((event.indexh === 9 || event.indexh === 11) && subscription && subscription.dispose) {
      subscription.dispose();
    }
  });
})();