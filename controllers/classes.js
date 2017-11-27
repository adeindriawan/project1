import Kelas from '../models/class'
import mongoose from 'mongoose'

export const createClass = (req, res) => {
    let class_name = req.body.class_name
    let class_date = req.body.class_date
    let token = req.body.token
    let topic = req.body.topic
    let tutor = req.body.tutor

    var data = {}
    data['class_name'] = class_name
    data['class_date'] = class_date
    data['token'] = mongoose.Types.ObjectId(token)
    data['topic'] = mongoose.Types.ObjectId(topic)
    data['tutor'] = mongoose.Types.ObjectId(tutor)

    var newClass = new Kelas({
        class_name: class_name,
        class_date: class_date,
        _token: mongoose.Types.ObjectId(token),
        _topic: mongoose.Types.ObjectId(topic),
        _tutor: mongoose.Types.ObjectId(tutor)
    })
    newClass.save((err) => {
        if (err) {
            return res.send(err)
        } else {
            res.json({success: true, data: data})
        }
    })
}

export const aggClassToTutor = (req, res) => {
    Kelas.aggregate([
        {
            $lookup: {
                from: 'token',
                localField: '_token',
                foreignField: '_id',
                as: 'token'
            }
        }, {
            $unwind: '$token'
        }, {
            $lookup: {
                from: 'user',
                localField: 'token._user',
                foreignField: '_id',
                as: 'tutor'
            }
        }, {
            $project: {
                'class_name':  1,
                'class_date': 1,
                '_token': 1,
                '_topic': 1,
                'token.price': 1,
                'token.quota': 1,
                'token._user': 1,
                'tutor.username': 1
            }
        }
    ]).exec((err, results) => {
        res.json(results)
    })
}

export const aggClassToTutorBasedOnId = (req, res) => {
    let class_id = mongoose.Types.ObjectId(req.params.id)
    
    Kelas.aggregate([
        {
            $match: { _id: class_id }
        }, {
            $lookup: {
                from: 'token',
                localField: '_token',
                foreignField: '_id',
                as: 'token'
            }
        }, {
            $unwind: '$token'
        }, {
            $lookup: {
                from: 'user',
                localField: 'token._user',
                foreignField: '_id',
                as: 'tutor'
            }
        }, {
            $project: {
                'class_name': 1,
                'class_date': 1,
                '_token': 1,
                '_topic': 1,
                'token.price': 1,
                'token.quota': 1,
                'token._user': 1,
                'tutor.username': 1
            }
        }
    ]).exec((err, results) => {
        res.json(results)
    })
}