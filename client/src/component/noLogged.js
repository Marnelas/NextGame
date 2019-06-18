import React from 'react';
import StreamList from "./streamList" 

const NoLogged = () => {
  return (
    <div>
      <div className="stream-random-left">
      
      <StreamList />
      </div>
      <div className="stream-random-right">
      <StreamList />
      </div>
    </div>
  );
}

export default NoLogged;
