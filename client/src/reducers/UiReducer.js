import Immutable from 'immutable';
import * as Events from '../actions';

const initialState = Immutable.fromJS({
});

function uiReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default uiReducer;
