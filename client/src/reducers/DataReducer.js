import Immutable from 'immutable';
import * as Events from '../actions';

const initialState = Immutable.fromJS({
  birds: [],
  sightings: []
});

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case Events.SET_BIRDS:
      return state.merge({
        birds: action.data
      });
    case Events.SET_SIGHTINGS:
      return state.merge({
        sightings: action.data
      });
    default:
      return state;
  }
}

export default dataReducer;
