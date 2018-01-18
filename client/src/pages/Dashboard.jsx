import React, { Component } from 'react';
import { connect } from 'react-redux';
import BirdsTable from '../components/BirdsTable';
import BirdModal from '../components/BirdModal';
import AddUpdateBirdModal from '../components/AddUpdateBirdModal';
import AddUpdateSightingModal from '../components/AddUpdateSightingModal';
import * as Action from '../actions';

import styles from '../css/dashboard.scss';

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(Action.fetchBirds());
    this.props.dispatch(Action.fetchSightings());
  }

  render() {
    return (
      <div className="container">
        <h1>Bird Sighting</h1>

        <BirdsTable />
        <BirdModal />
        <AddUpdateBirdModal />
        <AddUpdateSightingModal />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Dashboard);
