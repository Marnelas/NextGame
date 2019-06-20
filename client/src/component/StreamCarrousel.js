import React, { Component } from 'react';
import streamService from "../service/stream-services"

class StreamCarrousel extends Component {
  constructor(){
    super()
    this.state = {
      stream:[]
    }
    this.service= new streamService()
  }
  componentDidMount = () =>{
    this.service.getStream()
    .then(response =>{

        this.setState({ stream:response });
      
    })
    .catch(err=>console.log(err))

  }



  render() {
    if(this.state.stream.length){

      return (
        <div className="carousel">
          <div className="holder">
            {this.state.stream.map(elm => {
              if (elm !== null) {
                return (
                  <a href={elm.stream_url} target="_blank">
                    <img
                      src={elm.logo}
                      className="carousel-img"
                      alt={elm.username}
                    />
                  </a>
                );
              }
            })}
          </div>

          {/* {{!-- imagenes random para el carusel  --}}


{{!-- <div class="index-carusel-headder">
  <h2>Recomended List</h2>
</div> --}}
<div class="carousel">
  <div class="holder">
    {{#each randomMovies}}
    <a href="/detail?netflix_id={{netflixid}}"><img src="{{image}}" alt="{{randomMovies.title}}"
        class="carousel-img"></a>
    {{/each}}
  </div>
</div> */}
        </div>
      );
  }
  else{
   return  <p>problemas con el StreamCarrousel</p>
  }
}
}

export default StreamCarrousel;
