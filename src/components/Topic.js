import React, { Component } from 'react';

class Topic extends Component {

  render() {
    const topic = this.props.topic;
    return (
      <div>
        <input type="checkbox"
               id={topic.id}
               onClick={() => this.props.onTopicClick(topic.id)}
               defaultChecked={this.props.checked} />
        <label htmlFor={topic.id}>{topic.title.$text}</label>
      </div>
    )
   }
}

export default Topic;
