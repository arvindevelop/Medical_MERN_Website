const dotenv = require('dotenv');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
dotenv.config({path:'./config.env'});
const User = require('./model/userSchema');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// FACEBOOK_APP_ID = "facebook app id";
// FACEBOOK_APP_SECRET = "secret key";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("authenticate");//st-1 and st-3

        const userExist = await User.findOne({email:profile.emails[0].value});
        if(!userExist){
          const user = new User({
            username: profile.displayName,
            email: profile.emails[0].value, 
          });
          const userSave = await user.save();
        }
        else
        {
          await User.findByIdAndUpdate(userExist._id,{'$set' : { 'lastLogged' : Date.now()} }, { new : true });
        }
        done(null,profile);
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
