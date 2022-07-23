import { connect } from 'react-redux';
import StoryTypeToggle from '../components/StoryTypeToggle';
import { showStoryFeed,
         showSavedStories } from '../actions';

const mapStateToProps = (state) => {
  return {viewMode: state.storyList.viewMode,
          savedStories: state.storyList.savedStories};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFeed:() => {
      dispatch(showStoryFeed());
    },
    onSaved:() => {
      dispatch(showSavedStories());
    }
  }
}

const StoryTypeToggleContainer = connect(mapStateToProps, mapDispatchToProps)(StoryTypeToggle);

export default StoryTypeToggleContainer;
