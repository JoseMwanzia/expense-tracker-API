import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { refresh } from '../controllers/authServer.js';
const { ACCESS_TOKEN } = process.env;

export async function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorisation']
    const token = authHeader && authHeader.split(' ')[1];
    const refreshToken = authHeader && authHeader.split(' ')[2];

    if (token == null) return  res.status(401).send({ message: 'Unauthorised!'});
    
    try {
        jwt.verify(token, ACCESS_TOKEN, async (err, data) => {  

            if (err && err.message == 'jwt expired') {
                console.warn('Access token expired. Attempting to refresh page...')
                if (refreshToken == null) return  res.status(401).send({ message: 'Provide refreshToken in the authorisation headers!'});
                const cachedData = await refresh(refreshToken)
                if (cachedData == null) return res.status(401).send({message: 'PLEASE LOG IN AGAIN!'})

                req.user = JSON.parse(cachedData)
                
                next()
                return;
            }
            req.user = data
            next()
        }
    )
    } catch (error) {
        console.log(error)
        return res.status(401).send('Invalid or expired access token!')
    }
}
