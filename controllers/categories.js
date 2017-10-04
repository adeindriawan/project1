import Kategori from '../models/category'
import Subkategori from '../models/subcategory'
import mongoose from 'mongoose'

export const getAllCategories = (req, res) => {
    Kategori.find({},  (err, kategori) => {
        res.json(kategori)
    })
}

export const aggCategory = (req, res) => {
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
