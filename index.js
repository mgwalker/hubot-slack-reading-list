const fs = require('fs');
const lib = require('./lib');
const commands = require('./commands');
const reaction = require('./reaction');

module.exports = robot => {
  if(!robot.brain.readingLists) {
    robot.brain.readingLists = [ ];
  }

  if(robot.adapter.constructor.name !== 'SlackBot') {
    robot.logger.error('hubot-slack-reading-list: only works with the Slack adapter');
    return;
  }

  commands.setup(robot);
  robot.react(reaction(robot));

  robot.logger.info('hubot-slack-reading-list: loaded and ready');
}
