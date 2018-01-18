import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import DateTime from 'react-datetime';
import * as Action from '../actions';

import '../css/react-datetime.scss';

class BirdModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sightings: [],
      newSighting: {
        datetime: new Date(),
        location: ''
      },
      showSightingForm: false
    };
  }

  toggleAddSightingForm() {
    this.setState({
      showSightingForm: !this.state.showSightingForm
    });
  }

  updateData(name, value) {
    const newSighting = Object.assign({}, this.state.newSighting);
    newSighting[name] = value;
    this.setState({ newSighting });
  }

  close() {
    this.props.dispatch({
      type: Action.TOGGLE_BIRD_MODAL,
      data: {
        show: false,
        data: null
      }
    });
  }

  render() {
    const bird = this.props.uiState.selectedBird || {};

    const newSightingForm = (
      <Row>
        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Location</ControlLabel>
            <FormControl
              value={this.state.newSighting.location}
              placeholder="Location of Sighting"
              onChange={e => this.updateData('location', e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Date/Time</ControlLabel>
            <DateTime
              value={this.state.newSighting.datetime}
              onChange={e => this.updateData('datetime', e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
    );

    return (
      <Modal
        show={this.props.uiState.showBirdModal}
        onHide={() => this.close()}
      >
        <Modal.Header>
          <Modal.Title>{bird.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table bordered striped hover>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{bird.name}</td>
              </tr>
              <tr>
                <th>Size</th>
                <td>{bird.size}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{bird.color}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{bird.weight}</td>
              </tr>
            </tbody>
          </Table>

          <hr />

          <Button bsStyle="link" onClick={() => this.toggleAddSightingForm()}>
            <i className={`fa fa-${this.state.showSightingForm ? 'minus' : 'plus'}`} />&nbsp;&nbsp;
            {this.state.showSightingForm ? 'Cancel' : 'Add Sighting'}
          </Button>

          {this.state.showSightingForm ? newSightingForm : null}
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    uiState: state.get('uiReducer').toJS()
  };
}

export default connect(mapStateToProps)(BirdModal);
