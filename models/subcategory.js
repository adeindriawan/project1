import mongoose, { Schema } from 'mongoose';
import config from '../config/database'

mongoose.connect(config.database)
// define SubcategorySchema
var SubcategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    _category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
})

var Subkategori = mongoose.model('subcategory', SubcategorySchema, 'subcategory')

export default Subkategori