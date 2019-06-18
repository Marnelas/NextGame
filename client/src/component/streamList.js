import React, { Component } from 'react';
import StreamService from "../service/stream-services"
import Carousel from "react-bootstrap/Carousel";


class StreamList extends Component {
  constructor(props) {
    super(props);
    this.services = new StreamService();
    this.state = {
      stream: [],
      vote: 0,
      isStreaming: {},
      buttonState: false,
      hateState: false,
      msg:""
    };
  }

  handleStream = id => {
    console.log("entro");
    this.services.inStream(id).then(response => {
      if (response.stream) {
        const data = response.stream;
        const date = new Date(data.created_at);
        this.setState({
          isStreaming: {
            fps: data.average_fps,
            broadcast: data.broadcast_platform,
            game: data.game,
            quality: data.video_height,
            started: `el dia ${date.toLocaleDateString()} en la hora ${
              date.toLocaleTimeString()
            }`
          }
        });
      } else {
        this.setState({ isStreaming: {} });
      }
    });
  };
  componentDidMount = () => {
    this.services.getStream().then(response => {
    

      this.setState({ stream: response, msg:response.msg })

      
        if(response.id)this.handleStream(response.id);
    });
  };
  render() {
    console.log(this.state.msg)
    if(this.state.stream.length === 3){
      return (
        <div>
          <Carousel className="carrousel">
            {this.state.stream.map(elm=>{
              
return <Carousel.Item key={elm._id}>
<img
className="d-block w-60 slideImg"
src={elm.logo}
alt="First slide"
/>
<Carousel.Caption>
<h3 className="StreamName">Stream de {elm.username}  </h3>
<p className="StreamDescription">{elm.description}</p>
</Carousel.Caption>
</Carousel.Item>
            })}
</Carousel>
          
                  </div>
                )

                }else{
                 return <h2>{this.state.msg}</h2>

                }

    }
               } 
               
             
           


export default StreamList;
