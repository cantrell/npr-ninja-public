import React, { Component } from 'react';
import SearchContainer from '../containers/SearchContainer';
import { toggleTopicList } from '../utils/toggleTopicList';
import '../css/Header.css';

class Header extends Component {

  render() {
    return (
      <header>
        <img id="hamburger-menu-button" src={require('../assets/menu.svg')} alt="Hamburger Menu" onClick={() => toggleTopicList()}/>
        <img id="logo-graphic" src={require('../assets/ninja_logo.svg')} alt="NPR Ninja Logo"/>
        <div id="logo-app-name">npr.ninja</div>
        <div id="logo-flourish"/>
        <div id="logo-tag-line">become a master of public radio</div>
        <SearchContainer/>
      </header>
    );
  }
}

export default Header;
