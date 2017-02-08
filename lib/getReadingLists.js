'use strict';
const openGraph = require('open-graph-scraper');

module.exports = function(o) {
  return new Promise((resolve, reject) => {
    if (o.response.message.type !== 'reaction_added') {
      return reject();
    }

    const readingLists = o.robot.brain.readingLists.filter(list => list.emoji === o.response.message.reaction && list.channels.indexOf(o.response.envelope.room) >= 0);
    if (readingLists.length === 0) {
      return reject();
    }

    o.readingLists = readingLists;
    resolve(o);
  });
};
