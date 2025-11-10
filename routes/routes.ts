import express from 'express'
const router = express.Router()
import { signUp }  from '../controllers/usersControllers'
import { expenses, createExpenses, deleteExpense, updateExpense } from '../controllers/expenseController'
import { login, refresh } from '../controllers/authServer'
import { signupSchema, loginSchema } from '../validations/usersValidations'
import { expenseSchema } from '../validations/expensesValidation'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { authenticateToken } from '../middlewares/auth'

router.post('/signup', validationMiddleware(signupSchema), signUp)
router.post('/login', validationMiddleware(loginSchema), login)
router.get('/expenses', authenticateToken, expenses)
router.post('/expense', validationMiddleware(expenseSchema), authenticateToken, createExpenses)
router.post('/expense/:id', authenticateToken, deleteExpense)
router.put('/expense/:id', authenticateToken, updateExpense)

export { router }