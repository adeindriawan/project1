import Kategori from '../models/category'
import mongoose from 'mongoose'

export const categories = (req, res) => {
    Kategori.find({},  (err, kategori) => {
        res.json(kategori)
    })
}
