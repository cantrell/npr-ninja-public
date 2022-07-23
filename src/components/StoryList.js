import React, { Component } from 'react';
import StoryContainer from '../containers/StoryContainer';
import StoryTypeToggleContainer from '../containers/StoryTypeToggleContainer';
import RandomEmoji from '../components/RandomEmoji';
import Pagination from '../components/Pagination';
import { VIEW_MODES,
         STORIES_RECEIVED } from '../actions';
import '../css/StoryList.css';

class StoryList extends Component {

  componentDidMount() {
    this.props.onLoad();
  }

  componentDidUpdate(prevProps, prevState) {
    // We only want to scroll to the top if the page changed, or a search was conducted.
    // We scroll the body for mobile and StoryList for desktop.
    if (this.props.lastAction === STORIES_RECEIVED) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      document.getElementById('StoryList').scrollTop = 0;
    }
  }

  wrapStoryList(content) {
    return (
      <div id="StoryList">
        <StoryTypeToggleContainer />
        {content}
      </div>
    )
  }

  render() {

    const viewMode = this.props.storyList.viewMode;
    const feedStories = this.props.storyList.feedStories;
    const savedStories = this.props.storyList.savedStories;
    const searchStories = this.props.storyList.searchStories;
    const searchTerm = this.props.storyList.searchTerm;
    const selectedTopics = this.props.topicList.selectedTopics;
    const networkActivity = this.props.networkActivity;
    const onPage = this.props.onPage;

    // There are a few reasons why we might not have any stories. Explore them first...

    // If we're in feed mode, and the user hasn't selected any topics, there can't be any stories.
    if (viewMode === VIEW_MODES.FEED && selectedTopics.length === 0) {
      return (
        this.wrapStoryList(
          <div id="empty-message">
            <RandomEmoji emojis={[{key:'wave', caption:'Welcome to npr.ninja!'}, {key:'point', caption:'To get started, pick some topics.', id:'empty-message-pointer'}]} />
          </div>
        )
      )
    }

    // The user hasn't saved any stories yet.
    if (viewMode === VIEW_MODES.SAVED && savedStories.length === 0) {
      return (
        this.wrapStoryList(
          <div id="empty-message">
            <RandomEmoji emojis={[{key:'nope', caption:'You haven\'t saved any stories yet.'}]} />
          </div>
        )
      )
    }

    // Search mode and no stories? The search returned no results.
    if (viewMode === VIEW_MODES.SEARCH && searchStories.length === 0) {
      return (
        this.wrapStoryList(
          <div id="empty-message">
            <RandomEmoji emojis={[{key:'shrug', caption:`Your search for "${searchTerm}" returned no results.`}]} />
          </div>
        )
      )
    }

    // Everything looks legit, but there still aren't any stories.
    // Strange, but technically possible, I suppose.
    if (viewMode === VIEW_MODES.FEED && feedStories.length === 0 && networkActivity === 0) {
      return (
        this.wrapStoryList(
          <div id="empty-message">
            <RandomEmoji emojis={[{key:'shrug', caption:'No stories found.'}]} />
          </div>
        )
      )
    }

    // Distinguish between feed, saved, and search stories.
    let storyList;
    switch (viewMode) {
      case VIEW_MODES.FEED:
        storyList = feedStories;
        break;
      case VIEW_MODES.SAVED:
        storyList = savedStories;
        break;
      case VIEW_MODES.SEARCH:
        storyList = searchStories;
        break;
      default:
        storyList = [];
    }

    const stories = storyList.map((story, i, a) =>
      <div key={story.id}>
        <StoryContainer story={story} />
        {i !== (a.length - 1) &&
          <hr className="story-divider" />
        }
      </div>
    );

    return (
      this.wrapStoryList(
        <div id="story-list-wrapper">
          {viewMode === VIEW_MODES.SEARCH &&
            <div id="search-term-label">Search results for: {searchTerm}</div>
          }
          {stories}
          <Pagination storyList={this.props.storyList} onPage={onPage} />
        </div>
      )
    )
  }
}

export default StoryList;
