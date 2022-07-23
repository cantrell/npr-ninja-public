import React, { Component } from 'react';

class AudioPlayer extends Component {

  componentDidMount() {
    const audio = document.getElementById('audio-player');
    if (!audio) return;
    audio.addEventListener('play', () => {
      console.log('here');
    })
  }

  onChange(e) {
    console.log(e);
  }

  componentDidUpdate(oldProps) {
    if (this.props.url) {
      const audio = document.getElementById('audio-player');
      if (!this.props.isPlaying) {
        audio.pause();
      } else if (oldProps.storyId === this.props.storyId) {
        audio.play();
      } else {
        audio.src = this.props.url;
      }
    }
  }

  render() {
    if (!this.props.url) return null;
    return (
      <audio id="audio-player" autoPlay controls src={this.props.url} type="audio/mpeg" onPause={()=>this.props.onPauseAudio()} onPlay={()=>this.props.onPlayAudio(this.props.url, this.props.storyId)}/>
    )
  }
}

export default AudioPlayer;
