module.exports = {
  setup(robot) {
    robot.respond(/((daily|weekly)\s+)?reading list( :(.+):)? (.+)/i, msg => {
      let [ , , dailyOrWeekly, emojiSpecified, emoji, listName ] = msg.match;
      if (!dailyOrWeekly) {
        dailyOrWeekly = 'weekly';
      }
      if (!emojiSpecified) {
        emoji = 'book';
      }

      if (robot.brain.readingLists.some(list => list.name === listName)) {
        // Update an existing reading list
        module.exports.addChannelToReadingList(dailyOrWeekly, listName, emoji, msg.envelope.room, robot);
      } else {
        // Create a new reading list
        module.exports.createReadingList(dailyOrWeekly, listName, emoji, msg.envelope.room, robot);
      }
    });

    // Just need to schedule the reading list.  :)

    robot.respond(/gimme (.+)/i, msg => {
      const listName = msg.match[1];
      const list = robot.brain.readingLists.filter(list => list.channels.indexOf(msg.envelope.room) >= 0);
      if (list.length > 0) {
        const md = list[0].markdown.join('\n-----\n');

        robot.adapter.client.web.files.upload(`${list[0].name}.md`, {
          title: list[0].name,
          filetype: 'post',
          content: md,
          channels: msg.envelope.room
        });
      }
    });
  },

  createReadingList(dailyOrWeekly, listName, emoji, channel, robot) {
    robot.brain.readingLists.push({
      channels: [ channel ],
      frequency: dailyOrWeekly,
      name: listName,
      emoji,
      markdown: []
    });

    robot.messageRoom(channel, `Okay, I created the "${listName}" reading list! Add the :${emoji}: reaction to a message to add it to the reading list.`)
  },

  addChannelToReadingList(dailyOrWeekly, listName, _, channel, robot) {
    const storedListIndex = robot.brain.readingLists.findIndex(list => list.name === listName);
    let storedList = robot.brain.readingLists[storedListIndex];
    const channelIndex = storedList.channels.indexOf(channel);

    if (channelIndex < 0) {
      storedList.channels.push(channel);
    }
    robot.brain.readingLists[storedListIndex] = storedList;

    robot.messageRoom(channel, `Okay, I added <#${channel}> to the "${listName}" reading list! Add the :${storedList.emoji}: reaction to a message to add it to the reading list.`)
  }
};
