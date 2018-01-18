import client from '../utils/feathers';

export const TOGGLE_BIRD_FORM_MODAL = 'TOGGLE_BIRD_FORM_MODAL';
export const TOGGLE_BIRD_MODAL = 'TOGGLE_BIRD_MODAL';

export const SET_BIRDS = 'SET_BIRDS';
export const SET_SIGHTINGS = 'SET_SIGHTINGS';

export const birdActions = {
  ADD: 'Add',
  UPDATE: 'Update'
};

export const sightingActions = {
  ADD: 'Add',
  UPDATE: 'Update'
};

export function fetchBirds() {
  return (dispatch) => {
    const Bird = client.service('birds');
    Bird.find({
      query: {
        $sort: { createdAt: -1 },
        $limit: 200
      }
    }).then((birds) => {
      dispatch({
        type: SET_BIRDS,
        data: birds.data
      });
    });
  };
}

export function fetchSightings() {
  return (dispatch) => {
    const Sighting = client.service('sightings');
    Sighting.find({
      query: {
        $sort: { createdAt: -1 },
        $limit: 200
      }
    }).then((sightings) => {
      dispatch({
        type: SET_SIGHTINGS,
        data: sightings.data
      });
    });
  };
}
