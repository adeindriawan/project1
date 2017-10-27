import express from 'express'
import { Router } from 'express'
import { index } from './controllers/index'
import { signup } from './controllers/signup'
import { signin } from './controllers/signin'
import { getAllUsers } from './controllers/users'
import { getUserById } from './controllers/users'
import { getUserDataFromToken } from './controllers/users'
import { getAllTeachers } from './controllers/users'
import { getAllStudents } from './controllers/users'
import { letUserFollowTopics } from './controllers/users'
import { makeUserFollowTopics } from './controllers/users'
import { getAllCategories } from './controllers/categories'
import { aggCategory } from './controllers/categories'
import { getAllSubcategories } from './controllers/subcategories'
import { aggSubcategory } from './controllers/subcategories'
import { getAllTopics } from './controllers/topics'
import { createToken } from './controllers/tokens'
import { assignTokenToUser } from './controllers/tokens'
import { createClass } from './controllers/classes'

const app = express();
// initialize the router
const router = Router();

// handle '/' route with index action from index controller
router.route('/').get(index)
router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/users').get(getAllUsers)
router.route('/users/:id').get(getUserById)
router.route('/users/data/:token').get(getUserDataFromToken)
router.route('/teachers').get(getAllTeachers)
router.route('/students').get(getAllStudents)
router.route('/categories').get(getAllCategories)
router.route('/categories/subcategories').get(aggCategory)
router.route('/subcategories').get(getAllSubcategories)
router.route('/subcategories/topics').get(aggSubcategory)
router.route('/topics').get(getAllTopics)
router.route('/users/:id/topics/follow').get(letUserFollowTopics)
router.route('/users/:id/topics/follow').post(makeUserFollowTopics)
router.route('/token/create/').post(createToken)
router.route('/token/:id/assign').post(assignTokenToUser)
router.route('/class/create').post(createClass)

export default router;