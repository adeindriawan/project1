import Subkategori from '../models/subcategory'
import mongoose from 'mongoose'

export const getAllSubcategories = (req, res) => {
    Subkategori.find({},  (err, subkategori) => {
        res.json(subkategori)
    })
}

export const aggSubcategory = (req, res) => {
    Subkategori.aggregate([
        {
            $lookup: {
                from: 'topic',
                localField: '_id',
                foreignField: '_subcategory',
                as: 'topics',
            }
        },
        {
            $project: {
                "name": 1,
                "topics.name": 1,
                "topics.rating": 1,
                "topics.active_students": 1,
                "topics.active_tutors": 1
            }
        }
    ]).exec((err, results) => {
        res.json(results)
    })
}

export const getSubcategoriesByCategoryId = (req, res) => {
    let id = mongoose.Types.ObjectId(req.params.id)

    if (id) {
        let data = {}

        Subkategori.find({_category: id}, (err, sub) => {
            res.json(sub)
        })
    } else {
        res.send('The category ID is not defined.')
    }
}