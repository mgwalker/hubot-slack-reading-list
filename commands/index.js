module.exports = robot => {
  const readingList = require('./readingList');
  const gimme = require('./gimme')(robot);

  robot.respond(readingList.respondTo, readingList.handler);

  // Enable this command just for debugging.  It will cause the
  // reading list for the channel to be posted immediately.
  // robot.respond(gimme.respondTo, gimme.handler);
};
