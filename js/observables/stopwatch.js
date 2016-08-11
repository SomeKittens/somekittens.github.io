/*global Rx*/

// Stopwatch example
(function () {
  'use strict';
  let startButton = document.querySelector('.button.start-button');
  let stopButton = document.querySelector('.button.stop-button');
  let resultsArea = document.querySelector('.output');
  let startClick$ = Rx.Observable.fromEvent(startButton, 'click');
  let stopClick$ = Rx.Observable.fromEvent(stopButton, 'click');
  let tenthSecond$ = Rx.Observable.interval(100);

  startClick$.subscribe(() => {
    tenthSecond$
    .map(item => (item / 10).toFixed(1))
    .takeUntil(stopClick$)
    .subscribe((int) => resultsArea.innerText = int);
  });
})();