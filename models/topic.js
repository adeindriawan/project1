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
    },
    _subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
    }
})

var Topik = mongoose.model('topic', TopicSchema, 'topic')

export default Topik