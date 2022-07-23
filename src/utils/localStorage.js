import { appVersion,
         obsoleteTopics } from '../config';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) return undefined;
    const stateJSON = JSON.parse(serializedState);
    // If the versions don't match, blow away the local storage data.
    if (stateJSON.appVersion !== appVersion) {
      localStorage.clear();
      return undefined;
    }
    // If the user has topics selected that have since become obsolete, remove them.
    stateJSON.topicList.selectedTopics = stateJSON.topicList.selectedTopics.filter(e => {
      return !obsoleteTopics.includes(parseInt(e, 10));
    })
    return stateJSON;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err);
  }
};
