var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load the User model
import User from '../models/user'
import config from '../config/database'

export default (passport) => {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = config.secret
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({id: jwt_payload.id}, (err, user) => {
            if (err) {
                return done(err, false)
            }
            if (user) {
                done(null,  user)
            } else {
                done(null, false)
            }
        })
    }))
}
