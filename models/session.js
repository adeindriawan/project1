import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import config from '../config/database'

mongoose.connect(config.database)
// define SessionSchema
var SessionSchema = new Schema({
    session_id: {
        type: String,
        required: true,
    },
    session_token: {
        type: String,
        required: true,
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    user_role: {
        type: String,
        required: true,
    },
    session_started: {
        type: Date
    }
})

var Session = mongoose.model('session', SessionSchema, 'session')

export default Session