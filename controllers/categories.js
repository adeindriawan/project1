import Kategori from '../models/category'
import Subkategori from '../models/subcategory'
import Topik from '../models/topic'
import Kelas from '../models/class'
import mongoose from 'mongoose'

export const getAllCategories = (req, res) => {
    let output = {};
    let ListOfCategories = () => {
        Kategori.find({},  (err, kategori) => { // "59b6ad46734d1d2c1614f73f" "59b6ae07734d1d2c1614f7db"
            let iteration = 0
            let categories = []
            if (err) {
                return
            }
            kategori.map((i) => {
                categories.push({
                    'id': i._id,
                    'name': i.name,
                    'icon': i.icon,
                    'subcategories': []
                })
            })
            output['categories'] = categories
            catList(output['categories'])
            // console.log(categories)
        })
    }

    let catList = (list) => {
        let iteration = 0
        list.map((i) => {
            Subkategori.find({_category: i.id}, (err, sub) => { 
                let subcategories = []
                if (err) {
                    return
                }
                sub.map((i) => {
                    subcategories.push({
                        'id': i._id,
                        'name': i.name,
                        'topics': []
                    })
                })
                i['subcategories'] = subcategories // kenapa ga pake .push() tetep bisa ya?
                iteration++
                if (list.length === iteration) {
                    subList(list)
                }
            })
        })
    }

    let subList = (list) => {
        let iteration = 0
        let arrSub = []
        list.map((i) => { // memecah object category untuk  mengambil object subcategory
            let subs = i['subcategories']
            for (var u = 0; u < subs.length; u++) {
                arrSub.push(subs[u]['id'])
                let arrTop = subs[u]['topics']
                Topik.find({_subcategory: subs[u]['id']}, (err, top) => {
                    if (err) {
                        return
                    }
                    top.map((e) => {
                        arrTop.push({
                            'id': e._id,
                            'name': e.name,
                            'active_tutors': e.active_tutors,
                            'active_students': e.active_students,
                            'rating': e.rating,
                            'classes': []
                        })
                    })
                    iteration++
                    if (iteration === arrSub.length) { // kalau hanya 1 category, cukup dengan iteration === subs.length
                        topList(list)
                    }
                })
            }
        })
    }

    let topList = (list) => {
        let iteration = 0
        let arrTop = []
        list.map((i) => {
            let subs = i['subcategories'] // ['subcategories': []]
            for (var u = 0; u < subs.length; u++) {
                let tops = subs[u]['topics']
                for (var e = 0; e < tops.length; e++) {
                    arrTop.push(tops[e]['id'])
                    let arrCla = tops[e]['classes']
                    Kelas.find({_topic: tops[e]['id']}, (err, cla) => {
                        cla.map((a) => {
                            arrCla.push({
                                'id': a._id,
                                'class_name': a.class_name,
                                'class_date': a.class_date,
                                'token': a._token,
                                'tutor': a._tutor
                            })
                        })
                        iteration++
                        if (iteration === arrTop.length) { // kalau hanya 1 category, cukup dengan iteration === tops.length
                            sendOutput(list)
                        }
                    })
                }
            }
        })
    }

    let sendOutput = (output) => {
        res.json(output)
    }

    let NumberOfCategories = () => {
        Kategori.count((err, total) => {
            if (err) {
                return
            }
            return total
        })
    }

    ListOfCategories()
}

export const aggCategoryToSubcategory = (req, res) => {
    Kategori.aggregate([
        {
            $lookup: {
                from: 'subcategory',
                localField: '_id',
                foreignField: '_category',
                as: 'subcategories',
            }
        }
    ]).exec((err, results) => {
        res.json(results)
    })
}

export const aggCategoryToTopic = (req, res) => {
    Kategori.aggregate([
        {
            $lookup: {
                from: 'subcategory',
                localField: '_id',
                foreignField: '_category',
                as: 'subcategories',
            }
        }, {
            $unwind: "$subcategories"
        }, {
            $lookup: {
                from: 'topic',
                localField: 'subcategories._id',
                foreignField: '_subcategory',
                as: 'topics'
            }
        }, {
            $project: {
                'name': 1,
                'icon': 1,
                'subcategories.name': 1,
                'topics._id': 1,
                "topics.name": 1,
                "topics.rating": 1,
                "topics.active_students": 1,
                "topics.active_tutors": 1
            }
        }
    ]).exec((err, results) => {
        res.json(results)
    })
}

export const aggCategoryToClass = (req, res) => {
    Kategori.aggregate([
        {
            $lookup: {
                from: 'subcategory',
                localField: '_id',
                foreignField: '_category',
                as: 'subcategories',
            }
        }, {
            $unwind: "$subcategories"
        }, {
            $lookup: {
                from: 'topic',
                localField: 'subcategories._id',
                foreignField: '_subcategory',
                as: 'topics'
            }
        }, {
            $unwind: '$topics'
        }, {
            $lookup: {
                from: 'class',
                localField: 'topics._id',
                foreignField: '_topic',
                as: 'classes'
            }
        }, {
            $project: {
                'name': 1,
                'icon': 1,
                'subcategories.name': 1,
                "topics.name": 1,
                "topics.rating": 1,
                "topics.active_students": 1,
                "topics.active_tutors": 1,
                'classes.class_name': 1,
                'classes.class_date': 1,
                'classes._tutor': 1
            }
        }
    ]).exec((err, results) => {
        res.json(results)
    })
}