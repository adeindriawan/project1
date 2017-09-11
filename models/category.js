import mongoose, { Schema } from 'mongoose'
import config from '../config/database'

mongoose.connect(config.database)
// define KategoriSchema
var CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    icon: {
        type: String,
    },
})

var Kategori = mongoose.model('category', CategorySchema, 'category')

export default Kategori