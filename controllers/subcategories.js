import Kategori from '../models/subcategory'
import mongoose from 'mongoose'

export const subcategories = (req, res) => {
    Kategori.find({},  (err, subkategori) => {
        res.json(subkategori)
    })
}
