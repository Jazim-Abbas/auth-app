const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const models = require("../models");


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // User.findById(id, function (err, user) {});
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "280929825494-ioteg88n8463bd02gflh1q90ot8fpo60.apps.googleusercontent.com",
    clientSecret: "pdNww58TZrn4hUAh-JxgrkuR",
    callbackURL: `http://localhost:4000/venue-owner/google/callback`
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));
