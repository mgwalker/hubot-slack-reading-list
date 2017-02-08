'use strict';

module.exports = function(o) {
  for(let list of o.readingLists) {
    list.markdown.push(...o.readingList);
  }

  return Promise.resolve(o);
}
