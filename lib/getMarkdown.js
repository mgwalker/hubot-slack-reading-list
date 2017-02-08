'use strict';

module.exports = function(o) {
  o.readingList = [ ];
  for(let og of o.openGraph) {
    let markdown = '## ' + (og.ogTitle || og.twitterTitle) + '\n';
    markdown += '> Posted by ' + o.response.message.user.real_name + ' in ';
    markdown += o.robot.adapter.client.rtm.dataStore.getChannelGroupOrDMById(o.response.message.room).name + '\n';
    markdown += og.ogUrl + '\n';
    markdown += (og.ogDescription || og.twitterDescription) + '\n';

    let imageUrl = '';

    if(og.ogImage && og.ogImage.url) {
      imageUrl = og.ogImage.url;
    } else if(og.twitterImage && og.twitterImage.url) {
      imageUrl = og.twitterImage.url;
    }
    if(imageUrl.startsWith('//')) {
      imageUrl = `https:${imageUrl}`;
    }
    markdown += '![' + imageUrl + '](' + imageUrl + ')';

    o.readingList.push(markdown);
  }

  return Promise.resolve(o);
};
