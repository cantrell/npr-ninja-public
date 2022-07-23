import React, { Component } from 'react';
import '../css/Modal.css';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.onKeyDown = (e) => {
      if (e.code === 'Escape') this.props.onHide();
    }
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  // Make close buttons reusable for different types of modals.
  getCloseButton(closeFunction) {
    return (
      <div id="modal-close-container">
        <div id="modal-close-button" className="button" onClick={(e) => {closeFunction(this.props.modalKey)}}>Close</div>
      </div>
    )
  }

  render() {
    if (!this.props.modalKey) return null;
    return (
      <div id="modal">
        {this.props.modalKey === 'about' &&
          <div id="modal-about">
            <p>npr.ninja was written by <a href="https://christiancantrell.com" target="_new">Christian Cantrell</a> using <a href="https://reactjs.org/" target="_new">React</a>, <a href="https://redux.js.org/" target="_new">Redux</a>, and the open <a href="http://www.npr.org/api" target="_new">NPR API</a>.</p>
            {this.getCloseButton(this.props.onHide)}
          </div>
        }
        {this.props.modalKey === 'ios-save-to-home-screen' &&
          <div id="modal-about">
            <p>To save npr.ninja to your home screen, tap Share (<img src={require('../assets/ios_share.svg')} id="ios-share-icon" alt="iSO share icon"/>), then "Add to Home Screen."</p>
            {this.getCloseButton(this.props.onCloseFirstRun)}
          </div>
        }
      </div>
    );
  }
}

export default Modal;
