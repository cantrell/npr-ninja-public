import React, { Component } from 'react';

// Get an emoji of a random ethnicity. It's written in such a way as to be able
// to return multiple emojis of the same ethnicity.
class RandomEmoji extends Component {

  constructor(props) {
    super(props);
    // The number of skin tones (columns in the sprite sheet).
    this.tones = 5;
    // Listed from top down (rows in the sprite sheet).
    this.emojiKeys = ['point', 'wave', 'shrug', 'nope', 'palm'].reverse();
    // The sprite sheet itself.
    this.spriteSheet = require('../assets/emojis.png');
  }

  render() {
    const rnd = (Math.floor(Math.random() * this.tones)) + 1;
    const left = rnd * 120;
    let key = 0;
    const emojis = this.props.emojis.map(emoji => {
      const top = (this.emojiKeys.indexOf(emoji.key) + 1) * 120;
      const style = {
        width: '120px',
        height: '120px',
        background: `url(${this.spriteSheet}) ${left}px ${top}px`
      }
      return (
        <div key={key++}>
          <div id={emoji.id} className="emoji" style={style}></div>
          {emoji.caption &&
            <div className="emoji-caption">{emoji.caption}</div>
          }
        </div>
      )
    })
    return (
      <div>
        {emojis}
      </div>
    )
  }
}

export default RandomEmoji;
