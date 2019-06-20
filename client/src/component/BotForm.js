import React, { Component } from 'react';
import StreamService from "../service/stream-services"
import Modal from "react-bootstrap/Modal";

class BotFotm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      message: "",
      channelUsername: "",
      command: ""
    }
    this.services = new StreamService()
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, message,channelUsername, command } = this.state;
    this.services
      .botCreate(username, message, channelUsername, command)
      .then(response => {
        this.setState({ username: "", message: "", channelUsername: "", command: "" });
          
      })

      .catch(error => console.log({ error }));
  };
  render() {
    return (
      <div>
        <button className="login-link" onClick={this.handleShow}>
          ¡Crear el bot!
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="background-dark" closeButton>
            <Modal.Title>Crear bot:</Modal.Title>
          </Modal.Header>
          <Modal.Body className=" background-dark modal-signup">
            <form className="bot-form" onSubmit={this.handleSubmit}>
              <label>
                Nombre del Bot:
                <input
                  required
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Mensaje que poner en el Bot:{" "}
                <input
                  required
                  name="message"
                  type="text"
                  value={this.state.message}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Nombre de tu canal:{" "}
                <input
                  required
                  type="text"
                  name="channelUsername"
                  value={this.state.channelUsername}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Comando a colocar precedido de un !:{" "}
                <input
                  required
                  name="command"
                  type="text"
                  value={this.state.command}
                  onChange={this.handleChange}
                />{" "}
              </label>
              <button>¡Crear!</button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default BotFotm;
