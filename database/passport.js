const User = require('../database/models/user')
const { secret } = require("../config/jwt-config")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');


// The verifying public key
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
    algorithms: ['RS256']
};

module.exports = (passport) => {

    passport.use(new JwtStrategy(options, function (jwt_payload, done) {

        User.findOne({ _id: jwt_payload.sub }, function (err, user) {

            if (err) {
                return done(err, false);
            }
            if (user) {

                return done(null, user);
            } else {
                return done(null, false);
            }

        });

    }));
}