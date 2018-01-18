import Immutable from 'immutable';
import * as Events from '../actions';

const initialState = Immutable.fromJS({
});

function dataReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default dataReducer;
