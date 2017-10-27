import Class from '../models/class'
import mongoose from 'mongoose'

export const createClass = (req, res) => {
    let class_name = req.body.class_name
    let class_date = req.body.class_date
    let token = req.body.token
    let topic = req.body.topic

    var data = {}
    data['class_name'] = class_name
    data['class_date'] = class_date
    data['token'] = mongoose.Types.ObjectId(token)
    data['topic'] = mongoose.Types.ObjectId(topic)

    var newClass = new Class({
        class_name: class_name,
        class_date: class_date,
        _token: mongoose.Types.ObjectId(token),
        _topic: mongoose.Types.ObjectId(topic),
    })
    newClass.save((err) => {
        if (err) {
            return res.send(err)
        } else {
            res.json({success: true, data: data})
        }
    })
}