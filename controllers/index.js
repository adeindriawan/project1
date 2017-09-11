import Kategori from '../models/category'
import mongoose from 'mongoose'

export const index = (req, res) => {
    let kategori = {
        kategori_populer: [],
    };
    Kategori.find({},  (err, kat) => {
        kat.map((item) => {
            kategori.kategori_populer.push({
                "id": item._id,
                "name": item.name,
                "icon": item.icon,
            })
        })
        res.json(kategori)
    })
}
