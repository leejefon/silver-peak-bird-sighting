import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import moment from 'moment';
import * as Action from '../actions';
import client from '../utils/feathers';

class BirdsTable extends Component {
  toggleBirdFormModal(action, data) {
    this.props.dispatch({
      type: Action.TOGGLE_BIRD_FORM_MODAL,
      data: {
        show: !this.props.uiState.showBirdFormModal,
        action,
        data
      }
    });
  }

  toggleBirdModal(data) {
    this.props.dispatch({
      type: Action.TOGGLE_BIRD_MODAL,
      data: {
        show: !this.props.uiState.showBirdModal,
        data
      }
    });
  }

  deleteBird(id) {
    const Bird = client.service('birds');
    Bird.remove(id).then(() => {
      this.props.dispatch(Action.fetchBirds());
    });
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>Size</th>
            <th>Color</th>
            <th>Weight</th>
            <th>Recent Sightings</th>
          </tr>
        </thead>

        <tbody>
          {this.props.birds.map(bird => (
            <tr key={bird.name}>
              <td>
                <Button bsStyle="link" onClick={() => this.toggleBirdFormModal(Action.birdActions.UPDATE, bird)}>
                  <i className="fa fa-edit" />
                </Button>
                <Button bsStyle="link" onClick={() => this.deleteBird(bird.id)}>
                  <i className="fa fa-times" />
                </Button>
              </td>
              <td>
                <Button bsStyle="link" onClick={() => this.toggleBirdModal(bird)}>
                  {bird.name}
                </Button>
              </td>
              <td>{bird.size}</td>
              <td>{bird.color}</td>
              <td>{bird.weight} kg</td>
              <td>
                {this.props.sightings.filter(s => s.bird_id === bird.id).map(sighting => (
                  <div key={sighting.id}>
                    {moment(sighting.datetime).format('YYYY-MM-DD hh:mm:ss')} @ {sighting.location}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    birds: state.get('data').get('birds').toJS(),
    sightings: state.get('data').get('sightings').toJS(),
    uiState: state.get('uiReducer').toJS()
  };
}

export default connect(mapStateToProps)(BirdsTable);
