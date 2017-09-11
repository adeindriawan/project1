import mongoose from 'mongoose'
import passport from 'passport'
import config from '../config/database'
import conpas from '../config/passport'
import User from '../models/user'

var psp = conpas(passport)

export const signup = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'})
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        })
        // save the user
        newUser.save((err) => {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'})
            }
            res.json({success: true, msg: 'Successfully created new user.'})
        })
    }
}