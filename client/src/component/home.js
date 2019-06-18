import React from 'react';
import StreamList from './streamList';

const Home = () =>{
      return (
        <div className="home">
<StreamList />

<hr></hr>
<div className="infos">
<div className="usuario">
<h2>Usuario</h2>
<p>si te registras como usuario podras descubrir nuestro ranking de Streamers y poder disfrutar de un muy buen rato de risas y diversión</p>
</div>
<div className="streamer">
<h2>Streamer</h2>
<p>Como streamer al registrarte tendras acceso a promocionar tu canal añadiendolo al ranking ademas del acceso a la creación de un bot para tu canal</p>
</div>
</div>
        </div>
      )
}

export default Home