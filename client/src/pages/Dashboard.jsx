import React, { Component } from 'react';
import { connect } from 'react-redux';
import BirdsTable from '../components/BirdsTable';
import BirdModal from '../components/BirdModal';
import AddUpdateBirdModal from '../components/AddUpdateBirdModal';
import AddUpdateSightingModal from '../components/AddUpdateSightingModal';

import styles from '../css/dashboard.scss';

class Dashboard extends Component {
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
