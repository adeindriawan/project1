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
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            role: req.body.role,
            date_of_birth: req.body.date_of_birth,
        })
        // save the user
        newUser.save((err) => {
            if (err) {
                return res.send(err)
            }
            res.json({success: true, msg: 'Successfully created new user.'})
        })
    }
}