import User from '../models/user'
import mongoose from 'mongoose'

export const getAllUsers = (req, res) => {
    User.find({},  (err, user) => {
        res.json(user)
    })
}

export const getUserById = (req, res) => {
    let id = req.params.id
    User.findOne({_id: id},  (err, user) => {
        res.json(user)
    })
}