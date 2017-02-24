
module.exports = function addToReadingList(o) {
  // Loop over all the reading lists that this message
  // should be added to, and add the rendered markdown
  for (const list of o.readingLists) {
    list.markdown.push(...o.markdown);
  }

  return Promise.resolve(o);
};
