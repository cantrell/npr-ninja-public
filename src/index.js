import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import AppContainer from './containers/AppContainer';
import { loadState, saveState } from './utils/localStorage';
import { appVersion } from './config';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';

const middleware = [thunk];
const savedState = loadState();
// Not actually part of the app state, so delete.
if (savedState) delete savedState.appVersion;
const store = createStore(reducer, savedState, applyMiddleware(...middleware));

// Only save selectedTopics.
store.subscribe(() => {
  saveState({
    appVersion: appVersion,
    topicList: {
      topics: [],
      selectedTopics: store.getState().topicList.selectedTopics
    },
    storyList: {
      viewMode: null,
      feedStories: [],
      savedStories: store.getState().storyList.savedStories,
      searchStories: [],
      pageNumber: 1,
      searchTerm: null,
      lastUpdated: null,
      refreshable: null,
      serverMessage: null
    },
    modal: {
      key: null,
      firstRunShow: store.getState().modal.firstRunShow
    }
  });
});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
