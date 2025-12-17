import { testDataSource } from "../ormconfig"
import { mockRequest, mockResponse } from 'jest-mock-req-res'
import { signUp } from "../../controllers/usersControllers"

// Setup for database
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

describe('SignUp controller', () => {
    test('creates a user object', async () => {
        const req = mockRequest({body: {name: 'Alice', email: 'alice@gmail.com', password: 'alice1234'}})
        const res = mockResponse()

        await signUp(req, res)
        expect(req.body).toEqual(expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            password: expect.any(String)
        }))
    
        expect(res.status).toHaveBeenCalledWith(200)

    })

    test('sends data as a response', async () => {
        // expect.assertions(1)

        const req = mockRequest({body: {name: 'Kim', email: 'kim@email.com', password: 'kim1234'}})
        const res = mockResponse()
        
        try {
            await signUp(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                name: expect.any(String),
                email: expect.any(String),
                password: expect.any(String),
                id: expect.any(Number),
                updated_at: expect.any(Date),
                created_at: expect.any(Date)
            }))
        } catch (error) {
            expect(error).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.send).toHaveBeenCalledWith(error)
        }

    })

    // test('make sure .create() and .save() are alled', async () => {
    //     const req = mockRequest({body: {
    //         name: expect.any(String),
    //         email: expect.any(String),
    //         password: expect.any(String),
    //     }})
    //     const res = mockResponse()

    //    // Mocking Users.create()
    //     const fakeUser = {
    //         ...req.body,
    //         save: jest.fn().mockResolvedValue(true)
    //     };
    //     jest.spyOn(Users, 'create').mockReturnValue(req.body);
        
        
    //     await signUp(req, res);

    //     // assert create() was called
    //     expect(Users.create).toHaveBeenCalledTimes(1);

    //     // assert save() was called
    //     expect(fakeUser.save).toHaveBeenCalled();

    //     // assert res.send was called correctly
    //     expect(res.send).toHaveBeenCalledWith(fakeUser);
    // })
})

