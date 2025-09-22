import Joi from "joi";


//CREATE COMMENT
export const createCommentSchema = Joi.object({
    text: Joi.string()
        .required()
        .empty('')
        .min(1)
        .max(1000)
        .messages({
            "string.base": "Il commento deve essere una stringa",
            "string.empty": "Il commento non può essere vuoto",
            "any.required": "Il commento è obbligatorio",
            "string.min": "Il nome deve avere almeno 1 caratteri",
            "string.max": "Il nome non può superare i 1000 caratteri",
        })
})


//UPDATE AUTHOR
export const updateCommentSchema = Joi.object({
    text: createCommentSchema.extract("text"),
});