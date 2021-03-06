'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');

const mustache = require('mustache');

const templatePath = path.join(__dirname, '..', 'readingListEntry.template.md');
const template = require('fs').readFileSync(templatePath, { encoding: 'utf8' });

function getChannelName(o, channel) {
  return o.robot.adapter.client.rtm.dataStore.getChannelGroupOrDMById(channel).name;
}

function hasOpenGraphImage(og) {
  return (og.ogImage && og.ogImage.url);
}

function hasTwitterCardImage(og) {
  return (og.twitterImage && og.twitterImage.url);
}

function urlStartsWithRelativeProtocol(url) {
  // A URL starts with a relative protocol if the protocol
  // is omitted, so the string starts with //.
  return (url && url.startsWith('//'));
}

function urlIsRelativeToHost(url) {
  // A URL is relative to the host if it begins with
  // a single slash and then a path.
  return (url && /^\/[^\/]/.test(url));
}

function getImageUrl(og) {
  let imageUrl = null;

  if (hasOpenGraphImage(og)) {
    imageUrl = og.ogImage.url;
  } else if(hasTwitterCardImage(og)) {
    imageUrl = og.twitterImage.url;
  }

  if (urlStartsWithRelativeProtocol(imageUrl)) {
    imageUrl = `https:${imageUrl}`;
  } else if(urlIsRelativeToHost(imageUrl)) {
    const urlInfo = url.parse(og.ogUrl);
    imageUrl = `${urlInfo.protocol}//${urlInfo.hostname}${imageUrl}`;
  }

  return imageUrl;
}

module.exports = function(o) {
  const message = o.response.message;

  o.markdown = [ ];

  for(let og of o.openGraph) {
    const markdownModel = {
      title: og.ogTitle || og.twitterTitle,
      user: message.user.real_name || message.user.name,
      channel: getChannelName(o, message.room),
      url: og.ogUrl,
      description: og.ogDescription || og.twitterDescription,
      imageUrl: getImageUrl(og)
    };

    const markdown = mustache.render(template, markdownModel);
    o.markdown.push(markdown);
  }

  return Promise.resolve(o);
};
