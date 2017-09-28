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
    email: {
        type: String,
        required: true,
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    topics_followed: {
        type: Array,
    }
})

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

var User = mongoose.model('user', UserSchema, 'user')

export default User