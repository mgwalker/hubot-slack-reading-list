const lib = require('./lib');

module.exports = robot => {
  return response => {

    lib.getReadingLists({ response, robot })
      .then(lib.getMessageURLs)
      .then(lib.getReadingLists)
      .then(lib.getOpenGraphData)
      .then(lib.getMarkdown)
      .then(lib.addToReadingList)
      .then(o => {
      })
      .catch(e => {
        if(e) {
          robot.logger.error('hubot-slack-reading-list: unhandled exception');
          console.log(e);
        }
      })
  };
};
