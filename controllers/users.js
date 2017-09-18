import User from '../models/user'
import mongoose from 'mongoose'

export const getAllUsers = (req, res) => {
    let data = { user: [], }
    User.find({},  (err, user) => {
        user.map((item) => {
            data.user.push({
                'id': item._id,
                'username': item.username,
                'password': item.password,
                'email': item.email,
                'first_name': item.first_name,
                'last_name': item.last_name,
                'data_of_birth': item.date_of_birth,
                'gender': item.gender,
                'role': item.role
            })
        })
        res.json(data)
    })
}

export const getUserById = (req, res) => {
    let id = req.params.id
    let data = {}
    User.findOne({_id: id},  (err, user) => {
        user.map((item) => {
            data['id'] = item._id,
            data['username'] = item.username,
            data['password'] = item.password,
            data['email'] = item.email,
            data['first_name'] = item.first_name,
            data['last_name'] = item.last_name,
            data['date_of_birth'] = item.date_of_birth.getDate() + '-' + item.date_of_birth.getMonth()+1 + '-' + item.date_of_birth.getFullYear(),
            data['gender'] = item.gender,
            data['role'] = item.role
        })
        res.json(data)
    })
}