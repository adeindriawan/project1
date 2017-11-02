import mongoose, { Schema } from 'mongoose'
import config from '../config/database'

mongoose.connect(config.database)
// define TopicSchema
var TopicSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    _subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
    },
    active_students: {
        Type: Number,
        default: 0
    },
    active_tutors: {
        Type: Number,
        default: 0
    }
})

var Topik = mongoose.model('topic', TopicSchema, 'topic')

export default Topik