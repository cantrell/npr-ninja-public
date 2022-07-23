import { connect } from 'react-redux';
import StoryList from '../components/StoryList';
import { VIEW_MODES,
         requestStories,
         searchStories } from '../actions';

const mapStateToProps = (state) => {
  return {
    storyList: state.storyList,
    topicList: state.topicList,
    lastAction: state.lastAction,
    networkActivity: state.networkActivity
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(requestStories(1));
    },
    onPage: (pageNumber, viewMode, searchTerm) => {
      if (viewMode === VIEW_MODES.FEED) {
        dispatch(requestStories(pageNumber));
      } else if (viewMode === VIEW_MODES.SEARCH) {
        dispatch(searchStories(searchTerm, pageNumber))
      }
    }
  }
}

const StoryListContainer = connect(mapStateToProps, mapDispatchToProps)(StoryList);

export default StoryListContainer;
