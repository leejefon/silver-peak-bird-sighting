import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import classnames from 'classnames';
import * as Action from '../actions';

class BirdsTable extends Component {
  toggleBirdFormModal() {

  }

  toggleBirdModal() {

  }

  deleteBird() {

  }

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
              <td>{bird.weight}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    birds: state.get('data').get('birds').toJS()
  };
}

export default connect(mapStateToProps)(BirdsTable);
