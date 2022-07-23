import { getTopics,
         getStoriesByTopics,
         getStoriesBySearchTerm } from '../utils/npr';

export const VIEW_MODES = {
  FEED: 'FEED',
  SEARCH: 'SEARCH',
  SAVED: 'SAVED'
};

export const REQUEST_TOPICS        = 'REQUEST_TOPICS';
export const TOPICS_RECEIVED       = 'TOPICS_RECEIVED';
export const TOGGLE_TOPIC          = 'TOGGLE_TOPIC';
export const REQUEST_STORIES       = 'REQUEST_STORIES';
export const SEARCH_STORIES        = 'SEARCH_STORIES';
export const SHOW_SAVED_STORIES    = 'SHOW_SAVED_STORIES';
export const SHOW_STORY_FEED       = 'SHOW_STORY_FEED';
export const STORIES_RECEIVED      = 'STORIES_RECEIVED';
export const EMPTY_ALL_STORIES     = 'EMPTY_ALL_STORIES';
export const NETWORK_ACTIVITY      = 'NETWORK_ACTIVITY';
export const PLAY_AUDIO            = 'PLAY_AUDIO';
export const PAUSE_AUDIO            = 'STOP_AUDIO';
export const SAVE_STORY            = 'SAVE_STORY';
export const DELETE_SAVED_STORY    = 'DELETE_SAVED_STORY';
export const SHOW_MODAL            = 'SHOW_MODAL';
export const HIDE_MODAL            = 'HIDE_MODAL';
export const CLOSE_FIRST_RUN_MODAL = 'CLOSE_FIRST_RUN_MODAL';

export const requestTopics = () => (
  (dispatch, getStore) => {
    dispatch(networkActivity(true));
    getTopics((topics) => {
      dispatch(topicsReceived(topics));
      dispatch(networkActivity(false));
    });
  }
)

export const topicsReceived = (topics) => ({
  type: TOPICS_RECEIVED,
  topics: topics
})

export const toggleTopic = (id) => ({
  type: TOGGLE_TOPIC,
  id
})

export const requestStories = (pageNumber) => (
  (dispatch, getStore) => {
    if (getStore().topicList.selectedTopics.length === 0) {
      dispatch(emptyAllStories());
      return;
    }
    dispatch(networkActivity(true));
    getStoriesByTopics(getStore().topicList.selectedTopics, pageNumber, (storyResponse) => {
      dispatch(storiesReceived(storyResponse, {viewMode: VIEW_MODES.FEED,
                                               pageNumber,
                                               lastUpdated: new Date()}));
      dispatch(networkActivity(false));
    });
  }
)

export const searchStories = (searchTerm, pageNumber) => (
  (dispatch, getStore) => {
    dispatch(networkActivity(true));
    getStoriesBySearchTerm(searchTerm, pageNumber, (storyResponse) => {
      dispatch(storiesReceived(storyResponse, {viewMode: VIEW_MODES.SEARCH,
                                               pageNumber,
                                               searchTerm,
                                               lastUpdated: new Date()}));
      dispatch(networkActivity(false));
    });
  }
)

export const showSavedStories = () => ({
  type: SHOW_SAVED_STORIES,
  viewMode: VIEW_MODES.SAVED
})

export const showStoryFeed = () => ({
  type: SHOW_STORY_FEED,
  viewMode: VIEW_MODES.FEED
})

export const storiesReceived = (storyResponse, args) => ({
  type: STORIES_RECEIVED,
  stories: storyResponse.stories,
  shouldPage: storyResponse.shouldPage,
  serverMessage: storyResponse.serverMessage,
  ...args
})

export const emptyAllStories = () => ({
  type: EMPTY_ALL_STORIES
})

export const networkActivity = (activity) => ({
  type: NETWORK_ACTIVITY,
  activity
})

export const playAudio = (url, storyId) => ({
  type: PLAY_AUDIO,
  url,
  storyId,
  isPlaying: true
})

export const pauseAudio = () => ({
  type: PAUSE_AUDIO,
  isPlaying: false
})

export const saveStory = (story) => ({
  type: SAVE_STORY,
  story
})

export const deleteSavedStory = (story) => ({
  type: DELETE_SAVED_STORY,
  story
})

export const showModal = (modalKey) => ({
  type: SHOW_MODAL,
  modalKey
})

export const hideModal = (modalKey) => ({
  type: HIDE_MODAL,
  modalKey
})

export const closeFirstRunModal = (modalKey) => ({
  type: CLOSE_FIRST_RUN_MODAL,
  modalKey
})
