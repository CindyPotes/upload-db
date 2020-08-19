import React, { Component } from 'react';
import axios from 'axios';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getItems = () => {
    axios
      .get('http://localhost:3000/items')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <button type="button" onClick={this.getItems}>
        Click Me!
      </button>
    );
  }
}

export default Items;
