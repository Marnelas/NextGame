import React, { Component } from 'react'
import AuthServices from '../service/auth/auth-services'
import Modal from "react-bootstrap/Modal";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "",show:false };
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
    const { email, password } = this.state;
    this.services
      .login(email, password)
      .then(response => {
        this.setState({ email: "", password: "" });
        this.props.setTheUser(response);
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div>
        <button className="login-link" onClick={this.handleShow}>
          ¡Iniciar sesión!
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="background-dark" closeButton>
            <Modal.Title className="background-dark">
              Iniciar sesión:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-signup background-dark">
            <form className="signup container" onSubmit={this.handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                onChange={this.handleChange}
                value={this.state.email}
                type="email"
                className="form-control"
                id="email"
                required
                name="email"
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
              <button type="submit" className="login-link">
                ¡Acceder!
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Login