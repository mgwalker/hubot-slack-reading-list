module.exports = robot => {
  const readingList = require('./readingList');
  const gimme = require('./gimme')(robot);

  robot.respond(readingList.respondTo, readingList.handler);
  robot.respond(gimme.respondTo, gimme.handler);
};
