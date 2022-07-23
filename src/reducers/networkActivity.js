import { NETWORK_ACTIVITY } from '../actions';

const networkActivity = (state = 0, action) => {
  // This property is a bit like a queue.
  // It adds 1 for every network request (true), and subtracts 1 for every request that returns (false).
  // The loading indicator shows if there is 1 or more requests outstanding.
  if (action.type === NETWORK_ACTIVITY) {
    let newState = state + ((action.activity) ? 1 : -1);
    if (newState < 0) newState = 0;
    return newState;
  }
  return state;
}

export default networkActivity;
