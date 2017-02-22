'use strict';
const brain = require('../brain');

module.exports = robot => {
  return {
    respondTo: /gimme (.+)/i,
    handler(msg) {
      const lists = brain.getReadingListsForChannel(msg.envelope.room);
      if (lists.length > 0) {
        const md = lists[0].markdown.join('\n-----\n');

        robot.adapter.client.web.files.upload(`${lists[0].name}.md`, {
          title: lists[0].name,
          filetype: 'post',
          content: md,
          channels: msg.envelope.room
        });
      }
    }
  };
}
