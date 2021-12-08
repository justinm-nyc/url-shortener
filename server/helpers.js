const URL = require("./models/urls");

/* 
Searches for a URL based on the full URL input.
Returns the url with the full and short url if found, otherwise returns null
*/
async function findURL(fullURLInput) {
  const url = await URL.findOne({ fullURL: fullURLInput }).exec();
  if (url) {
    return url;
  } else {
    return null;
  }
}

/* Adds a new URL to the database and returns the data */
async function addURL(fullURLInput) {
  return await URL.create({ fullURL: fullURLInput });
}

/* Returns full URL if one is found */
async function getFullURL(shortEndpoint) {
  const url = await URL.findOne({ shortURL: shortEndpoint }).exec();
  if (url) {
    return url.fullURL;
  }
}

module.exports = { addURL, findURL, getFullURL };
