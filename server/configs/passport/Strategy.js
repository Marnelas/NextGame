const passport      = require('passport')
const localStrategy = require('passport-local').Strategy
const User  = require("../../models/User")
const bcrypt = require('bcrypt')
const twitchStrategy = require("passport-twitch").Strategy

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      User.findOne({ email })
        .then(foundUser => {
          if (!foundUser) {
            done(null, false, { message: "Incorrect email" });
            return;
          }

          if (!bcrypt.compareSync(password, foundUser.password)) {
            done(null, false, { message: "Incorrect password" });
            return;
          }

          done(null, foundUser);
        })
        .catch(err => {
          done(err);
        });
    }
  )
);


passport.use(
  new twitchStrategy(
    {
      clientID: process.env.CLIENTIDTWITCH,
      clientSecret: process.env.TWITCHSECRET,
      callbackURL: "https://game-next.herokuapp.com/auth/twitch/callback",
      scope: "chat:edit user_read chat:read"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.email })
        .then(user => {
          if (user) {
            User.findOneAndUpdate(
              { _id: user._id },
              { accessToken: accessToken }
            );
            return done(null, user);
          } else {
            const data = {
              username: profile.username,
              email: profile.email,
              id: profile.id,
              logo: profile._json.logo,
              description: "",
              followers: 0,
              video_banner: "",
              accessToken: accessToken,
              refreshToken: refreshToken
            };

            User.create(data)
              .then(Cuser => {
                console.log(Cuser);

                return done(null, Cuser);
              })
              .catch(err => {
                return done(err);
              });
          }
        })
        .catch(err => {
          return done(err);
        });

      /**
 * https://id.twitch.tv/oauth2/authorize
    ?client_id=process.env.CLIENTIDTWITCH
    &redirect_uri=http://localhost:3000/auth/twitch/callback
    &response_type=token
    &scope=user_read
 */
    }
  )
);
