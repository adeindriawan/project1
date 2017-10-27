import mongoose, { Schema } from 'mongoose'
import config from '../config/database'

mongoose.connect(config.database)
// define TokenSchema
var TokenSchema = new Schema({
    token: {
        type: String,
        unique: true,
    },
    quota: {
        type: Number,
    },
    exp_date: {
        type: Date
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    price: {
        type: Number,
    }
})

var Token = mongoose.model('token', TokenSchema, 'token')

export default Token