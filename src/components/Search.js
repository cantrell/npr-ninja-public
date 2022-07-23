import React, { Component } from 'react';
import '../css/Search.css';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {searchTerm: ''};
    this.onSizeDown = (mql) => {
      document.getElementById('search-input').placeholder = (mql.matches) ? 'Search NPR' : 'Search NPR News';
    }
    this.mql = window.matchMedia('(max-width: 720px)');
    this.mql.addListener(this.onSizeDown);
  }

  componentDidMount() {
    this.onSizeDown(this.mql);
  }

  componentWillUnmount() {
    this.mql.removeListener(this.onSizeDown);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({searchTerm: (nextProps.searchTerm) ? nextProps.searchTerm : ''});
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  render () {
    return (
      <div id="Search">
        <form id="search-form" onSubmit={this.props.onSearch} onReset={this.props.onReset}>
          <input type="text" id="search-input" value={this.state.searchTerm} onChange={this.handleChange.bind(this)} placeholder="Search NPR News"/>
          <input type="reset" id="reset-input" value="x" />
        </form>
      </div>
    )
  }
}

export default Search;
