import express from 'express'
const router = express.Router()
import { signUp }  from '../controllers/usersControllers.js'

router.post('/signup', signUp)
router.post('/login', login)

export { router }