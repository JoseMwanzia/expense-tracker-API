import express from 'express'
const router = express.Router()
import { signUp }  from '../controllers/usersControllers.js'
import { login } from '../controllers/authServer.js'
import { signupSchema } from '../validations/usersValidations.js'
import { validationMiddleware } from '../middlewares/validationMiddleware.js'

router.post('/signup', validationMiddleware(signupSchema), signUp)
router.post('/login', login)

export { router }