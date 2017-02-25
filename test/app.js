const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies
const sinon = require('sinon'); // eslint-disable-line import/no-extraneous-dependencies

const appModule = require('../app');

const sandbox = sinon.sandbox.create();

const brain = {
  setRobot: sandbox.spy()
};
const commands = sandbox.spy();
const reaction = sandbox.spy();
const schedule = sandbox.spy();
const postLists = sandbox.spy();
const robot = {
  adapter: {
    constructor: {
      name: ''
    }
  },
  logger: {
    info: sandbox.spy(),
    error: sandbox.spy()
  }
};

test.test('main module', (mainModuleTest) => {
  mainModuleTest.equal(typeof appModule, 'function', 'should be a function');

  mainModuleTest.test('called with a non-Slack adapter', (badAdapterTest) => {
    sandbox.reset();
    delete robot.adapter.constructor.name;
    appModule(brain, commands, reaction, schedule, postLists, robot);
    badAdapterTest.equal(robot.logger.error.callCount, 1, 'logs an error');
    badAdapterTest.equal(brain.setRobot.callCount, 0, 'does not set the robot brain');
    badAdapterTest.equal(commands.callCount, 0, 'does not register commands');
    badAdapterTest.equal(reaction.callCount, 0, 'does not register reaction handlers');
    badAdapterTest.equal(schedule.callCount, 0, 'does not schedule posts');
    badAdapterTest.equal(postLists.callCount, 0, 'does not get a posting function');
    badAdapterTest.end();
  });

  mainModuleTest.test('called with a Slack adapter', (goodAdapterTest) => {
    sandbox.reset();
    robot.adapter.constructor.name = 'SlackBot';
    appModule(brain, commands, reaction, schedule, postLists, robot);
    goodAdapterTest.equal(robot.logger.info.callCount, 1, 'logs an info message');
    goodAdapterTest.equal(brain.setRobot.callCount, 1, 'sets the robot brain');
    goodAdapterTest.equal(brain.setRobot.args[0][0], robot, 'sets the robot brain to the robot');
    goodAdapterTest.equal(commands.callCount, 1, 'registers commands');
    goodAdapterTest.equal(reaction.callCount, 1, 'registers reaction handlers');
    goodAdapterTest.equal(schedule.callCount, 1, 'schedules posts');
    goodAdapterTest.equal(postLists.callCount, 1, 'get a posting function');
    goodAdapterTest.end();
  });

  mainModuleTest.end();
});
