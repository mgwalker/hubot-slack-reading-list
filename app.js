module.exports = function app(brain, commands, reaction, schedule, postLists, robot) {
  if (robot.adapter.constructor.name !== 'SlackBot') {
    robot.logger.error('hubot-slack-reading-list: only works with the Slack adapter');
    return;
  }

  brain.setRobot(robot);
  commands(robot);
  reaction(robot);

  schedule(postLists(robot));

  robot.logger.info('hubot-slack-reading-list: loaded and ready');
};
