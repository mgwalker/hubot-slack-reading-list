module.exports = function(o) {
  return new Promise((resolve, reject) => {
    o.robot.adapter.client.web.channels.history(o.response.message.item.channel, {
      latest: o.response.message.item.ts,
      oldest: o.response.message.item.ts,
      inclusive: 1
    }, (err, apiResponse) => {
      if(!err && apiResponse.ok && apiResponse.messages.length > 0) {
        const message = apiResponse.messages[0].text;
        o.urls = message.match(/https?:\/\/[^>]+/g) || [ ];
        resolve(o);
      } else {
        reject();
      }
    });
  });
};
