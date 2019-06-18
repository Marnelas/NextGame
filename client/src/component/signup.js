import React, { Component } from 'react'
import AuthServices from '../service/auth/auth-services'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = { username: '', password: '', email: "", imageUrl:"" }
        this.services = new AuthServices()
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit = e => {

        e.preventDefault()
        const { username, password,email, imageUrl } = this.state
          this.services.signup(username, password,email,imageUrl)
              .then(response => {
                  this.setState({ username: '', password: '', email: "", imageUrl:"" })
                  this.props.setTheUser(response)
                  
              })

        
            .catch(error => console.log({error}))
    }
    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.services.handleUpload(uploadData)
            .then(response => {
                this.setState({
                    imageUrl: response.secure_url
                    
                })
                alert("imagen subida")
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
          <div className="container ">
            <h1 className="signup-title">Registrarse</h1>

            <form className="signup" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-3">
                  <label htmlFor="username">Usuario</label>
                  <input
                    onChange={this.handleChange}
                    value={this.state.username}
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                  />
                </div>
                <div className="col-md-3">
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
                </div>
                <div className="col-md-3">
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
                </div>
                <div className="col-md-3">
                  <label htmlFor="imageUrl">URL imagen</label>
                  <input
                    onChange={this.handleFileUpload}
                    type="file"
                    className="form-control"
                    id="imageUrl"
                    name="imageUrl"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-dark">
                Enviar
              </button>
            </form>
          </div>
        );
    }

}

export default Signup