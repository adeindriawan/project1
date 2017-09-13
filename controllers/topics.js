import Topik from '../models/topic'
import mongoose from 'mongoose'

export const getAllTopics = (req, res) => {
    Topik.find({},  (err, top) => {
        res.json(top)
    })
}
