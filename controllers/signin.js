import mongoose from 'mongoose'
import passport from 'passport'
import config from '../config/database'
import conpas from '../config/passport'
import jwt from 'jsonwebtoken'
import User from '../models/user'

var psp = conpas(passport)

export const signin = (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            throw err
        }

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
        } else {
            res.status(401).send({success: true, msg: 'Authentication success'})
        }
    })
}