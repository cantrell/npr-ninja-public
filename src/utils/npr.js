import sampleTopics from '../data/topics.json';
import sampleStories from '../data/stories.json';
import sampleSearch from '../data/search.json';
import { apiKey,
         nprApiUrl,
         allTopicsId,
         obsoleteTopics,
         resultsPerPage} from '../config';

const getTopicsURL = () => {
  let url = `/list?id=${allTopicsId}`;
  return addURLExtras(url);
}

// Note that we get one additional result to see if we need to page.
const getStoriesURL = (topics, pageNumber) => {
  const url = `/query?startNum=${getStartNum(pageNumber)}&numResults=${resultsPerPage+1}&action=or&sort=dateDesc&id=${topics.join()}`;
  return addURLExtras(url);
}

// Note that we get one additional result to see if we need to page.
const getSearchURL = (searchTerm, pageNumber) => {
  const url = `/query?startNum=${getStartNum(pageNumber)}&numResults=${resultsPerPage+1}&sort=dateDesc&searchType=mainText&searchTerm=${encodeURIComponent(searchTerm)}`;
  return addURLExtras(url);
}

const getStartNum = (pageNumber) => {
  return ((pageNumber - 1) * resultsPerPage) + 1;
}

// Remove obsolete topics.
const modernizeTopics = (topics) => {
  let currentTopics = topics.filter((t) => {
    return !obsoleteTopics.includes(parseInt(t.id, 10));
  });
  return currentTopics;
}

const addURLExtras = (url) => {
  return (`${window.location.protocol}//${nprApiUrl}${url}&apiKey=${apiKey}&output=json`);
}

const loadJSON = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', (e) => {
    callback(JSON.parse(xhr.responseText));
  });
  xhr.open('GET', url);
  xhr.send();
}

const cleanUpStories = (storyJSON) => {
  const stories = storyJSON.list.story.map((s) => {
    const story = {id:s.id};
    let title = s.title.$text;
    if (s.subtitle['$text']) title += ': ' + s.subtitle.$text;
    story.title = title;
    s.link.forEach((element) => {
      switch (element.type) {
        case 'html':
          story.link = element.$text; break;
        case 'short':
          story.shortLink = element.$text; break;
        default:
          break;
      }
    });
    story.show = (s['show']) ? s.show[0].program.$text : 'NPR';
    story.primaryTopic = s.parent[0].title.$text;
    story.byline = (s['byline']) ? s.byline[0].name.$text : 'Staff';
    story.date = parseDate(s.pubDate.$text);
    story.teaser = s.teaser.$text;
    story.pullQuote = (s.pullQuote) ? {quote:s.pullQuote[0].text.$text, author:s.pullQuote[0].person.$text} : false;
    story.articleHtml = false;
    if (s.textWithHtml && s.textWithHtml.paragraph && s.textWithHtml.paragraph.length > 1) {
      story.articleHtml = '';
      s.textWithHtml.paragraph.forEach((p) => {
        story.articleHtml += ('<p>'+p.$text+'</p>');
      });
    }
    // Look for the primary image.
    if (s.image) {
      story.image = s.image.find((img) => {
        return img.type === 'primary';
      });
    }
    // Sometimes there's no primary image. If that's the case, use the biggest thumbnail.
    if (!story.image && s.thumbnail) {
      const thumbnailSizes = {large:90, medium:75, small:60};
      Object.keys(thumbnailSizes).some((size) => {
        if (s.thumbnail[size]) {
          story.image = {src:s.thumbnail[size].$text, width:thumbnailSizes[size]};
          return true;
        }
        return false;
      });
    }

    // Derive the mp3 URL from the mp4 URL.
    story.audio = (s.audio && s.audio[0].format && s.audio[0].format.mp4) ? s.audio[0].format.mp4.$text : false;
    if (story.audio) {
      story.audio = story.audio.substring(0, story.audio.indexOf('?'));
      story.audio = story.audio.replace(/mp4/gi, 'mp3');
      story.audio = story.audio.replace('/npr-mp3/', '/anon.npr-mp3/');
      story.audioDuration = (s.audio[0].duration) ? formatDuration(s.audio[0].duration.$text) : '';
    }
    story.saved = false;
    return story;
  });
  return stories;
};

const parseDate = (dateString) => {
  const d = new Date(dateString);
  return {isoString: d.toISOString(),
          formatted:`${String(d.getMonth() + 1)}/${String(d.getDate())}/${String(d.getFullYear())}`,
          timestamp:d.getTime()};
};

const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  if (secs < 10) {
    secs = `0${secs}`;
  }
  return `${mins}:${secs}`;
};

const getResponse = (storiesJSON) => {
  const stories = (storiesJSON.list.story) ? cleanUpStories(storiesJSON) : [];
  let msg = null;
  if (storiesJSON.message) {
    msg = storiesJSON.message[0].text.$text;
  }
  // Figure out whether paging is required, then get rid of the extra result.
  const shouldPage = (stories.length > resultsPerPage);
  if (shouldPage) stories.pop();
  // I have to sort manually because stories are grouped/sorted by topic.
  // It's important to sort after throwing the last story away. Otherwise, you
  // might throw a story away that you're not going to get on the next page.
  stories.sort((a, b) => {
      return b.date.timestamp - a.date.timestamp;
  })
  return {
    stories: stories,
    shouldPage: shouldPage,
    serverMessage: msg
  }
}

export const getTopics = (callback) => {
  if (!apiKey) {
    callback(modernizeTopics(sampleTopics.item));
    return;
  }
  let topicsURL = getTopicsURL();
  loadJSON(topicsURL, (topicsJSON) => {
    callback(modernizeTopics(topicsJSON.item));
  });
};

export const getStoriesByTopics = (topics, pageNumber, callback) => {
  if (!apiKey) {
    callback(getResponse(sampleStories));
    return;
  }
  let storiesURL = getStoriesURL(topics, pageNumber);
  loadJSON(storiesURL, (storiesJSON) => {
    callback(getResponse(storiesJSON));
  });
};

export const getStoriesBySearchTerm = (searchTerm, pageNumber, callback) => {
  if (!apiKey) {
    callback(getResponse(sampleSearch));
    return;
  }
  let storiesURL = getSearchURL(searchTerm, pageNumber);
  loadJSON(storiesURL, (storiesJSON) => {
    callback(getResponse(storiesJSON));
  });
};
