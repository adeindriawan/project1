import mongoose, { Schema } from 'mongoose';
import config from '../config/database'

mongoose.connect(config.database)
// define SubcategorySchema
var SubcategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    category: {
        type: String,
    },
})

var Subkategori = mongoose.model('subcategory', SubcategorySchema, 'subcategory')

export default Subkategori