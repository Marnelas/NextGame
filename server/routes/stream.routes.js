const express = require("express");
const passport = require("passport");
const router = express.Router();
const axios = require("axios");
const Streamer = require("../models/Streamer")
const User = require("../models/User")
const Bot = require("../models/Bot")
 const TwitchBot = require("twitch-bot");


require("dotenv").config()

axios.defaults.headers.common["Client-ID"] = process.env.CLIENTIDTWITCH; // for all requests


router.get("/search/:name", (req,res,next) =>{
  const name = req.params.name
  axios.get(`https://api.twitch.tv/helix/users?&login=${name}`)
  .then(response=>{
                             

                    Streamer.findOne({id:response.data.data[0].id})
                    .then(found=>{
                      console.log(found, "-----------------")
                      if(found){
                         res.json(found)
                        }else{
                          const user = response.data.data[0]
                          const data = {
                               username: user.login,
                               id: user.id,
                               email:"",
                                logo: user.profile_image_url,
                                description:user.description,
                                followers:0,
                                video_banner:user.offline_image_url,
                                votes:0,
                                stream_url: `https://www.twitch.tv/${user.login}`

                        }
                        Streamer.create(data)
                        .then(created=>{
                          console.log("paso por aqui ------")
                            res.json(created)
                        })
                        .catch(err=>console.log(err))
                        }
                      })
                    .catch(err=>console.log(err))
                  

                  })
})
router.get("/channel/:id", (req,res,next) =>{
  const id = req.params.id
      axios
        .get(`https://api.twitch.tv/kraken/channels/${id}`)
        .then(response => {
          const banner = response.data.video_banner
          const description = response.data.description
          const followers = response.data.followers
          Streamer.findOneAndUpdate({username: response.data.name}, {$set: {video_banner:banner,description,followers}})
          .then(elm=>{
          })
          
          res.json(response.data)})
        .catch(err => console.log(err));
})

router.get("/list", (req,res,next) =>{
  Streamer.find({ votes: { $exists: true } })
    .sort({ votes: -1 })
    .then(response => {
      if(!response[0] || !response[1] || !response[2])res.json({msg:"no hay suficientes datos para mostrar"})
      const data = [response[0],response[1],response[2]]
      res.json(data);
    })
    .catch(err =>res.json({msg:"ha ocurrido un error con los streaming aleatorios"}))

  })
  router.post("/vote", (req, res, next) => {
    console.log("el body es ", req.body);
    const { vote, streamid, userid } = req.body;
    Streamer.findOneAndUpdate(
     { _id: streamid },
     { $inc: { votes: vote }}, {new:true} )
     .then(response=>{
       console.log(response)
res.json(response)


    User.findOne({ _id: userid }).then(found => {
      const isVoted = found.Streamers.some(elm => {
        return elm == streamid;
      })
      if (!isVoted) {
        User.findOneAndUpdate(
          { _id: userid },
          { $push: { Streamers: streamid } }
        ).then(data => console.log(data));

}
    })
  })
})
    router.post(
      "/bot",(req, res, next) => {
        const { username, message, channelUsername, command } = req.body;
        console.log(
          username,
          " ",
          message,
          " ",
          channelUsername,
          " ",
          command
        );
        console.log(req.user.accessToken);
        console.log(req.user.username)
        let Bot;
        //  console.log(res);
          Bot = new TwitchBot({
            username: username,
            oauth: `oauth:${req.user.accessToken}`,
            channels: [req.user.username]
          });
        

        Bot.on("join", channel => {
          Bot.say(`Joined channel: ${channel}`);
        });
        console.log("lloro fuerte");

        Bot.on("error", err => {
          console.log(err);
        });
        console.log(message, "es el mensaje");
        Bot.on("message", chatter => {
          if (chatter.message === command) {
            Bot.say(message);
          }
        });
        res.json({ msg: "el bot ha sido creado con exito" });
      
      
      })
     
    

    
 

    router.get("/getStreaming/:id", (req,res,next) =>{
      
      const id = req.params.id
      console.log(id)
      axios
        .get(`https://api.twitch.tv/kraken/streams/${id}`)
        .then(response => res.json(response.data))
        .catch(err=>console.error(err))
    });
    router.get("/show",(req,res,next) =>{
      Streamer.find({}).sort({votes:-1})
      .then(response=>res.json(response))
      .catch(err=>console.error(err))
    });
    router.get("/getinfo/:id",(req,res,next)=>{
      console.log(req.params.id)
Streamer.find({ id: req.params.id })
.then(response=>res.json(response))
.catch(err=>console.error(err))
});
   
// router.get("/getVideos", (req,res,next) =>{
//   https://api.twitch.tv/kraken/channels/<channel ID>/videos


// })





module.exports = router;
