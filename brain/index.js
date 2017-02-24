

const READING_LIST_KEY = 'readingLists';

let ROBOT = {
  brain: {
    get() { return []; },
    set() { }
  },
  messageRoom() { }
};

function getReadingLists() {
  return ROBOT.brain.get(READING_LIST_KEY) || [];
}

function saveReadingLists(lists) {
  ROBOT.brain.set(READING_LIST_KEY, lists);
  ROBOT.brain.save();
}

function readingListExists(listName) {
  return getReadingLists().some(list => list.name.toLowerCase() === listName.toLowerCase());
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

function getReadingListInfo(listName, channel) {
  const list = getReadingList(listName);
  if (list) {
    ROBOT.messageRoom(channel, `The "${listName}" reading list is using :${list.emoji}: to tag posts, is listening in ${list.channels.map(c => `<#${c}>`).join(', ')}, and posts ${list.frequency} to <#${list.channels[0]}>`);
  } else {
    ROBOT.messageRoom(channel, `:thinking_face: I don't know of a "${listName}" reading list`);
  }
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
      saveReadingLists(lists);
      ROBOT.messageRoom(channel, `Okay, I've removed this channel from the "${listName}" reading list`);

      if (lists[listIndex].channels.length === 0) {
        lists.splice(listIndex, 1);
        saveReadingLists(lists);
        ROBOT.messageRoom(channel, `The "${listName}" reading list is now empty and will be deleted :wave:"`);
      }
    } else {
      ROBOT.messageRoom(channel, `Okay, this channel is not in the "${listName}" reading list`);
    }
  } else {
    ROBOT.messageRoom(channel, `Okay, but the "${listName}" reading list doesn't exist :smile:`);
  }
}

function saveReadingList(list) {
  const lists = getReadingLists();
  if (readingListExists(list.name)) {
    const listIndex = getReadingListIndex(list.name);
    const existingList = lists[listIndex];

    if (!listHasChannel(existingList, list.channels[0])) {
      existingList.channels.push(list.channels[0]);
    }

    lists[listIndex] = existingList;
    ROBOT.messageRoom(list.channels[0], `Okay, I added this channel to the "${list.name}" reading list! Add the :${existingList.emoji}: reaction to a message to add it to the reading list.`);
  } else {
    lists.push(list);
    ROBOT.messageRoom(list.channels[0], `Okay, I created the "${list.name}" reading list! Add the :${list.emoji}: reaction to a message to add it to the reading list.`);
  }
  saveReadingLists(lists);
}

module.exports = {
  setRobot(robot) {
    ROBOT = robot;
  },

  getReadingLists,
  readingListExists,
  saveReadingList,
  getReadingListsForChannel,
  getReadingListsForChannelAndEmoji,
  getReadingListInfo,
  removeChannelFromList
};
