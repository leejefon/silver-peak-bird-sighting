import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import BirdsTable from '../components/BirdsTable';
import BirdModal from '../components/BirdModal';
import AddUpdateBirdModal from '../components/AddUpdateBirdModal';
import * as Action from '../actions';

import styles from '../css/dashboard.scss';

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(Action.fetchBirds());
    this.props.dispatch(Action.fetchSightings());
  }

  toggleBirdAddModal() {
    this.props.dispatch({
      type: Action.TOGGLE_BIRD_FORM_MODAL,
      data: {
        show: !this.props.uiState.showBirdFormModal,
        action: Action.birdActions.ADD
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Bird Sighting</h1>

        <div className="text-right">
          <Button bsStyle="link" onClick={() => this.toggleBirdAddModal()}>
            <i className="fa fa-plus" /> Add Bird
          </Button>
        </div>

        <BirdsTable />
        <BirdModal />
        <AddUpdateBirdModal />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uiState: state.get('uiReducer').toJS()
  };
}

export default connect(mapStateToProps)(Dashboard);
