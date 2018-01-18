import Immutable from 'immutable';
import * as Events from '../actions';

const initialState = Immutable.fromJS({
  showBirdFormModal: false,
  showBirdModal: false,
  birdModalAction: '',
  selectedBird: null
});

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case Events.TOGGLE_BIRD_FORM_MODAL:
      return state.merge({
        showBirdFormModal: action.data.show,
        birdModalAction: action.data.action,
        selectedBird: action.data.data
      });
    case Events.TOGGLE_BIRD_MODAL:
      return state.merge({
        showBirdModal: action.data.show,
        selectedBird: action.data.data
      });
    default:
      return state;
  }
}

export default uiReducer;
