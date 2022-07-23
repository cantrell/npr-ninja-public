import React, { Component } from 'react';
import ModalContainer from '../containers/ModalContainer';
import LoadingSignalContainer from '../containers/LoadingSignalContainer';
import Header from '../components/Header';
import TopicListContainer from '../containers/TopicListContainer';
import StoryListContainer from '../containers/StoryListContainer';
import FooterContainer from '../containers/FooterContainer';
import { toggleTopicList } from '../utils/toggleTopicList';
import '../css/App.css';

class App extends Component {

  componentDidMount() {
    this.props.onLoad({firstRunShowModal:this.props.firstRunShowModal});
    document.getElementById('click-catcher').addEventListener('touchmove', (e) => {
      e.preventDefault();
    })
  }

  render() {
    return (
      <div id="App">
        <ModalContainer />
        <LoadingSignalContainer />
        <div id="click-catcher" onClick={() => toggleTopicList()} />
        <Header />
        <div id="TopicStoryLayout">
          <TopicListContainer />
          <StoryListContainer />
        </div>
        <FooterContainer />
      </div>
    );
  }
}

export default App;
