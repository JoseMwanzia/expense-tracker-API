import Joi from "joi";

export const expenseSchema = Joi.object({
    amount: Joi.number().required()
})