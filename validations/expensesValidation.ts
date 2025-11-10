import Joi from "joi";

export const expenseSchema = Joi.object({
    amount: Joi.number().required(),
    category: Joi.string().required().valid(
        'Groceries',
        'Leisure',
        'Electronics',
        'Utilities',
        'Clothing',
        'Health',
        'Others'
    )
})