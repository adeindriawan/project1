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
        required: true
    },
    exp_date: {
        type: Date,
        required: true
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    price: {
        type: Number,
        required: true
    }
})

var Token = mongoose.model('token', TokenSchema, 'token')

export default Token