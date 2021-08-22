const LocalStrategy = require("passport-local").Strategy;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

// Load User model
const User = require("../Models/User");

const pathToKey = path.join(__dirname, "./utils", "id_rsa_priv.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};



module.exports = function (passport) {

  passport.use(
    new JwtStrategy(options, function (payload, done) {
      // We will assign the `sub` property on the JWT to the database ID of user
      User.findOne({ _id: payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          // bcrypt.compare(payload.password, user.password, (err, isMatch) => {
          //   if (err) throw err;
          //   if (isMatch) {
          //     return done(null, user);
          //   } else {
          //     return done(null, false, { message: "Incorrect Password" });
          //   }
          // });
          return done(null,user)
        } else {
        
          return done(null, false);
        }
      });
    })
  );
};
