import React, { Component } from 'react';
import StreamService from "../service/stream-services"
import {Link } from "react-router-dom"
import StreamList from "./streamList"

class streamRanking extends Component {
  constructor(props){
    super(props)
    this.state={
      streams: [],
    }
    this.services = new StreamService()
  }
    componentDidMount = () =>{
      this.services.showStream()
      .then(response=>{
        let start = []
        start.push(response.map(elm => {
          return new Date(elm.created_at);
        }));
        this.setState({streams:response})})
    }

  render() {
    return (
      <div>
        <StreamList
        />
        <div className="container">
          <div className="row">
            {this.state.streams.map((elm, i) => {
              return (
                <div key={elm.id} className="col-sm-4 stream">
                  <Link
                    className="StreamLink"
                    to={`/ranking/streamDetails/${elm.id}?userId=${this.props.loggedUser._id}`}
                  >
                    <img src={elm.logo} alt={elm.username} />
                    <p>nombre del Streamer:{elm.username}</p>
                    <p>con {elm.votes} votos a día de hoy</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default streamRanking;
