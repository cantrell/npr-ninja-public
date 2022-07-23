import { SHOW_MODAL,
         HIDE_MODAL,
         CLOSE_FIRST_RUN_MODAL } from '../actions';

const modal = (state = {key: null, firstRunShow: true}, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {...state, key:action.modalKey};
    case HIDE_MODAL:
      return {...state, key:null};
    case CLOSE_FIRST_RUN_MODAL:
      return {...state, key:null, firstRunShow: false};
    default:
      return state;
  }
}

export default modal;
