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
        }
    ]).exec((err, results) => {
        res.json(results)
    })
}
