import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import DateTime from 'react-datetime';
import moment from 'moment';
import * as Action from '../actions';
import client from '../utils/feathers';

import '../css/react-datetime.scss';

class BirdModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sightings: [],
      newSighting: {
        datetime: moment(),
        location: ''
      },
      showSightingForm: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      sightings: props.sightings
    });
  }

  toggleAddSightingForm() {
    this.setState({
      showSightingForm: !this.state.showSightingForm,
      newSighting: {
        datetime: moment(),
        location: ''
      }
    });
  }

  updateField(name, value) {
    const newSighting = Object.assign({}, this.state.newSighting);
    newSighting[name] = value;
    this.setState({ newSighting });
  }

  addSighting() {
    const obj = Object.assign({}, this.state.newSighting, {
      bird_id: this.props.uiState.selectedBird.id,
      datetime: this.state.newSighting.datetime.format('YYYY-MM-DD hh:mm:ss')
    });

    const Sighting = client.service('sightings');
    Sighting.create(obj).then(() => {
      this.props.dispatch(Action.fetchSightings());
      this.toggleAddSightingForm();
    });
  }

  deleteSighting(id) {
    const Sighting = client.service('sightings');
    Sighting.remove(id).then(() => {
      this.props.dispatch(Action.fetchSightings());
    });
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
              onChange={e => this.updateField('location', e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col sm={6}>
          <FormGroup>
            <ControlLabel>Date/Time</ControlLabel>
            <DateTime
              value={this.state.newSighting.datetime}
              onChange={v => this.updateField('datetime', v)}
            />
          </FormGroup>
        </Col>

        <Col sm={12}>
          <Button
            bsStyle="primary"
            onClick={() => this.addSighting()}
            style={{ float: 'right' }}
          >
            Add
          </Button>
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
                <td>{bird.weight} kg</td>
              </tr>
            </tbody>
          </Table>

          <hr />

          <h4>Recent Sightings</h4>

          <div className="text-right">
            <Button bsStyle="link" onClick={() => this.toggleAddSightingForm()}>
              <i className={`fa fa-${this.state.showSightingForm ? 'minus' : 'plus'}`} />&nbsp;&nbsp;
              {this.state.showSightingForm ? 'Cancel' : 'Add Sighting'}
            </Button>
          </div>

          {this.state.showSightingForm ? newSightingForm : null}

          <br />

          <Table bordered striped hover>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Date/Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sightings.filter(s => s.bird_id === bird.id).map(sighting => (
                <tr key={sighting.id}>
                  <td>
                    <Button bsStyle="link" onClick={() => this.deleteSighting(sighting.id)}>
                      <i className="fa fa-times" />
                    </Button>
                  </td>
                  <td>{moment(sighting.datetime).format('YYYY-MM-DD hh:mm:ss')}</td>
                  <td>{sighting.location}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    sightings: state.get('data').get('sightings').toJS(),
    uiState: state.get('uiReducer').toJS()
  };
}

export default connect(mapStateToProps)(BirdModal);
