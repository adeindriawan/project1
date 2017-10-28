import Kategori from '../models/category'
import Subkategori from '../models/subcategory'
import mongoose from 'mongoose'

export const getAllCategories = (req, res) => {
    Kategori.find({},  (err, kategori) => {
        res.json(kategori)
    })
}

export const aggCategoryToSubcategory = (req, res) => {
    Kategori.aggregate([
        {
            $lookup: {
                from: 'subcategory',
                localField: '_id',
                foreignField: '_category',
                as: 'subcategories',
            }
        }
    ]).exec((err, results) => {
        res.json(results)
    })
}

export const aggCategoryToTopic = (req, res) => {
    Kategori.aggregate([
        {
            $lookup: {
                from: 'subcategory',
                localField: '_id',
                foreignField: '_category',
                as: 'subcategories',
            }
        }, {
            $unwind: "$subcategories"
        }, {
            $lookup: {
                from: 'topic',
                localField: 'subcategories._id',
                foreignField: '_subcategory',
                as: 'topics'
            }
        }, {
            $project: {
                'name': 1,
                'icon': 1,
                'subcategories.name': 1,
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
