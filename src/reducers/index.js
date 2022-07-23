import { combineReducers } from 'redux';
import topicList from './topicList';
import storyList from './storyList';
import networkActivity from './networkActivity';
import audio from './audio';
import modal from './modal';
import lastAction from './lastAction';

/* The shape of our state.
{
  topicList: {
    topics: [],
    selectedTopics: []
  },
  storyList: {
    viewMode: null,
    feedStories: [],
    savedStories: [],
    searchStories: [],
    pageNumber: 1,
    shouldPage: false,
    searchTerm: null,
    lastUpdated: new Date(),
    refreshable: false,
    serverMessage: null
  },
  modal: {
    key: null,
    firstRunShow: true
  },
  audio: {
    url: null,
    storyId: null,
    isPlaying: false
  },
  networkActivity: 0,
  lastAction: null,
  appVersion: 1.0
}
*/

const rootReducer = combineReducers({
  topicList,
  storyList,
  networkActivity,
  audio,
  lastAction,
  modal
});

export default rootReducer;
