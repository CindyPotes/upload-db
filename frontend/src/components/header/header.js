import React, { Component } from 'react';
import './header.css';
class Header extends Component {
  render() {
    return (
      <div className="containerHeader">
        <a href="http://localhost:3001">Subir Base</a>
        <a href="http://localhost:3001/list">Lista</a>
      </div>
    );
  }
}

export default Header;
