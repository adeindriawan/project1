import mongoose from 'mongoose'
import config from '../config/database'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import Session from '../models/session'

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
                    // create session variables
                    req.session.accessToken = token
                    req.session.userId = user._id
                    req.session.userRole = user.role
                    // assign session variables to a new session object model
                    var newSession = new Session({
                        session_id: req.session.id,
                        user_id: req.session.userId,
                        user_role: req.session.userRole,
                        session_started: new Date()
                    })
                    // save the session object
                    newSession.save((err) => {
                        if (err) {
                            return res.send(err)
                        } else {
                            res.json({success: true, msg: 'Login successful. A new session has been created.', token: token, data: user})
                        }
                    })
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password!'})
                }
            })
        }
    })
}