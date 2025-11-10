export const validationMiddleware = (schema: any) => (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send({error: error.details[0].message})
    }
    next()
}
