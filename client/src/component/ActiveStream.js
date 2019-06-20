import React, { Component } from 'react';
import StreamService from "../service/stream-services"

class ActiveStream extends Component {
  constructor(){
    super()
    this.service = new StreamService()
    this.state = {
    stream:{},
    preview:{},
    channel:{},
    counter:0
    }
  }

  isActive = () =>{
    this.service.homeStream()
    .then(response=>{
      if(!response.stream ||this.state.counter === 10){
        this.setState({counter:this.state.counter+1,stream:null})
        this.isActive()
      }else{
        this.setState({stream:response.stream,preview:response.stream.preview,channel:response.stream.channel})
      }
    })
  }
  componentDidMount = () =>{
    this.isActive();
  }
  render() {
    if(this.state.stream){
    return (
      <div>
        <a href={this.state.channel.url} target="_blank">
          <img src={this.state.preview.large} alt="streaming" />
        </a>


      </div>
    );
    }else{
      return (
        <div>
          <h2 className="no-stream">No hay streamings activos en este momento</h2>
        </div>
      )
    }
  }
}

export default ActiveStream;
