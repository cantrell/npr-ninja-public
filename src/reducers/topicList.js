import { TOPICS_RECEIVED,
         TOGGLE_TOPIC } from '../actions';

const topicList = (state = {topics:[], selectedTopics:[]}, action) => {
  switch (action.type) {
    case TOPICS_RECEIVED:
      return {...state, topics:action.topics};
    case TOGGLE_TOPIC:
      if (!state.selectedTopics.includes(action.id)) { // Add
        return {...state, selectedTopics:[...state.selectedTopics, action.id]};
      } else {
        const reducedTopics = state.selectedTopics.filter((i) => { // Remove
          return (i !== action.id);
        });
        return {...state, selectedTopics:reducedTopics};
      }
    default:
      return state
  }
}

export default topicList;
