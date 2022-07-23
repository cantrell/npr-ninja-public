// I've found that's it's sometimes useful to have access to the last dispatched action.
const lastAction = (state = null, action) => {
  return action.type;
}

export default lastAction;
