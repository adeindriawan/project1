import express from 'express'
import { Router } from 'express'
import { index } from './controllers/index'
import { signup } from './controllers/signup'
import { signin } from './controllers/signin'
import { getAllUsers } from './controllers/users'
import { getUserById } from './controllers/users'
import { getAllCategories } from './controllers/categories'
import { getAllSubcategories } from './controllers/subcategories'
import { getAllTopics } from './controllers/topics'

const app = express();
// initialize the router
const router = Router();

// handle '/' route with index action from index controller
router.route('/').get(index)
router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/users').get(getAllUsers)
router.route('/users/:id').get(getUserById)
router.route('/categories').get(getAllCategories)
router.route('/subcategories').get(getAllSubcategories)
router.route('/topics').get(getAllTopics)

export default router;