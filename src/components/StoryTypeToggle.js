import React, { Component } from 'react';
import { VIEW_MODES } from '../actions';
import '../css/StoryTypeToggle.css';

class StoryTypeToggle extends Component {

  getClassNames(buttonType) {
    let classNames = 'story-type-toggle';
    if (this.props.viewMode === buttonType) {
      classNames += ' story-type-toggle-selected';
    }
    return classNames;
  }

  render() {
    return (
      <div id="StoryTypeToggle">
        <div id="story-type-toggle-feed" className={this.getClassNames(VIEW_MODES.FEED)} onClick={(e) => this.props.onFeed()}>Story Feed</div>
        <div id="story-type-toggle-saved" className={this.getClassNames(VIEW_MODES.SAVED)} onClick={(e) => this.props.onSaved()}>Saved Stories ({this.props.savedStories.length})</div>
      </div>
    )
  }
}

export default StoryTypeToggle;
