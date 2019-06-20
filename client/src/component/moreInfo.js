import React from 'react';
import Signup from './signup';
import Login from './login';

const moreInfo = () => {
  return (
    <div>
      <div className="box-intro">
        <div className="smallpDiv">
          <p className="smallp">
            Como usuario vas a poder conocer nuevos streamers y votar cuales
            son tus favoritos
          </p>
          <div className="flexRegistry">
            <Signup />
            <Login />
          </div>
        </div>
        <div className="streamer-moreInfo">
          <p className="largeTex">
            Si te registras vas a tener acceso a incluir tu canal en nuestro
            ranking de votos y acceder a la creación de un Bot con el que
            poder tener acceso rápido a los mensajes que tú quieras.
          </p>
          <a
            href={`${process.env.REACT_APP_URL}auth/twitch`}
            className="login-a no-focus-outline"
          >
            ¡Registrarse con Twitch!
          </a>
        </div>
      </div>
    </div>
  );
}

export default moreInfo;
