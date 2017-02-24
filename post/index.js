const brain = require('../brain');

function isFriday(dayOfWeek) {
  return (dayOfWeek === 5);
}

module.exports = function getFunctionThatPosts(robot) {
  const postReadingList = (list) => {
    const md = list.markdown.join('\n-----\n');

    robot.adapter.client.web.files.upload(`${list.name}.md`, {
      title: list.name,
      filetype: 'post',
      content: md,
      channels: list.channels[0]
    });
  };

  return (dayOfWeek) => {
    let readingLists = brain.getReadingLists();

    if (!isFriday(dayOfWeek)) {
      // If it's not Friday, only post the daily
      // reading lists.
      readingLists = readingLists.filter(list => list.frequency === 'daily');
    }

    for (const list of readingLists) {
      postReadingList(list);
    }
  };
};
