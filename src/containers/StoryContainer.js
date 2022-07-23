import { connect } from 'react-redux';
import Story from '../components/Story';
import { playAudio,
         pauseAudio,
         saveStory,
         deleteSavedStory } from '../actions';

const mapStateToProps = (state) => {
  return {
    audio: state.audio,
    storyList: state.storyList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayAudio: (url, storyId) => {
      dispatch(playAudio(url, storyId));
    },
    onPauseAudio: () => {
      dispatch(pauseAudio());
    },
    onSaveStory: (story) => {
      dispatch(saveStory(story));
    },
    onDeleteSavedStory: (story) => {
      dispatch(deleteSavedStory(story));
    }
  }
}

const StoryContainer = connect(mapStateToProps, mapDispatchToProps)(Story);

export default StoryContainer;
