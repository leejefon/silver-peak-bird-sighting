import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';
import * as Action from '../actions';
import client from '../utils/feathers';

class AddUpdateBirdModal extends Component {
  constructor(props) {
    super(props);

    this.emptyData = {
      name: '',
      size: '',
      color: '',
      weight: 0
    };

    this.state = {
      data: Object.assign({}, this.emptyData)
    };
  }

  componentWillReceiveProps(props) {
    if (props.uiState.birdModalAction === Action.birdActions.UPDATE) {
      const data = props.uiState.selectedBird;
      this.setState({
        data
      });
    }
  }

  updateField(name, value) {
    const data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
  }

  addBird() {
    const obj = Object.assign({}, this.state.data);

    const Bird = client.service('birds');
    Bird.create(obj).then(() => {
      this.props.dispatch(Action.fetchBirds());
      this.close();
    });
  }

  updateBird() {
    const obj = Object.assign({}, this.state.data);

    const Bird = client.service('birds');
    Bird.update(obj.id, obj, {}).then(() => {
      this.props.dispatch(Action.fetchBirds());
      this.close();
    });
  }

  close() {
    this.props.dispatch({
      type: Action.TOGGLE_BIRD_FORM_MODAL,
      data: {
        show: false,
        action: '',
        data: null
      }
    });

    this.setState({
      data: Object.assign({}, this.emptyData)
    });
  }

  render() {
    const actionBtn = this.props.uiState.birdModalAction === Action.birdActions.ADD ? (
      <Button bsStyle="primary" onClick={() => this.addBird()}><i className="fa fa-plus" /> Add Bird</Button>
    ) : (
      <Button bsStyle="primary" onClick={() => this.updateBird()}><i className="fa fa-edit" /> Update Bird</Button>
    );

    return (
      <Modal
        show={this.props.uiState.showBirdFormModal}
        onHide={() => this.close()}
      >
        <Modal.Header>
          <Modal.Title>{this.props.uiState.birdModalAction} Bird</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              value={this.state.data.name}
              placeholder="Name"
              onChange={e => this.updateField('name', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Size</ControlLabel>
            <FormControl
              value={this.state.data.size}
              placeholder="Size"
              onChange={e => this.updateField('size', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Color</ControlLabel>
            <FormControl
              value={this.state.data.color}
              placeholder="Color"
              onChange={e => this.updateField('color', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Weight</ControlLabel>
            <FormControl
              value={this.state.data.weight}
              placeholder="Weight"
              onChange={e => this.updateField('weight', e.target.value)}
            />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          {actionBtn}
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    uiState: state.get('uiReducer').toJS()
  };
}

export default connect(mapStateToProps)(AddUpdateBirdModal);
