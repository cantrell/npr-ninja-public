import {
  VIEW_MODES,
  STORIES_RECEIVED,
  SAVE_STORY,
  DELETE_SAVED_STORY,
  SHOW_SAVED_STORIES,
  SHOW_STORY_FEED,
  EMPTY_ALL_STORIES
} from '../actions';

const storyList = (state = {viewMode: null,
                            feedStories: [],
                            savedStories: [],
                            searchStories: [],
                            pageNumber: 1,
                            searchTerm: null,
                            lastUpdated: null,
                            refreshable: false,
                            serverMessage: null}, action) => {
  switch (action.type) {
    case STORIES_RECEIVED:
      // Marked saved stories as such.
      action.stories.forEach(story => {
        story.saved = (
          state.savedStories.find(savedStory => {
            return story.id === savedStory.id;
          })
        ) ? true : false;
      });
      let newState = {...state,
                      viewMode: action.viewMode,
                      pageNumber: action.pageNumber,
                      shouldPage: action.shouldPage,
                      searchTerm: action.searchTerm,
                      lastUpdated: action.lastUpdated,
                      serverMessage: action.serverMessage};
      newState.refreshable = (action.stories.length > 0);
      newState[(action.viewMode === VIEW_MODES.FEED) ? 'feedStories' : 'searchStories'] = action.stories;
      return newState;
    case SAVE_STORY:
      action.story.saved = true;
      // If the story happens to be in the current story feed, also mark it saved.
      const feedStory = state.feedStories.find(e => (e.id === action.story.id));
      if (feedStory) feedStory.saved = true;
      return {...state,
              savedStories: [...state.savedStories, {...action.story}]};
    case DELETE_SAVED_STORY:
      // Mark the story as no longer saved.
      state.feedStories.forEach((story) => {
        if (story.id === action.story.id) {
          story.saved = false;
        }
      });
      action.story.saved = false;
      const reducedStories = state.savedStories.filter((i) => {
        return (i.id !== action.story.id);
      });
      return {...state, savedStories:reducedStories};
    case SHOW_STORY_FEED:
      return {...state,
              viewMode: action.viewMode,
              refreshable: (state.feedStories.length > 0)}
    case SHOW_SAVED_STORIES:
      return {...state, viewMode: action.viewMode, refreshable: false}
    case EMPTY_ALL_STORIES:
      return {
        ...state,
        viewMode: VIEW_MODES.FEED,
        feedStories: [],
        pageNumber: 1,
        shouldPage: false,
        lastUpdated: null,
        serverMessage: null,
        refreshable: false
      };
    default:
      return state
  }
}

export default storyList;
