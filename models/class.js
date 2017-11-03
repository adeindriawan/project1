import mongoose, { Schema } from 'mongoose'
import config from '../config/database'

mongoose.connect(config.database)
// define KelasSchema
var KelasSchema = new Schema({
    class_name: {
        type: String,
        required: true
    },
    class_date: {
        type: Date,
        required: true
    },
    _tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    _token: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'token',
        required: true
    },
    _topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic',
        required: true
    },
    rating: {
        type: Number
    }
})

var Kelas = mongoose.model('class', KelasSchema, 'class')

export default Kelas