import Token from '../models/token'
import mongoose from 'mongoose'
import config from '../config/database'
import jwt from 'jsonwebtoken'

export const createToken = (req, res) => {
    let exp_date = req.body.exp_date
    let quota = req.body.quota
    let price = req.body.price
    let date = new Date()
    let token = jwt.sign({data: date}, config.secret)

    var data = {}
    data['token'] = token
    data['quota'] = quota
    data['exp_date'] = exp_date
    data['price'] = price

    var newToken = new Token({
        token: token,
        quota: quota,
        exp_date: exp_date,
        price: price,
    })
    newToken.save((err) => {
        if (err) {
            return res.send(err)
        } else {
            res.json({success: true, data: data})
        }
    })
}

export const assignTokenToUser = (req, res) => {
    let id_token = req.params.id
    let id_user = mongoose.Types.ObjectId(req.body.user)

    Token.findByIdAndUpdate(id_token, {$set: {_user: id_user}}, {new: true}, (err, token) => {
        if (err) return handleError(err)
        res.json(token)
    })
}