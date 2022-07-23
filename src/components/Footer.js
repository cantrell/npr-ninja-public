import React, { Component } from 'react';
import AudioPlayerContainer from '../containers/AudioPlayerContainer';
import '../css/Footer.css';

class Footer extends Component {

  componentDidMount() {
    this.lastUpdatedTimerID = setInterval(()=>this.forceUpdate(), (1000 * 60)); // Every minute.
  }

  componentWillUnmount() {
    clearInterval(this.lastUpdatedTimerID);
  }

  getLastUpdateLabel(d) {
    const lastRefreshTime = d.getTime();
    const rightNow = new Date().getTime();
    const delta = Math.round((((rightNow - lastRefreshTime) / 1000) / 60)); // In minutes.
    if (delta <= 0) {
        return 'Just updated.';
    }
    const hours = Math.floor(delta / 60);
    const hourP = (hours !== 1) ? 's' : '';
    const minutes = Math.round(delta % 60);
    const minP = (minutes !== 1) ? 's' : '';
    let label = (hours > 0) ? `${String(hours)} hour${hourP} and ` : '';
    label += `${minutes} minute${minP}`
    return `Updated ${label} ago.`;
  }

  render() {
    return (
      <footer>
        <div id="refresh-button" className={(this.props.storyList.refreshable) ? 'button' : 'button disabled'} onClick={(e) => this.props.onRefresh(this.props.storyList.viewMode, this.props.storyList.searchTerm)}><span id="refresh-button-label">Refresh</span></div>
        {this.props.storyList.lastUpdated &&
          <div id="last-updated">{this.getLastUpdateLabel(this.props.storyList.lastUpdated)}</div>
        }
        <div id="audio-player-container">
          <AudioPlayerContainer/>
        </div>
        <div id="info-button" className="button" onClick={(e) => this.props.onShowModal('about')}></div>
      </footer>
    )
  }
}

export default Footer;
