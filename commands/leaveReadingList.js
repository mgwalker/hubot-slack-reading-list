'use strict';
const brain = require('../brain');

module.exports = {
  respondTo: /leave reading list (.+)/i,
  handler(msg) {
    const [ , listName ] = msg.match;

    brain.removeChannelFromList(listName, msg.envelope.room);
  }
};
