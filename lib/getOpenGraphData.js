'use strict';
const openGraph = require('open-graph-scraper');

module.exports = function(o) {
  return new Promise((resolve, reject) => {
    o.openGraph = [ ];
    const awaiting = [ ];

    for(let url of o.urls) {
      awaiting.push(new Promise((done) => {
        openGraph({ url }, (err, og) => {
          if(err) {
            done();
          } else {
            if (!og.data.ogUrl) {
              og.data.ogUrl = url;
            }
            o.openGraph.push(og.data);
            done();
          }
        })
      }));
    }

    Promise.all(awaiting).then(() => resolve(o));
  });
};
