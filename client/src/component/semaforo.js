

import React, { Component } from 'react';
import Axios from "axios";
import Profile from "./Profile";
import StreamRanking from "./streamRanking"

class semaforo extends Component {
  constructor(){
    super()
    this.state={
      user:{}
    }
  }
  componentDidMount() {
    Axios.get(`${process.env.REACT_APP_URL}auth/semaphore`).then(
      response => {
        this.setState({ user: response.data });
      }
    )
    .catch(err=>console.log(err))
  }
  
  render() {

    if (this.state.user.accessToken){
      return (
        <div>
          <Profile loggedUser={this.state.user} />>
        </div>
      );
    }else{
   
      return <div><StreamRanking loggedUser={this.state.user} /></div>
    }
  }
}

export default semaforo;
