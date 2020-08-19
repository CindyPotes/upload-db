import React, { Component } from 'react';
import Header from '../../components/header/header.js';
import Form from '../../components/form/form.js';
import Footer from '../../components/footer/footer.js';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Form />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Search;
