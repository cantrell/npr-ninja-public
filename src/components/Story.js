import React, { Component } from 'react';
import '../css/Story.css';

class Story extends Component {

  toggleHTML() {
    const story = document.getElementById('story_' + this.props.story.id);
    const toggleLabel = document.querySelector('#html_toggle_' + this.props.story.id + ' a');
    if (story.style.display === 'block') {
      story.style.display = 'none';
      toggleLabel.innerHTML = '&#8659; Expand article &#8659;';
    } else {
      story.style.display = 'block';
      toggleLabel.innerHTML = '&#8657; Collapse article &#8657;';
    }
  }

  onShare(action) {
    const story = this.props.story;
    let shareInfo = {};
    console.log(story);
    switch (action) {
      case 'email':
        window.location.href = `mailto:?subject=Interesting%20Story%20From%20NPR&body=${encodeURIComponent(story.title)}%0D%0A%0D%0A${encodeURIComponent(story.link)}`;
        return;
      case 'facebook':
        shareInfo = {site:`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(story.link)}`,width:560, height:350};
        break;
      case 'twitter':
        shareInfo = {site:`https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)} - ${encodeURIComponent(story.link)}`,width: 500, height:305};
        break;
      case 'linkedin':
        shareInfo = {site:`https://www.linkedin.com/shareArticle?mini=true&source=NPR%20Ninja&url=${encodeURIComponent(story.link)}`, width:600, height:645};
        break;
      default:
        return;
    }
    window.open(shareInfo.site, '_new', `menubar=no,location=no,resizable=no,scrollbars=yes,status=no,width=${shareInfo.width},height=${shareInfo.height}`);
  }

  render() {
    const story = this.props.story;
    const audio = this.props.audio;
    return (
      <article>
        {story.image ? (
          <img src={story.image.src} width={story.image.width} className="thumbnail" alt="Story thumbnail"/>
        ) : (
          <img src={require('../assets/default_thumbnail.svg')} width="100" height="100" className="thumbnail" alt="Story thumbnail"/>
        )}
        <h1 className="story-title"><a href={story.link} target="_blank">{story.title}</a></h1>
        <div className="story-metadata">
          by <span className="author">{story.byline}</span> &bull; {story.primaryTopic} &bull; {story.show} &bull; <time dateTime={story.date.isoString}>{story.date.formatted}</time>
          <div className="button-bar">
            {
                ['email', 'facebook', 'twitter', 'linkedin'].map((action) =>
                  <div className={`share-button ${action}-button button`} key={action} onClick={() => this.onShare(action)}></div>
                )
            }
            {story.saved ? (
              <div className="save-story-button save-story-button-remove button" onClick={(e) => this.props.onDeleteSavedStory(story)}>Remove</div>
            ) : (
              <div className="save-story-button button" onClick={(e) => this.props.onSaveStory(story)}>Save</div>
            )}
          </div>
        </div>
        <p className="story-teaser" dangerouslySetInnerHTML={{__html:story.teaser}} />
        {story.pullQuote &&
          <blockquote>
            &ldquo;{story.pullQuote.quote}&rdquo;
            {story.pullQuote.author &&
              <span>
                &mdash;{story.pullQuote.author}
              </span>
            }
          </blockquote>
        }
        {story.audio &&
          <div>
            {audio.storyId === story.id && audio.isPlaying ? (
              <div className="audio-button audio-pause-button button" onClick={() => this.props.onPauseAudio()}>
                Pause &sdot; {story.audioDuration}
              </div>
            ) : (
              <div className="audio-button audio-play-button button" onClick={() => this.props.onPlayAudio(story.audio, story.id)}>
                Listen &sdot; {story.audioDuration}
              </div>
            )}
          </div>
        }
        {story.articleHtml &&
          <div>
            <p id={"html_toggle_"+story.id}>
              <a onClick={() => this.toggleHTML()}>&#8659; Expand article &#8659;</a>
            </p>
            <div id={"story_"+story.id} className="story-html" dangerouslySetInnerHTML={{__html:story.articleHtml}} />
          </div>
        }
      </article>
    )
  }
}

export default Story;
