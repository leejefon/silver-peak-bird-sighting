import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';

class BirdModal extends Component {
  render() {
    return (
      <Modal />
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(BirdModal);
