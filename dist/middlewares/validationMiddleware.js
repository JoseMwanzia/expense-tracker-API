"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const validationMiddleware = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    return next();
};
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validationMiddleware.js.map