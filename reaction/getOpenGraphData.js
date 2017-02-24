
const openGraph = require('open-graph-scraper');

function cleanGraph(graph, defaults = { url: '' }) {
  if (!graph.ogUrl) {
    graph.ogUrl = defaults.url; // eslint-disable-line no-param-reassign
  }
}

function fetchOpenGraphData(url) {
  return new Promise((resolve) => {
    openGraph({ url }, (err, graph) => {
      if (!err) {
        cleanGraph(graph.data, { url });
        resolve(graph.data);
      }
      resolve();
    });
  });
}

module.exports = function getOpenGraphData(o) {
  return new Promise((resolve) => {
    const awaiting = [];

    for (const url of o.urls) {
      awaiting.push(fetchOpenGraphData(url));
    }

    Promise.all(awaiting).then((graphs) => {
      // Only keep graphs that are defined
      const out = o;
      out.openGraph = graphs.filter(graph => graph);
      resolve(out);
    });
  });
};
