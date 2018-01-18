import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../css/dashboard.scss';

class Dashboard extends Component {
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Dashboard);
