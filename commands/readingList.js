'use strict';
const brain = require('../brain');

module.exports = {
  respondTo: /((daily|weekly)\s+)?reading list( :(.+):)? (.+)/i,
  handler(msg) {
    let [ , , dailyOrWeekly, , emoji, listName ] = msg.match;
    if (!dailyOrWeekly) {
      dailyOrWeekly = 'weekly';
    }
    if (!emoji) {
      emoji = 'book';
    }

    brain.saveReadingList({
      channels: [ msg.envelope.room ],
      frequency: dailyOrWeekly,
      name: listName,
      emoji,
      markdown: []
    });
  }
};
