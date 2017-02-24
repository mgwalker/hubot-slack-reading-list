'use strict';
const brain = require('../brain');

module.exports = {
  channelInfo: {
    respondTo: /reading lists/i,
    handler(res) {
      const lists = brain.getReadingListsForChannel(res.envelope.room);
      if (lists.length) {
        res.send(`This channel is in the following reading lists:\n${lists.map(list => `* :${list.emoji}: ${list.name}`).join('\n')}`);
      } else {
        res.send('This channel isn\'t part of any reading lists');
      }
    }
  },
  listInfo: {
    respondTo: /reading list info (.+)/i,
    handler(msg) {
      const [ , listName ] = msg.match;

      brain.getReadingListInfo(listName, msg.envelope.room);
    }
  }
};
