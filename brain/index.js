'use strict';
let _robot;

function getReadingLists() {
  if (_robot) {
    return _robot.brain.get('readingLists') || [ ];
  }
  return [ ];
}

function readingListExists(listName) {
  if (_robot) {
    return getReadingLists().some(list => list.name.toLowerCase() === listName.toLowerCase())
  }
  return false;
}

function getReadingListIndex(listName) {
  if (_robot) {
    if (readingListExists(listName)) {
      return getReadingLists().findIndex(list => list.name.toLowerCase() === listName.toLowerCase());
    }
  }
  return false;
}

function getReadingList(listName) {
  if (_robot) {
    if (readingListExists(listName)) {
      return getReadingLists()[getReadingListIndex(listName)];
    }
  }
  return false;
}

function getReadingListsForChannel(channel) {
  if (_robot) {
    return getReadingLists().filter(list => list.channels.indexOf(channel) >= 0);
  }
  return [ ];
}

function getReadingListsForChannelAndEmoji(channel, emoji) {
  if (_robot) {
    return getReadingListsForChannel(channel).filter(list => list.emoji.toLowerCase() === emoji.toLowerCase());
  }
  return [ ];
}

function listHasChannel(list, channel) {
  return (list.channels.indexOf(channel) < 0);
}

function saveReadingList(list) {
  if (_robot) {
    const lists = getReadingLists();
    if (readingListExists(list.name)) {
      const listIndex = getReadingListIndex(list.name);
      const existingList = lists[listIndex];

      if (!listHasChannel(existingList, list.channels[0])) {
        existingList.channels.push(list.channels[0]);
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
}

module.exports = {
  setRobot(robot) {
    _robot = robot;
  },

  getReadingLists,
  readingListExists,
  saveReadingList,
  getReadingListsForChannel,
  getReadingListsForChannelAndEmoji
};
