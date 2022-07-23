import { connect } from 'react-redux';
import AudioPlayer from '../components/AudioPlayer';
import { playAudio,
         pauseAudio } from '../actions';


const mapStateToProps = (state) => {
  return {url: state.audio.url,
          storyId: state.audio.storyId,
          isPlaying: state.audio.isPlaying};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayAudio: (url, storyId) => {
      dispatch(playAudio(url, storyId));
    },
    onPauseAudio: () => {
      dispatch(pauseAudio());
    }
  }
}

const AudioPlayerContainer = connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);

export default AudioPlayerContainer;
