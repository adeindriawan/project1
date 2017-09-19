import User from '../models/user'
import mongoose from 'mongoose'

export const getAllUsers = (req, res) => {
    let data = { user: [], }
    User.find({},  (err, user) => {
        user.map((item) => {
            let month = parseInt(item.date_of_birth.getMonth()) + parseInt(1)
            if (month < 10) month = '0' + month
            let day = parseInt(item.date_of_birth.getDate())
            if (day < 10) day = '0' + day
            let dob = day + '-' + month + '-' + item.date_of_birth.getFullYear()
            data.user.push({
                'id': item._id,
                'username': item.username,
                'password': item.password,
                'email': item.email,
                'first_name': item.first_name,
                'last_name': item.last_name,
                'date_of_birth': dob,
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
        let month = parseInt(user.date_of_birth.getMonth()) + parseInt(1)
        if (month < 10) month = '0' + month
        let day = parseInt(user.date_of_birth.getDate())
        if (day < 10) day = '0' + day
        let dob = day + '-' + month + '-' + user.date_of_birth.getFullYear()
        let item = JSON.parse(JSON.stringify(user))

        data['id'] = item._id
        data['username'] = item.username
        data['password'] = item.password
        data['email'] = item.email
        data['first_name'] = item.first_name
        data['last_name'] = item.last_name
        data['date_of_birth'] = dob
        data['gender'] = item.gender
        data['role'] = item.role
        
        res.json(data)
    })
}