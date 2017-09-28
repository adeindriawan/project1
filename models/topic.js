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
    id_subcategory: {
        type: String,
    }
})

var Topik = mongoose.model('topic', TopicSchema, 'topic')

export default Topik