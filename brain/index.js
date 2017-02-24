'use strict';
let _robot = {
  brain: {
    get() { return [] },
    set() { }
  },
  messageRoom() { }
};

function getReadingLists() {
  return _robot.brain.get('readingLists') || [ ];
}

function readingListExists(listName) {
  return getReadingLists().some(list => list.name.toLowerCase() === listName.toLowerCase())
}

function getReadingListIndex(listName) {
  if (readingListExists(listName)) {
    return getReadingLists().findIndex(list => list.name.toLowerCase() === listName.toLowerCase());
  }
  return false;
}

function getReadingList(listName) {
  if (readingListExists(listName)) {
    return getReadingLists()[getReadingListIndex(listName)];
  }
  return false;
}

function getReadingListsForChannel(channel) {
  return getReadingLists().filter(list => list.channels.indexOf(channel) >= 0);
}

function getReadingListsForChannelAndEmoji(channel, emoji) {
  return getReadingListsForChannel(channel).filter(list => list.emoji.toLowerCase() === emoji.toLowerCase());
}

function listHasChannel(list, channel) {
  return (list.channels.indexOf(channel) >= 0);
}

function removeChannelFromList(listName, channel) {
  const lists = getReadingLists();
  const listIndex = getReadingListIndex(listName);
  if (listIndex !== false) {
    const channelIndex = lists[listIndex].channels.indexOf(channel);
    if (channelIndex >= 0) {
      lists[listIndex].channels.splice(channelIndex, 1);
      _robot.brain.set('readingLists', lists);
      _robot.messageRoom(channel, `Okay, I've removed this channel from the "${listName}" reading list`);
    } else {
      _robot.messageRoom(channel, `Okay, this channel is not in the "${listName}" reading list`);
    }
  } else {
    _robot.messageRoom(channel, `Okay, but the "${listName}" reading list doesn't exist :smile:`)
  }
}

function saveReadingList(list) {
  const lists = getReadingLists();
  if (readingListExists(list.name)) {
    const listIndex = getReadingListIndex(list.name);
    const existingList = lists[listIndex];

    if (!listHasChannel(existingList, list.channels[0])) {
      existingList.channels.push(list.channels[0]);
    } else {
    }
    lists[listIndex] = existingList;
    _robot.messageRoom(list.channels[0], `Okay, I added this channel to the "${list.name}" reading list! Add the :${existingList.emoji}: reaction to a message to add it to the reading list.`)
  } else {
    lists.push(list);
    _robot.messageRoom(list.channels[0], `Okay, I created the "${list.name}" reading list! Add the :${list.emoji}: reaction to a message to add it to the reading list.`)
  }
  _robot.brain.set('readingLists', lists);
  _robot.brain.save();
}

module.exports = {
  setRobot(robot) {
    _robot = robot;
  },

  getReadingLists,
  readingListExists,
  saveReadingList,
  getReadingListsForChannel,
  getReadingListsForChannelAndEmoji,
  removeChannelFromList
};
