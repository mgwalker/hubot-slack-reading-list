require('dotenv').config();

const app = require('./app');
const brain = require('./brain');
const commands = require('./commands');
const reaction = require('./reaction');
const schedule = require('./schedule');
const postLists = require('./post');

module.exports = robot => app(brain, commands, reaction, schedule, postLists, robot);
