import React, { Component } from 'react';
import axios from 'axios';
import './form.css';

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      separator: '',
      file: null,
      campaign: '',
      firstname: false,
      lastname: false,
      phone1: false,
      phone2: false,
      address1: false,
      address2: false,
      isBoxVisible: false,
    };
  }

  onChangeSeparator = (event) => {
    this.setState({
      separator: event.target.value,
    });
  };
  onChangeFile = (event) => {
    this.setState({
      file: event.target.files[0],
      loaded: 0,
    });
  };
  onChangeCampaign = (event) => {
    this.setState({
      campaign: event.target.value,
    });
  };
  onChangeName = (event) => {
    this.setState({
      firstname: !this.state.firstname,
    });
    console.log(this.state);
  };
  onChangeLastName = (event) => {
    this.setState({
      lastname: !this.state.lastname,
    });
    console.log(this.state);
  };
  onChangePhone1 = (event) => {
    this.setState({
      phone1: !this.state.phone1,
    });
    console.log(this.state);
  };
  onChangePhone2 = (event) => {
    this.setState({
      phone2: !this.state.phone2,
    });
    console.log(this.state);
  };
  onChangeAddress1 = (event) => {
    this.setState({
      address1: !this.state.address1,
    });
    console.log(this.state);
  };
  onChangeAddress2 = (event) => {
    this.setState({
      address2: !this.state.address2,
    });
    console.log(this.state);
  };

  onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('separator', this.state.separator);
    data.append('file', this.state.file);
    data.append('campaign', this.state.campaign);
    data.append('firstname', this.state.firstname);
    data.append('lastname', this.state.lastname);
    data.append('phone1', this.state.phone1);
    data.append('phone2', this.state.phone2);
    data.append('address1', this.state.address1);
    data.append('address2', this.state.address2);

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'AccessControl-Allow-Origin': '*',
      },
    };

    axios
      .post('http://localhost:3000/upload', data, axiosConfig)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState((prevState) => ({
      isBoxVisible: !prevState.isBoxVisible,
    }));
  };

  render() {
    const { isBoxVisible } = this.state;
    return (
      <React.Fragment>
        <div className="containerForm">
          <form className="form">
            <div className="formGroup">
              <label className="formTittle">
                Separador , / . / : / ; / otro
              </label>
              <input
                required
                value={this.state.separator}
                className="formControl"
                type="text"
                id="fname"
                name="fname"
                onChange={this.onChangeSeparator}
              />
            </div>
            <div className="formGroup">
              <label className="formTittle">Archivo</label>
              <input
                required
                className="formControl"
                type="file"
                name="file"
                onChange={this.onChangeFile}
              />
            </div>
            <div className="formGroup">
              <label className="formTittle">Campaña</label>
              <input
                required
                className="formControl"
                type="text"
                id="fname"
                name="fname"
                onChange={this.onChangeCampaign}
              />
            </div>
            <div>Marque las columnas que desea subir</div>
            <div className="formGroup">
              <label className="formTittle">Nombre</label>
              <input
                className="formControl"
                type="checkbox"
                onChange={this.onChangeName}
              />
              <label className="formTittle">Apellido</label>
              <input
                className="formControl"
                type="checkbox"
                onChange={this.onChangeLastName}
              />
              <label className="formTittle">Teléfono 1</label>
              <input
                className="formControl"
                type="checkbox"
                onChange={this.onChangePhone1}
              />
              <label className="formTittle">Teléfono 2</label>
              <input
                className="formControl"
                type="checkbox"
                onChange={this.onChangePhone2}
              />
              <label className="formTittle">Dirección 1</label>
              <input
                className="formControl"
                type="checkbox"
                onChange={this.onChangeAddress1}
              />
              <label className="formTittle">Dirección 2</label>
              <input
                className="formControl"
                type="checkbox"
                onChange={this.onChangeAddress2}
              />
            </div>
            <button
              type="button"
              className="formButton"
              onClick={this.onSubmit}
            >
              Enviar Base de datos
            </button>
            <div className={`box ${isBoxVisible ? '' : 'hidden'}`}>
              La base de datos ha sido enviada.
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default UploadForm;
