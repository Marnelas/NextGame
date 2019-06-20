import StreamService from "../service/stream-services"
import React, { Component } from 'react';

class IsStreaming extends Component {
  constructor(props){
    super(props)
    this.state = {
      streaming: {},url:""
    }
    this.service = new StreamService()
  }
  componentDidMount = () =>{
    this.service.inStream(this.props.id)
    .then(response=>{
      if(response.stream){
        
        this.setState({streaming:response.stream.preview,url:response.stream.channel.url})}
        else{
          this.setState({streaming:null})
        }
    })
  }
  render() {
    if(this.state.streaming){

    
    return (
      <div className="stream-ranking">
        <a href={this.state.url} target="_blank">
          <img src={this.state.streaming.medium} alt="streaming" />
        </a>
      </div>
    );
    }else{
      return <div className="isStreaming">Esta persona no está en streaming</div>
    }
  }
}

export default IsStreaming;
