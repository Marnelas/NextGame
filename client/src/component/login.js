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
      <div className="container twitch-login">
        <button className="btn btn-dark" onClick={this.handleShow}>
          Iniciar sesión
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registrarse</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-signup">
            <h1>Iniciar sesión</h1>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.email}
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <button type="submit" className="btn btn-dark">
                ¡Acceder
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Login