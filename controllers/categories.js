import Kategori from '../models/category'
import Subkategori from '../models/subcategory'
import Topik from '../models/topic'
import Kelas from '../models/class'
import mongoose from 'mongoose'

export const getAllCategories = (req, res) => {
    let output = {};
    let ListOfCategories = () => {
        Kategori.find({},  (err, kategori) => {
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
        })
    }

    let catList = (list) => {
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
                i['subcategories'] = subcategories
                subList(subcategories)
            })
        })
    }

    let subList = (list) => {
        list.map((i) => {
            Topik.find({_subcategory: i.id}, (err, top) => {
                let topics = []
                if (err) {
                    return
                }
                top.map((i) => {
                    topics.push({
                        'id': i._id,
                        'name': i.name,
                        'active_tutors': i.active_tutors,
                        'active_students': i.active_students,
                        'rating': i.rating,
                        'classes': []
                    })
                })
                i['topics'] = topics
                topList(topics)
            })
        })
    }

    let topList = (list) => {
        let iteration = 0
        list.map((i) => {
            Kelas.find({_topic: i.id}, (err, cla) => {
                let classes = []
                if (err) {
                    return
                }
                cla.map((i) => {
                    classes.push({
                        'id': i._id,
                        'class_name': i.class_name,
                        'class_date': i.class_date,
                        'token': i._token,
                        'tutor': i._tutor
                    })
                })
                i['classes'] = classes
                iteration++
                if (iteration === list.length) {
                    sendOutput(output)
                }
            })
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