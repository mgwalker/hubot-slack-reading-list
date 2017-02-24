const brain = require('../brain');

module.exports = function getReadingLists(o) {
  return new Promise((resolve, reject) => {
    if (o.response.message.type === 'reaction_added') {
      const channel = o.response.message.room;
      const emoji = o.response.message.reaction;

      const readingLists = brain.getReadingListsForChannelAndEmoji(channel, emoji);
      if (readingLists.length === 0) {
        reject();
      } else {
        const out = o;
        out.readingLists = readingLists;
        resolve(out);
      }
    } else {
      reject();
    }
  });
};
