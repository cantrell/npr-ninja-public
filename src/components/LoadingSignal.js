import React, { Component } from 'react';
import '../css/LoadingSignal.css';

class LoadingSignal extends Component {

  render() {
    if (this.props.networkActivity === 0) return null;
    return (
      <div>
        <div id="loading-modal">
          <div id="loading-dot-container">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingSignal;
