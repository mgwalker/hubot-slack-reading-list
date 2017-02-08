'use strict';
const openGraph = require('open-graph-scraper');
const brain = require('../brain');

module.exports = function(o) {
  return new Promise((resolve, reject) => {
    if (o.response.message.type !== 'reaction_added') {
      return reject();
    }

    const channel = o.response.message.room;
    const emoji = o.response.message.reaction;

    const readingLists = brain.getReadingListsForChannelAndEmoji(channel, emoji);
    if (readingLists.length === 0) {
      reject();
    } else {
      o.readingLists = readingLists;
      resolve(o);
    }
  });
};
