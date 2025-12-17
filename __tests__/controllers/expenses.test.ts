jest.mock('../../entities/Users')
jest.mock('../../entities/Expenses')
jest.mock('../../index', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}))

import { createExpenses } from '../../controllers/expenseController'
import { Users } from '../../entities/Users'
import { Expenses } from '../../entities/Expenses'
import { mockRequest, mockResponse } from 'jest-mock-req-res'
import { testDataSource } from '../ormconfig'

// // Setup for database
beforeAll(async () => {
  if (!testDataSource.isInitialized) {
    await testDataSource.initialize()
  }
})

// Teardown for database
afterAll(async () => {
  if (testDataSource.isInitialized) {
    await testDataSource.destroy()
  }
})


describe('createExpenses', () => {
  let req: any
  let res: any

  beforeEach(() => {
    req = mockRequest({
      user: { id: '1' },
      body: {
        amount: 500,
        category: 'Other',
      },
    })

    res = mockResponse()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create an expense and return 200', async () => {

    // mock user found
    ;(Users.findOne as jest.Mock).mockResolvedValue({
      id: 1,
    })

    const saveMock = jest.fn().mockResolvedValue(true)

    ;(Expenses.create as jest.Mock).mockReturnValue({
      id: 10,
      amount: 500,
      category: 'Other',
      user_id: 1,
      save: saveMock,
    })

    await createExpenses(req, res)

    expect(Users.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    })

    expect(Expenses.create).toHaveBeenCalledWith({
      amount: 500,
      category: 'Other',
      user_id: 1,
    })

    expect(saveMock).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalled()
  })

  it('should return 400 if user is not found', async () => {
    ;(Users.findOne as jest.Mock).mockResolvedValue(null)

    await createExpenses(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith('User not found. Login Again')
  })

  it('should handle errors and return 400', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    ;(Users.findOne as jest.Mock).mockRejectedValue(
      new Error('DB error')
    )

    await createExpenses(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith('DB error')
  })
})
