import React, { Component } from 'react';

import StreamService from "../service/stream-services"
import queryString from "query-string"


class StreamDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: {},
      AccountData: {},
      buttonState: false,
      hateState:false,
      voteInfo:{},
      voted:false,
      query:""
      
    };
    this.service = new StreamService();
  }

  componentDidMount() {
    this.setState({query:queryString.parse(this.props.location.search)});
    

    this.service.inStream(this.props.match.params.id).then(response => {
      if (response.stream != null) {
        const time = new Date(response.stream.created_at);
        const data = {
          ...response.stream,
          started: `el dia ${time.toLocaleDateString()} en la hora ${time.toLocaleTimeString()}`
        };
        this.setState({ stream: data });
      } else {
        this.setState({ stream: response.stream });
      }
    });
    this.service.getInfo(this.props.match.params.id).then(response => {
      this.setState({ voteInfo: response[0] });
    });

    this.service.getChannel(this.props.match.params.id).then(response => {
      const time = new Date(response.created_at);
      const data = {
        ...response,
        started: `el dia ${time.toLocaleDateString()} en la hora ${time.toLocaleTimeString()}`
      };
      this.setState({ AccountData: data });
    });
  }
  handlebutton = e => {
    e.preventDefault();
    if (this.state.hateState){ this.setState({ hateState: false });
      
      this.service.VoteStream(1, this.state.voteInfo._id,this.state.query.userId).then(response => {
        this.setState({ voteInfo: response });
      });
    }
    if (this.state.buttonState) {
      this.setState({ buttonState: false });
      this.service.VoteStream(-1, this.state.voteInfo._id).then(response => {
        console.log(response)
        this.setState({ voteInfo: response });
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.hateState) this.setState({ hateState: false });
    this.setState({ buttonState: true });
    this.service
      .VoteStream(1, this.state.voteInfo._id,this.state.query.userId)
      .then(response => {
        console.log(response)
        this.setState({ voteInfo: response });
      })
      .catch(err => console.log(err));
  };
  hateSubmit = e => {
    if (this.state.buttonState) this.setState({ buttonState: false });

    e.preventDefault();
    this.setState({ hateState: true });

    this.service
      .VoteStream(-1, this.state.voteInfo._id, this.state.query.userId)
      .then(response => {
        this.setState({ voteInfo: response });
      })
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.stream) {
      const buttoncolor = {
        like: "like",
        hate: "hate",
        reverselike: "reverse",
        reversehate: "reverse"
      };
      if (this.state.buttonState) {
        buttoncolor.like = "reverse";
        buttoncolor.reverselike = "disabled";
      } else {
        buttoncolor.like = "like";
        buttoncolor.reverselike = "reverse";
      }
      if (this.state.hateState) {
        buttoncolor.hate = "reverse";
        buttoncolor.reversehate = "disabled";
      } else {
        buttoncolor.hate = "hate";
        buttoncolor.reversehate = "reverse";
      }
      
     
      return (
        <div className="container infoStream">
          <h1>Streaming de {this.state.AccountData.name}</h1>

          <div className="row">
            <div className="col-md-6 infoImg">
              <img
                src={this.state.AccountData.logo}
                alt={this.state.stream.name}
              />
            </div>
            <div className="col-md-6 ">
              <h2>actualmente jugando a {this.state.stream.game}</h2>
              <p>ha empezado el directo {this.state.stream.started}</p>
              <p>
                su calidad utilizada es {this.state.stream.average_fps}{" "}
                fps y {this.state.stream.video_height}p
              </p>
              <p>
                lenguaje utilizado "{this.state.AccountData.language}"
              </p>
              {(this.state.voteInfo.votes) ? <p>
                este Streaming ha obtenido ya {this.state.voteInfo.votes}
                votos
              </p> : null
              }
              <form onSubmit={this.handleSubmit}>
                <label>
                  si te gusta el streaming pulsa este botón:
                  <button
                    type="submit"
                    className={buttoncolor.like}
                    disabled={this.state.buttonState}
                  >
                    I like it
                  </button>
                  <button
                    onClick={this.handlebutton}
                    className={buttoncolor.reverselike}
                  >
                    don't hate
                  </button>
                </label>
              </form>

              <form onSubmit={this.hateSubmit}>
                <label>
                  si no te gusta el streaming pulsa este botón:
                  <button
                    className={buttoncolor.hate}
                    disabled={this.state.hateState}
                  >
                    I hate it
                  </button>
                  <button
                    onClick={this.handlebutton}
                    className={buttoncolor.reversehate}
                  >
                    don't hate
                  </button>
                </label>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container infoStream">
          <h1> Streamer {this.state.AccountData.name} actualmente offline</h1>
          <div className="row">
            <div className="col-md-6 infoImg">
              <img
                src={this.state.AccountData.logo}
                alt={this.state.AccountData.name}
              />
            </div>
            <div className="col-md-6">
              <h2>
                Su ultimo Stream fue de "{this.state.AccountData.game}" con
                título "{this.state.AccountData.status}"
              </h2>
              <p>
                Lenguaje utilizado {this.state.AccountData.broadcaster_language}
              </p>
              <p>creó el canal {this.state.AccountData.started} </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

  
export default StreamDetail