import React, { Component } from 'react'
import AuthServices from '../service/auth/auth-services'
import Modal from "react-bootstrap/Modal";


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      imageUrl: "",
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.services = new AuthServices();
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password, email, imageUrl } = this.state;
    this.services
      .signup(username, password, email, imageUrl)
      .then(response => {
        this.setState({ username: "", password: "", email: "", imageUrl: "" });
      })

      .catch(error => console.log({ error }));
  };
  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    this.services
      .handleUpload(uploadData)
      .then(response => {
        this.setState({
          imageUrl: response.secure_url
        });
        alert("imagen subida");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <button className="login-link" onClick={this.handleShow}>
          Registrarse
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="background-dark" closeButton>
            <Modal.Title>Registrarse</Modal.Title>
          </Modal.Header>
          <Modal.Body className=" background-dark modal-signup">
            <form className="signup container" onSubmit={this.handleSubmit}>
              <label htmlFor="username">Usuario</label>
              <input
                onChange={this.handleChange}
                value={this.state.username}
                type="text"
                className="form-control"
                id="username"
                name="username"
              />
              <label htmlFor="password">Contraseña</label>
              <input
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
                className="form-control"
                id="password"
                required
                name="password"
              />

              <label htmlFor="email">email</label>
              <input
                onChange={this.handleChange}
                value={this.state.email}
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />

              <label htmlFor="imageUrl">URL imagen</label>
              <input
                onChange={this.handleFileUpload}
                type="file"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
              />

              <button type="submit" className="login-link">
                Enviar
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Signup