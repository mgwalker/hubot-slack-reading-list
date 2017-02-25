const readingList = require('./readingList');
const info = require('./readingListInfo');
const leaveReadingList = require('./leaveReadingList');

module.exports = (robot) => {
  robot.respond(info.listInfo.respondTo, info.listInfo.handler);
  robot.respond(info.channelInfo.respondTo, info.channelInfo.handler);
  robot.respond(readingList.respondTo, readingList.handler);
  robot.respond(leaveReadingList.respondTo, leaveReadingList.handler);

  // Enable this command just for debugging.  It will cause the
  // reading list for the channel to be posted immediately.
  // const gimme = require('./gimme')(robot);
  // robot.respond(gimme.respondTo, gimme.handler);
};
