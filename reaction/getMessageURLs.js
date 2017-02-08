function responseIsOkay(err, response) {
  return (!err && response && response.ok && response.messages && response.messages.length > 0);
}

function getSlackMessage(o, channel, timestamp) {
  return new Promise((resolve, reject) => {
    const options = {
      latest: timestamp,
      oldest: timestamp,
      inclusive: 1
    };

    o.robot.adapter.client.web.channels.history(channel, options, (err, response) => {
      if (responseIsOkay(err, response)) {
        resolve(response);
      } else {
        reject();
      }
    })
  });
}

module.exports = function(o) {
  return new Promise((resolve, reject) => {
    getSlackMessage(o, o.response.message.item.channel, o.response.message.item.ts)
      .then(response => {
        const message = response.messages[0].text;

        // Take advantage of the fact that Slack puts URLs inside
        // angle brackets to extract them with this regex.
        o.urls = message.match(/https?:\/\/[^>]+/g) || [ ];
        resolve(o);
      });
  });
};
