import Kategori from '../models/category'
import mongoose from 'mongoose'

export const getAllCategories = (req, res) => {
    Kategori.find({},  (err, kategori) => {
        res.json(kategori)
    })
}
