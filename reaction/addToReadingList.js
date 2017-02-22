'use strict';
module.exports = function(o) {
  // Loop over all the reading lists that this message
  // should be added to, and add the rendered markdown
  for(let list of o.readingLists) {
    list.markdown.push(...o.markdown);
  }

  return Promise.resolve(o);
}
