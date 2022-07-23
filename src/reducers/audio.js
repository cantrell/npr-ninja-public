import { PLAY_AUDIO,
         PAUSE_AUDIO } from '../actions';

const audio = (state = {url:null, storyId:null, isPlaying:false}, action) => {
  switch (action.type) {
    case PLAY_AUDIO:
      return {...state, url:action.url, storyId:action.storyId, isPlaying:true};
    case PAUSE_AUDIO:
    return {...state, isPlaying:false};
    default:
      return state;
  }
}

export default audio;
