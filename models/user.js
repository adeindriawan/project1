import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import config from '../config/database'

mongoose.connect(config.database)
// define KategoriSchema
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

// UserSchema.pre('save', (next) => {
//     let user = this
//     if (user.isModified('password') || user.isNew) {
//         bcrypt.genSalt(10, (err, salt) => {
//             if (err) {
//                 return next(err)
//             }
//             bcrypt.hash(user.password, salt, null, (err, hash) => {
//                 if (err) {
//                     return next(err)
//                 }
//                 user.password = hash
//                 next()
//             })
//         })
//     } else {
//         return next()
//     }
// })

// UserSchema.methods.comparePassword = (pass, cb) => {
//     bcrypt.compare(passw, this.password, (err, isMatch) => {
//         if (err) {
//             return cb(err)
//         }
//         cb(null, isMatch)
//     })
// }

var User = mongoose.model('user', UserSchema, 'user')

export default User