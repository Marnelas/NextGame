import React from 'react';
import StreamList from "./streamList"

const Random = () => {
  return (
    <div className="random">
      <StreamList />
      <h1 className="title-random">Bienvenido a la aplicación</h1>
      <p className="text-random">Aquí arriba tienes un Streaming aleatorio, pero Clickando en ranking puedes ir a la lista</p>
    </div>
  );

    }




export default Random