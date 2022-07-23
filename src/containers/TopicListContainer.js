import { connect } from 'react-redux';
import TopicList from '../components/TopicList';
import { toggleTopic,
         requestTopics,
         requestStories } from '../actions';

const mapStateToProps = (state) => {
  return {
    topics: state.topicList.topics,
    selectedTopics: state.topicList.selectedTopics
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTopicClick: id => {
      dispatch(toggleTopic(id));
      dispatch(requestStories(1));
    },
    onLoad: () => {
      dispatch(requestTopics());
    }
  }
}

const TopicListContainer = connect(mapStateToProps, mapDispatchToProps)(TopicList);

export default TopicListContainer;
