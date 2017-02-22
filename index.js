'use strict';
require('dotenv').config()

const brain = require('./brain');
const commands = require('./commands');
const reaction = require('./reaction');
const schedule = require('./schedule');
const postLists = require('./post');

module.exports = robot => {
  if(robot.adapter.constructor.name !== 'SlackBot') {
    robot.logger.error('hubot-slack-reading-list: only works with the Slack adapter');
    return;
  }

  brain.setRobot(robot);
  commands(robot);
  reaction(robot);

  schedule(postLists(robot));

  robot.logger.info('hubot-slack-reading-list: loaded and ready');
}
