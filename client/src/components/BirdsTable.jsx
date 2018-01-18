import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

class BirdsTable extends Component {
  render() {
    return (
      <table className={classnames('table', 'table-bordered')}>
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
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(BirdsTable);
