import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { refresh } from '../controllers/authServer';
import { NextFunction, Request, Response } from 'express';
const { ACCESS_TOKEN } = process.env;

interface AuthenticatedRequest extends Request{
    user?: string | JwtPayload
}

export async function authenticateToken (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorisation']
    const token = (Array.isArray(authHeader) ? authHeader[0] : authHeader)?.split(" ")[1];
    const refreshToken = (Array.isArray(authHeader) ? authHeader[0] : authHeader)?.split(" ")[2];

    if (token == null) return res.status(401).send({ message: 'Unauthorised!'});
    
    try {
        return jwt.verify(token, ACCESS_TOKEN!, async (err, data) => {  

            if (err && err.message == 'jwt expired') {
                console.warn('Access token expired. Attempting to refresh page...')
                if (refreshToken == null) return  res.status(401).send({ message: 'Provide refreshToken in the authorisation headers!'});
                const cachedData = await refresh(refreshToken)
                if (cachedData == null) return res.status(401).send({message: 'PLEASE LOG IN AGAIN!'})

                req.user = JSON.parse(cachedData)
                return next()
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
