import React from 'react';
import StreamList from './streamList';
import {Link} from "react-router-dom"
import Signup from './signup';
import Login from './login';

const Home = (props) =>{
      return (
        <div className="home">
          <StreamList />

          <hr />
          <div className="infos">
            <div className="usuario">
              <h2>Usuario</h2>
              <p>
                si te registras como usuario podras descubrir nuestro
                ranking de Streamers y poder disfrutar de un muy buen rato
                de risas y diversión
              </p>
              
              <Signup />
              <Login setTheUser={props.setTheUser} />
            </div>
            <div className="streamer">
              <h2>Streamer</h2>
              <p>
                Como streamer al registrarte tendras acceso a promocionar
                tu canal añadiendolo al ranking ademas del acceso a la
                creación de un bot para tu canal;
              </p>
              <a href={`${process.env.REACT_APP_URL}auth/twitch`}>
                registrarse con twitch
              </a>
            </div>
          </div>
        </div>
      );
}

export default Home