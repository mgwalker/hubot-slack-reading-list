'use strict';
const openGraph = require('open-graph-scraper');

function cleanGraph(graph, defaults = { url: '' }) {
  if (!graph.ogUrl) {
    graph.ogUrl = defaults.url;
  }
}

function getOpenGraphData(url) {
  return new Promise(resolve => {
    openGraph({ url }, (err, graph) => {
      if(!err) {
        cleanGraph(graph.data, { url });
        resolve(graph.data);
      }
      resolve();
    });
  });
}

module.exports = function(o) {
  return new Promise(resolve => {
    const awaiting = [ ];

    for(let url of o.urls) {
      awaiting.push(getOpenGraphData(url));
    }

    Promise.all(awaiting).then(graphs => {
      // Only keep graphs that are defined
      o.openGraph = graphs.filter(graph => graph);
      resolve(o);
    });
  });
};
