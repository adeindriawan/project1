import User from '../models/user'
import Topic from '../models/topic'
import mongoose from 'mongoose'

export const getAllUsers = (req, res) => {
    let data = { users: [], }
    User.find({},  (err, user) => {
        user.map((item) => {
            let month = parseInt(item.date_of_birth.getMonth()) + parseInt(1)
            if (month < 10) month = '0' + month
            let day = parseInt(item.date_of_birth.getDate())
            if (day < 10) day = '0' + day
            let dob = day + '-' + month + '-' + item.date_of_birth.getFullYear()
            data.users.push({
                'id': item._id,
                'username': item.username,
                'password': item.password,
                'email': item.email,
                'first_name': item.first_name,
                'last_name': item.last_name,
                'date_of_birth': dob,
                'gender': item.gender,
                'role': item.role,
                'topics_followed': item.topics_followed
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
        data['topics_followed'] = item.topics_followed
        
        res.json(data)
    })
}

export const letUserFollowTopics = (req, res) => {
    let token = getAccessToken(req.session.accessToken)
    if (token) {
        let data = { 
            all_topics: [],
            topics_followed: [],
        }
        let id = req.params.id
        Topic.find({}, (err, topic) => {
            topic.map((item) => {
                data.all_topics.push({
                    'id': item._id,
                    'name': item.name
                })
            })
        })
        User.find({_id: id}, (err, user) => {
            let item = JSON.parse(JSON.stringify(user))
            item.map((el) => {
                data.topics_followed.push({
                    'id': el.topics_followed
                })
            })
            res.json(data)
        })
    } else {
        res.status(401).send({success: false, msg: 'Unauthorized user. You must log in first.'})
    }
}

export const makeUserFollowTopics = (req, res) => {
    let token = getAccessToken(req.session.accessToken)
    if (token) {
        let id = req.params.id
        let topic = req.body.topic
        User.findByIdAndUpdate(id, {$set: {topics_followed: topic}}, {new: true}, (err, user) => {
            if (err) return handleError(err)
            res.json(user)
        })
    } else {
        res.status(401).send({success: false, msg: 'Unauthorized user. You must log in first.'})        
    }
}

const getAccessToken = (session) => {
    if (session) {
        return session
    } else {
        return null
    }
}