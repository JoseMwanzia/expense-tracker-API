import express from 'express'
const router = express.Router()
import { signUp }  from '../controllers/usersControllers.js'
import { login } from '../controllers/authServer.js'

router.post('/signup', signUp)
router.post('/login', login)

export { router }