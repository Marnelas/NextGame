import React from 'react';
import {Link} from "react-router-dom"
import StreamList from "./streamList"
 const Profile = props => {
  console.log(props)
  let streamerImage, infoChannel
  if (props.loggedUser.id) {
    streamerImage = (
      <div className="col-md-6">
        <img src={props.loggedUser.logo} alt="streamer" />
      </div>
    )
    infoChannel = (
      <Link className="login-link"to={`/channel/${props.loggedUser.id}`}>info channel</Link>
    );
  } else {
    infoChannel = (
      <h3>Espero que disfrutes de tu estancia en nuestra aplicación</h3>)
    streamerImage = (
      <div className="col-md-6">
        <img src={props.loggedUser.imageUrl} alt="user" />
      </div>
    );
  }

  
  return (
    <div className="profile">
       {streamerImage}
      <div className="text">
        <h1>Usuario conectado {props.loggedUser.username}</h1>
          
        <p>con email {props.loggedUser.email}</p>
        {infoChannel}
      </div>
    </div>
  );
}



export default Profile