import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import * as Action from '../actions';

class AddUpdateBirdModal extends Component {
  constructor(props) {
    super(props);

    this.emptyData = {

    };

    this.state = {
      data: null
    };
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
    return (
      <Modal
        show={this.props.uiState.showBirdFormModal}
        onHide={() => this.close()}
      >
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>One fine body...</Modal.Body>

        <Modal.Footer>
          <Button>Close</Button>
          <Button bsStyle="primary">Save</Button>
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
