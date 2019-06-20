import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import AuthServices from '../service/auth/auth-services'
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Login from "./login"
import Signup from './signup';


class navigation extends Component {

    constructor(props) {
        super(props)
        this.service = new AuthServices()
    }


    logout = () => {
        this.service.logout()
            .then(x => this.props.setTheUser(null))
    }

    render() {
        if (this.props.userInSession) {
            return (
              <Navbar
                expand="md"
                bg="dark"
                variant="dark"
                className="justify-content-end navigation"
              >
              <NavbarBrand as="div"><Link className="home-link" to="/"><img src="/Next-Game-logo.png" alt="next game logo"/></Link>
 </NavbarBrand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Nav>
                    <Nav.Item>
                      <Nav.Link as="div">
                        <Link to="/profile">Perfil</Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as="div">
                        <Link to="/ranking">Ranking</Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as="div">
                        <Link to="/">Inicio</Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as="div">
                        <div onClick={this.logout}>
                          ¡Cerrar sesión!
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            );
        } else {
            return (
              <Navbar
                expand="md"
                className="justify-content-end navigation"
              >
                <NavbarBrand as="div">
                  <Link className="home-link" to="/">
                    <img
                      src="/Next-Game-logo.png"
                      alt="next game logo"
                    />
                  </Link>
                </NavbarBrand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Nav>
                    <Nav.Item className="login">
                      <Nav.Link as="div">
                        <Login setTheUser={this.props.setTheUser} />
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="signUp">
                      <Nav.Link as="div">
                        <Signup />
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            );
        }
    }
}




export default navigation