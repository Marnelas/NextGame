const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User")
const Streamer = require("../models/Streamer")

const uploader = require("../configs/cloudinary.config");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const tmi = require("tmi.js");




  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, theUser, failureDetails) => {


      if (err) {
        res
          .status(500)
          .json({ message: "Something went wrong authenticating user" });
        return;
      }

      if (!theUser) {
        // "failureDetails" contains the error messages
        // from our logic in "LocalStrategy" { message: '...' }.
        res.status(401).json(failureDetails);
        return;
      }

      // save user in session
      req.login(theUser, err => {
        if (err) {
          res.status(500).json({ message: "Session save went bad." });
          return;
        }

        // We are now logged in (that's why we can also send req.user)
        res.status(200).json(theUser);
      });
    })(req, res, next);
  });
  // passport.authenticate("local", (err, theUser, failuredetails) =>{
  //   if(err) {
  //       res.status(500).json({message: "algo en algun momento en algun lugar del authenticate falló"})
  //       return;
  //   }
  //   if(!theUser){
  //     res.status(401).json(failuredetails)
  //     return 
  //   }
    // req.login(theUser)
    // .then(user=>res.json(user))
    // .catch(err=>console.log(err))



router.post("/upload", uploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ secure_url: req.file.secure_url });
});

/**
 * 
authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }

        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res, next);
});
 */


router.post("/signup", (req, res, next) => {

  console.log("Voyle")
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email
  const imageUrl = req.body.imageUrl
  if (username === "" || password === "" || email === "" || imageUrl === "") {
    res.status(400).json({ message: "Indicate username,email,image and password" });
    return;
  }

  User.findOne({ email })
.then( found => {
  if (found) res.status(400).json({ message: "The username already exists" });
})
.catch(err=>console.log(err))

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      imageUrl
    });

    newUser.save()
    .then(user => {
 req.login(user, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }


                res.status(200).json(user);    })
              })
      .catch(err => {
        res.status(400).json({ message: "Something went wrong" });
      })
});

router.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});
 router.get(
   "/twitch",
   passport.authenticate("twitch", { forceVerify: true})
 );
 router.get("/twitch/callback",
   passport.authenticate("twitch", { failureRedirect: "http://localhost:5000/login" }),
   (req, res) => {
                   console.log(req.user);
                
                   res.redirect("http://localhost:5000");
                 }
 );
 router.get("/loggedin", (req, res, next) => {
   console.log(req.isAuthenticated(), " hola")
 if (req.isAuthenticated()) {
   console.log("cucu")
   res.status(200).json(req.user);
   return;
 }
 res.status(403).json({ message: "No estas logueado, aqui abajo puedes loguearte" });
 });


module.exports = router;
