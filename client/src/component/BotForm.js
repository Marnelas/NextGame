import React, { Component } from 'react';
import StreamService from "../service/stream-services"
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
            mensaje que poner en el bot:{" "}
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
          <button>guardar y crear</button>
        </form>
      </div>
    );
  }
}

export default BotFotm;
