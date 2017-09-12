import Topik from '../models/topic'
import mongoose from 'mongoose'

export const topics = (req, res) => {
    Topik.find({},  (err, top) => {
        res.json(top)
    })
}
