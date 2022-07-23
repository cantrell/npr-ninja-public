import React, { Component } from 'react';
import { VIEW_MODES } from '../actions';
import '../css/Pagination.css';

class Pagination extends Component {

  render() {

    const viewMode = this.props.storyList.viewMode;
    const searchTerm = this.props.storyList.searchTerm;
    const pageNumber = this.props.storyList.pageNumber;
    const shouldPage = this.props.storyList.shouldPage;
    const onPage = this.props.onPage;

    if (viewMode === VIEW_MODES.SAVED) return null;

    return (
      <div id="pagination">
        {pageNumber > 1 &&
          <a onClick={(e) => onPage(pageNumber-1, viewMode, searchTerm)}>&#8656; Newer Stories</a>
        }
        {pageNumber > 1 && shouldPage &&
          <img id="pagination-separator" src={require('../assets/ninja_star.svg')} width="40px" height="40px" alt="Older Newer link separator"/>
        }
        {shouldPage &&
          <a onClick={(e) => onPage(pageNumber+1, viewMode, searchTerm)}>Older Stories &#8658;</a>
        }
      </div>
    )
  }
}

export default Pagination;
