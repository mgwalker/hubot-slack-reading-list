let _robot;

function readingListExists(listName) {
  if (_robot) {
    return _robot.brain.readingLists.some(list => list.name === listName)
  }
  return false;
}

function getReadingListIndex(listName) {
  if (_robot) {
    if (readingListExists(listName)) {
      return _robot.brain.readingLists.findIndex(list => list.name === listName);
    }
  }
  return false;
}

function getReadingList(listName) {
  if (_robot) {
    if (readingListExists(listName)) {
      return _robot.brain.readingLists[getReadingListIndex(listName)];
    }
  }
  return false;
}

function getReadingListsForChannel(channel) {
  if (_robot) {
    return _robot.brain.readingLists.filter(list => list.channels.indexOf(channel) >= 0);
  }
  return [ ];
}

function getReadingListsForChannelAndEmoji(channel, emoji) {
  if (_robot) {
    return getReadingListsForChannel(channel).filter(list => list.emoji === emoji);
  }
  return [ ];
}

function listHasChannel(list, channel) {
  return (list.channels.indexOf(channel) < 0);
}

function saveReadingList(list) {
  if (_robot) {
    if (readingListExists(list.name)) {
      const listIndex = getReadingListIndex(list.name);
      const existingList = _robot.brain.readingLists[listIndex];

      if (!listHasChannel(existingList, list.channels[0])) {
        existingList.channels.push(list.channels[0]);
      }
      _robot.brain.readingLists[listIndex] = existingList;
      _robot.messageRoom(list.channels[0], `Okay, I added this channel to the "${list.name}" reading list! Add the :${existingList.emoji}: reaction to a message to add it to the reading list.`)
    } else {
      _robot.brain.readingLists.push(list);
      _robot.messageRoom(list.channels[0], `Okay, I created the "${list.name}" reading list! Add the :${list.emoji}: reaction to a message to add it to the reading list.`)
    }
  }
}

module.exports = {
  setRobot(robot) {
    _robot = robot;

    if(!_robot.brain.readingLists) {
      _robot.brain.readingLists = [ ];
    }
  },

  readingListExists,
  saveReadingList,
  getReadingListsForChannel,
  getReadingListsForChannelAndEmoji
};
