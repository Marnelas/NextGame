import React, { Component } from 'react'
import AuthServices from '../service/auth/auth-services'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.services = new AuthServices();
  }

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
      .catch(error => console.log(error.response.data.message));
  };
  render() {
    return (
      <div className="container twitch-login">
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
      </div>
    );
  }
}

export default Login