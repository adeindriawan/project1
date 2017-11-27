import Topik from '../models/topic'
import mongoose from 'mongoose'

export const getAllTopics = (req, res) => {
    Topik.find({},  (err, top) => {
        res.json(top)
    })
}

export const aggTopicToClass = (req, res) => {
    Topik.aggregate([
        {
            $lookup: {
                from: 'class',
                localField: '_id',
                foreignField: '_topic',
                as: 'classes'
            }
        }
    ]).exec((err, results) => {
        res.json(results)
    })
}

export const aggTopicToClassBasedOnId = (req, res) => {
    let topic_id = mongoose.Types.ObjectId(req.params.id)

    Topik.aggregate([
        {
            $match: {
                _id: topic_id
            }
        }, {
            $lookup: {
                from: 'class',
                localField: '_id',
                foreignField: '_topic',
                as: 'classes'
            }
        }
    ]).exec((err, results) => {
        res.json(results)
    })
}

export const aggTopicToTutor = (req, res) => { // result empty array, to be fixed
    Topik.aggregate([
        {
            $lookup: {
                from: 'class',
                localField: '_id',
                foreignField: '_topic',
                as: 'classes'
            }
        }, {
            $unwind: '$classes'
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
                foreignField:  '_id',
                as: 'tutor'
            }
        }, {
            $project: {
                'name': 1,
                'rating': 1,
                'active_tutors': 1,
                'active_students': 1,
                'classes.class_name': 1,
                'classes.class_date': 1,
                'classes._topic': 1,
                'classes._token': 1,
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