import React from 'react';
import {Link} from "react-router-dom"
import ActiveStream from './ActiveStream';
import StreamCarrousel from "./StreamCarrousel"


const Home = (props) =>{
      return (
        <div className="home">
          <div className="box-intro">
            <div>
              <p>
                Con NextGame puedes aumentar tú número de seguidores
                <br />y así obtener la comunidad que mereces
              </p>
              <div className="signup-button">
                <a
                  href={`${process.env.REACT_APP_URL}auth/twitch`}
                  className="login-link"
                >
                  ¡Registrarse!
                </a>
              </div>
              <Link className="contents" to="/more">
                ¡Saber más...!
              </Link>
            </div>
            <img
              className="box-image"
              src="/ahriArcade.png"
              alt="ahri arcade"
            />
          </div>
          <div className="Streaming-active">
            <ActiveStream />
          </div>

            <StreamCarrousel />


         

        </div>
      );
}

export default Home