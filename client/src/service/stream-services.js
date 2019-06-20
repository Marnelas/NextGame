import { Component } from 'react';
import axios from "axios";



class services extends Component {
  constructor() {
    super();
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}stream`,
      withCredentials: true
    });
  }
  getChannel = id => {
    return this.service.get(`/channel/${id}`).then(response => response.data);
  };
  getStream = () => {
    return this.service.get(`/list`)
    .then(response =>response.data);
  };
  searchPeople = name => {
    return this.service.get(`/search/${name}`).then(response => response.data);
  };
  VoteStream = (vote, streamid, userid) => {
    const data = { vote, streamid, userid };
    return this.service.post(`/vote`, data).then(response => response.data);
  };
  HasVoted = (streamid, userid) => {
    const data = { streamid, userid };
    return this.service.post("/hasvoted", data).then(elm => elm.data);
  };
  inStream = id => {
    console.log(id);
    return this.service
      .get(`/getStreaming/${id}`)
      .then(response => console.log(response.data));
  };
  showStream = () => {
    return this.service.get("/show").then(response => response.data);
  };
  getInfo = id => {
    console.log(id, "jfaifjwogwajg");
    return this.service.get(`/getinfo/${id}`).then(response => response.data);
  };
  botCreate = (username, message, channelUsername, command) =>{
    return this.service.post("/bot", {username, message, channelUsername, command})
    .then(response=>response.data)
  }
}



export default services;
