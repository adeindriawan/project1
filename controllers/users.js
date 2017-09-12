import User from '../models/user'
import mongoose from 'mongoose'

export const users = (req, res) => {
    User.find({},  (err, user) => {
        res.json(user)
    })
}
