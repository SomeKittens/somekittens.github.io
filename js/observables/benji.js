/*global d3,Rx*/

(function () {
  'use strict';
  var lines = [];

  var w = 800;
  var svg = d3.select('.typeahead-svg-container').append('svg').attr('width', w).attr('height', 450);
  var d = document.querySelector('.typeahead-results');

  var keyUps = Rx.Observable.fromEvent(document.getElementById('myInput'), 'keyup');
  draw('Key Up', keyUps);
  let maps = keyUps.map(e => e.target.value);
  draw('Map', maps);

  var filtered = maps.filter(val => val.length > 3);
  draw('Filtered', filtered);

  var debounce = filtered.debounce(333);
  draw('Debounce', debounce);

  var distinct = debounce.distinctUntilChanged();
  draw('Distinct Until Changed', distinct);

  var performSearch = distinct.flatMap(function(searchTerm){
    d.innerHTML = '';
    return fetch('https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=' + searchTerm)
    .then(resp => resp.json());
  })
  .catch(() => ({items:[]}));
  draw('Search results', performSearch);

  var titles = performSearch
  .flatMap(val => val.items)
  .map(item => item.title.link(item.link));
  draw('Question titles', titles);

  titles.subscribe(function(val){
     d.innerHTML = val + '<br />' + d.innerHTML;
  });

  function draw(msg, obs) {
    var i = lines.length;
    if (!obs) {
      obs = msg;
      msg = '';
    }
    svg.append('text')
      .attr('fill', 'black')
      .attr('x', 40)
      .attr('y', 20 + i * 60)
      .attr('font-family', 'sans-serif').attr('font-size', '15px')
      .text(msg);

    var line = svg.append('line')
      .attr('x1', 40)
      .attr('y1', 40 + i * 60)
      .attr('x2', w - 40)
      .attr('y2', 40 + i * 60)
      .attr('stroke-width', 2)
      .attr('stroke', 'black')
      .attr('marker-end', 'url(\#arrow)')
      .attr('marker-start', 'url(\#arrow)');
    lines.push({
      line: line,
      obs: obs
    });

    obs.subscribe(function onData(data) {
      var circle = svg.append('circle')
        .attr('cx', 40)
        .attr('cy', 40 + 60 * i)
        .attr('r', 15)
        .attr('fill', randomColor())
        .transition()
        .duration(1000 + w * 10)
        .ease('linear')
        .attr('cx', w - 40)
        .remove();
    }, function onError(err) {

    }, function complete() {
      line.attr('stroke', 'grey');
    });
  }

  makeArrow();

  function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  function makeArrow() {
    svg.append('svg:defs')
      .append('svg:marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 0)
      .attr('refY', 5)
      .attr('markerUnits', 'strokeWidth')
      .attr('markerWidth', 8)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z');
  }
})();