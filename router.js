import express from 'express'
import { Router } from 'express'
import { index } from './controllers/index'
import { signup } from './controllers/signup'
import { signin } from './controllers/signin'

const app = express();
// initialize the router
const router = Router();

// handle '/' route with index action from index controller
router.route('/').get(index)
router.route('/signup').post(signup)
router.route('/signin').post(signin)

export default router;