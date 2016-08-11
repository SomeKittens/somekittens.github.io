(function() {
  'use strict';

  var dps = {
    all: [],
    edit: [],
    log: [],
    new: []
  }; // dataPoints

  var chart = new CanvasJS.Chart('chartContainer', {
    title: {
      text: 'Wikipedia edits per decisecond'
    },
    data: [{
      type: 'line',
      dataPoints: dps.all
    }]
  });

  var chart2 = new CanvasJS.Chart('chart2Container', {
    title: {
      text: 'Composition of Edits'
    },
    data: [{
      type: 'stackedColumn',
      dataPoints: dps.edit,
      showInLegend: true,
      legendText: 'Edit'
    }, {
      type: 'stackedColumn',
      dataPoints: dps.log,
      showInLegend: true,
      legendText: 'Log'
    }, {
      type: 'stackedColumn',
      dataPoints: dps.new,
      showInLegend: true,
      legendText: 'New Page'
    }],
    legend: {
       horizontalAlign: 'left', // 'center' , 'right'
       verticalAlign: 'top',  // 'top' , 'bottom'
       fontSize: 15
     }
  });

  var xVal = 0;
  var updateInterval = 100;
  var dataLength = 100; // number of dataPoints visible at any point

  let editorTable = document.querySelector('.editor-body');
  let pagesTable = document.querySelector('.page-body');

  let objStats = new SuddenStats({
    stats: {
      ips: {
        type: 'uniq',
        path: 'users'
      },
      type: {
        type: 'uniq',
        path: 'type',
        level: 'minute'
      },
      urls: {
        type: 'uniq',
        path: 'urls'
      }
    }
  });

  let wikiEvents$ = Rx.Observable.create(o => {
    let socket = io.connect('//stream.wikimedia.org:80/rc');
    socket.on('connect_error', (objData) => o.onError(objData));
    socket.on('connect', () => socket.emit('subscribe', '*'));

    socket.on('change', (objData) => o.onNext(objData));
  }).map(edit => ({
    id: edit.id,
    type: edit.type,
    source: edit.server_name,
    users: [edit.user],
    urls: [edit.server_url + '/wiki/' + edit.title.replace(/\s/g, '_')]
  }))
  .do(edit => objStats.qData(edit))
  .bufferWithTime(updateInterval);

  let processEdits = edits => {
    dps.all.push({
      x: xVal,
      y: edits.length
    });
    dps.edit.push({
      x: xVal,
      y: (edits.filter(e => e.type === 'edit')).length
    });
    dps.log.push({
      x: xVal,
      y: (edits.filter(e => e.type === 'log')).length
    });
    dps.new.push({
      x: xVal,
      y: (edits.filter(e => e.type === 'new')).length
    });
    xVal++;
    if (dps.all.length > dataLength) {
      dps.all.shift();
      dps.edit.shift();
      dps.log.shift();
      dps.new.shift();
    }

    let makeTable = (data, el, isPage) => {
      el.innerHTML = '';
      Object.keys(data)
        .map(key => [key, data[key]])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .forEach(item => {
          let tr = document.createElement('tr');
          let tds = [document.createElement('td'), document.createElement('td')];
          tds[0].innerText = isPage ? item[0].split('/wiki/')[1] : item[0];
          tds[1].innerText = item[1];
          tr.appendChild(tds[1]);
          tr.appendChild(tds[0]);
          el.appendChild(tr);
        });
    };

    // Find most prolific users
    makeTable(objStats.stats.ips.values, editorTable);
    // Find most edited pages
    makeTable(objStats.stats.urls.values, pagesTable, true);

    chart.render();
    chart2.render();
  };

  let running = false;
  Reveal.addEventListener('wiki', () => {
    if (!running) {
      running = true;
      wikiEvents$.subscribe(processEdits);
    }
  });

})();