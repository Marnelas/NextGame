import React, { Component } from 'react';
import {Link} from "react-router-dom"

import StreamService from "../service/stream-services"


class Channel extends Component {
  constructor(props) {
    super(props);
    this.services = new StreamService();
    this.state = { channel: {}, isStreaming: null, search:"", saved: "" };
  }
  componentDidMount() {
    this.services
      .getChannel(this.props.match.params.id)
      .then(channel => this.setState({ channel }))
      .catch(err => console.log(err));
  }
  handleChange = e => {
    this.setState({
        search: e.target.value
      
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.services
      .searchPeople(this.state.search)
      .then(response => {
        this.setState({
          saved: <h3>Se ha guardado el Streamer {response.username}</h3>
        });
      })
      .catch(err=>console.log(err))
  };
  render() {
    return (
      <div className="channel-detail">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label>
              Search:
              <input type="text" onChange={this.handleChange} name="search" value={this.state.search}/>
            </label>
            <button>buscar</button>
          </form>
{this.state.saved}          <h2>Información adicional</h2>
          <div className="row">
            <p className="col-md-4">{this.state.channel.description}</p>
            <p className="col-md-4">
              tiene {this.state.channel.followers} seguidores
            </p>
            <p className="col-md-4">
              tipo de canal: {this.state.channel.broadcaster_type}
            </p>
          </div>
          <div className="banner">
            <h3>banner del canal</h3>
            <img
              src={this.state.channel.profile_banner}
              alt={this.state.channel.name}
            />
          </div>
          <div className="row">
            <h3>información actual en tu streaming</h3>
          </div>
          <div className="row">
            <p>título actual: {this.state.channel.status}</p>
          </div>
          <div className="row">
            <p>Juego actual seleccionado: {this.state.channel.game} </p>
          </div>
          <div className="row">
          <Link to="/bot">link a la creación de bot</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Channel;
