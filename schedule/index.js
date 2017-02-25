process.env.TIMEZONE = process.env.TIMEZONE || 'America/New_York';
process.env.REPORT_TIME = process.env.REPORT_TIME || '4:00 pm';

const moment = require('moment-timezone');

function getBitsFromMoment(momentTime = moment()) {
  return JSON.parse(`[${moment.utc(momentTime).format('H,m,s')}]`);
}

function getLocalTime() {
  return moment.tz(process.env.REPORT_TIME, 'h:mm a', process.env.TIMEZONE);
}

function getTimeUntilNextPostCheck() {
  const [targetHour, targetMinute] = getBitsFromMoment(getLocalTime());
  const [nowHour, nowMinute, nowSecond] = getBitsFromMoment();

  const targetTime = ((targetHour * 60 * 60) + (targetMinute * 60)) * 1000;
  const nowTime = ((nowHour * 60 * 60) + (nowMinute * 60) + nowSecond) * 1000;

  const oneDayTime = 24 * 60 * 60 * 1000;

  let delay = targetTime - nowTime;
  if (delay < 0) {
    delay = oneDayTime + delay;
  }

  if (delay < 1000) {
    delay = oneDayTime;
  }

  return delay;
}

function getDayOfWeek() {
  return Number(moment.tz(process.env.TIMEZONE).format('d'));
}

function isWeekday() {
  const dow = getDayOfWeek();
  return (dow > 0 && dow < 6);
}

module.exports = function scheduler(callback) {
  const timeoutHandler = () => {
    if (isWeekday) {
      callback(getDayOfWeek());
    }
    setTimeout(timeoutHandler, getTimeUntilNextPostCheck());
  };
  setTimeout(timeoutHandler, getTimeUntilNextPostCheck());
};
