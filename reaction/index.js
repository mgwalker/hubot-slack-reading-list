'use strict';
const addToReadingList = require('./addToReadingList');
const getMarkdown = require('./getMarkdown');
const getMessageURLs = require('./getMessageURLs');
const getOpenGraphData = require('./getOpenGraphData');
const getReadingLists = require('./getReadingLists');

module.exports = robot => {
  robot.react(response => {
    getReadingLists({ response, robot })
      .then(getMessageURLs)
      .then(getOpenGraphData)
      .then(getMarkdown)
      .then(addToReadingList)
      .then(o => {
      })
      .catch(e => {
        if(e) {
          robot.logger.error('hubot-slack-reading-list: unhandled exception');
          console.log(e);
        }
      })
  });
};
