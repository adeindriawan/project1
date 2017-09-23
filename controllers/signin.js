import mongoose from 'mongoose'
import config from '../config/database'
import jwt from 'jsonwebtoken'
import User from '../models/user'

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
            // check if password matches
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    // if user is found and password is right, create a token
                    let token = jwt.sign({data: user}, config.secret)
                    // create session var signinToken with the token as the value
                    req.session.signinToken = token
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token, data:  user})
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password!'})
                }
            })
        }
    })
}