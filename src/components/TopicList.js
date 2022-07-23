import React, { Component } from 'react';
import Topic from '../components/Topic';
import { toggleTopicList } from '../utils/toggleTopicList';
import '../css/TopicList.css';

class TopicList extends Component {

  componentDidMount() {
    this.props.onLoad();
  }

  // Since the width of the TopicList component is dynamic (auto), we have to
  // use JS to set its left property to an off-screen value in case we're on a
  // mobile device. (If not on mobile, this property is ignored.)
  componentDidUpdate() {
    const topicList = document.getElementById('TopicList');
    topicList.style.left = (topicList.offsetWidth * -2) + 'px';
    const topicListCloseButton = document.getElementById('topic-list-close-button');
    topicListCloseButton.style.width = `${topicList.offsetWidth - 18}px`;
    topicListCloseButton.style.left = (topicList.offsetWidth * -2) + 'px';
  }

  render() {
    const topics = this.props.topics.map((topic) =>
      <li key={topic.id}>
        <Topic topic={topic}
               checked={(this.props.selectedTopics.includes(topic.id))}
               onTopicClick={this.props.onTopicClick} />
      </li>
    );

    return (
      <nav id="TopicList">
        <div id="topic-list-close-button" onClick={() => toggleTopicList()}/>
        <ul>{topics}</ul>
      </nav>
    )
  }
}

export default TopicList;
