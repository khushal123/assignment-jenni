const User = require("../database/models/user");
const { secret } = require("../config/jwt-config");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
  algorithms: ["RS256"],
};

passport.use(
  new JwtStrategy(options, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        if (!isOnlyAdmin) {
          return done(null, user);
        }
        if (isOnlyAdmin && user.role === "admin") {
          return done(null, user);
        }
      } else {
        return done(null, false);
      }
    });
  })
);
