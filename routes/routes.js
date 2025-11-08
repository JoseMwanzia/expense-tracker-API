import express from 'express'
const router = express.Router()
import { signUp }  from '../controllers/usersControllers.js'
import { expenses, createExpenses, deleteExpense, updateExpense } from '../controllers/expenseController.js'
import { login, refresh } from '../controllers/authServer.js'
import { signupSchema, loginSchema } from '../validations/usersValidations.js'
import { expenseSchema } from '../validations/expensesValidation.js'
import { validationMiddleware } from '../middlewares/validationMiddleware.js'
import { authenticateToken } from '../middlewares/auth.js'

router.post('/signup', validationMiddleware(signupSchema), signUp)
router.post('/login', validationMiddleware(loginSchema), login)
router.get('/expenses', authenticateToken, expenses)
router.post('/expense', validationMiddleware(expenseSchema), authenticateToken, createExpenses)
router.post('/expense/:id', authenticateToken, deleteExpense)
router.put('/expense/:id', authenticateToken, updateExpense)

export { router }