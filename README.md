# Expense-tracker-API

This is an API for an expense tracker application. This API allows users to create, read, update, and delete expenses. Users are able to sign up and log in to the application. Each user has their own set of expenses.

## Table Of contents
1. [Description](#description)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Running the Project](#running-the-project)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)

## Features

Here are the features implemented in the Expense Tracker API:

- Sign up as a new user.
- Generate and validate JWTs for handling authentication and user session.
- List and filter your past expenses. We have the following filters:
    - Past week
    - Past month
    - Last 3 months
- Custom (to specify a start and end date of your choosing).
- Add a new expense
- Remove existing expenses
- Update existing expenses

## Tech Stack

This project is built with:
- Node.js with an express backend
- TypeScript for typesafety
- Dotenv — Environment variable management
- Jest — Testing framework
- argon2 for password protection and encryption
- Redis for user caching.
- Joi for user input validation
- Jsonwebtoken to protect the endpoints and to identify the requester.
- postgres relational database
- TypeORM as an object-relational-mapper


## Project Structure
```bash
expense-tracker-API
    |-__tests__
        |-controllers
            |-controllers.test.ts
            |-expenses.test.ts
    |-.gtihub/workflows
        |-tests.yml
    |-config
        |-redisConfig.ts
    |controllers
        |-authServer.ts
        |-expenseController.ts
        |-jwtGenerators.ts
        |-usersControllers.ts
    |-entities
        |-Expenses.ts
        |-Users.ts
    |-middlewares
        |-utils
            |-getDateRange.ts
        |-auth.ts
        |-validationMiddleware.ts
    |-routes
        |-routes.ts
    |-validations
        |-expensesValidations.ts
        |-usersValidations.ts
    |-.gitignore
    |-index.ts
    |-jest.config.json
    |-package-lock.json
    |-package.json
    |-README.md
    |-tsconfig.json
```

## Installation

Clone the project:
``` bash 
git clone <repo-url>
cd project 
```
Install dependencies by running:
``` bash
npm install 
```

## Environment Variables

Create a .env file in the project root:
``` bash
- PORT=<your port number>
- TYPE=<your DB type for TypeORM>
- USERNAME=<youre DB username>
- HOST=<your DB host>
- DB_PORT=<your DB Port>
- DATABASE=<your DB name>
- DB_PASSWORD= <DB Password>
- ACCESS_TOKEN = <JWT aacesToken>
- REFRESH_TOKEN=<JWT refresh token>
- ACCESS_TOKEN_EXPIRES=<Expiry time>
- REFRESH_TOKEN_EXPIRES=<refrsh token exoires>
- REDIS_URL=<redis URL>
```
This value will automatically load because dotenv/config is required at runtime.

## Running the Project

To start the project in development mode run:

``
npm run dev
``

which runs the app using nodemon.

In production run:

``
npm install
``
to install the required dependecies.

``
npm run build
``

this builds the project to be production ready, compiles the project to the dist folder.
From there run``
npm start
``to start your app.

Once logged in, set a header with the authorisation key and with the following value formatt
``` authorisation <your generated token> <your refresh token> ```
to get your responses, in both development and production.

Copy the link to utilize the production API https://expense-tracker-api-ypqw.onrender.com [.]()

## API Endpoints

A table of all routes:

| Method    | route |  Description  |
| -------- | ------- | -------      |
| POST  | /signup | New users signup|
| POST | /login | Users login |
|  GET   | /expenses | Get all expenses from a particular user |
|  POST   | /expense | A user can create an expense |
|  DELETE   | /expense/:id | A user can delete an expense |
|  PUT   | /expense/:id | A user can update an expense |

## Contributing

Contributions are welcome!
1.  Fork the repository
2. Create a new branch:
`` git checkout -b feature/my-feature`` 
3. Make your changes
4. Run tests to ensure everything passes:
``npm test``
5. Commit and push:
``git push origin feature/my-feature``
6. Create a Pull Request.

Please ensure your code follows the existing coding style and structure.
