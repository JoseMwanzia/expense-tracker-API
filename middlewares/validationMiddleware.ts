import { Request, Response, NextFunction } from "express"

export const validationMiddleware = (schema: { validate: (body: any) => { error?: { details: { message: string }[] } } }) => 
    (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send({error: error.details[0].message})
    }
    return next()
}
