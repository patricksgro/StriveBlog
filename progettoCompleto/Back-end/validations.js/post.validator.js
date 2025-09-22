import Joi from "joi";

export const createPostSchema = Joi.object({
    titolo: Joi.string()
        .min(5)
        .max(45)
        .trim()
        .pattern(/^[a-zA-Z0-9àèéìòùÀÈÉÌÒÙ' -]+$/)
        .required()
        .messages({
            "string.base": "Il titolo deve essere una stringa",
            "string.empty": "Il titolo è obbligatorio",
            "any.required": "Il titolo è obbligatorio",
            "string.min": "Il titolo deve avere almeno 5 caratteri",
            "string.max": "Il titolo non può superare i 45 caratteri",
            "string.trim": "Il titolo non può contenere spazi all\'inizio o alla fine",
            "string.pattern.base": "Il titolo contiene caratteri non validi"
        }),
    descrizione: Joi.string()
        .min(20)
        .trim()
        .pattern(/^[a-zA-Z0-9àèéìòùÀÈÉÌÒÙ' -]+$/)
        .required()
        .messages({
            "string.base": "La descrizione deve essere una stringa",
            "string.empty": "La descrizione è obbligatoria",
            "any.required": "La descrizione è obbligatorio",
            "string.min": "La descrizione deve avere almeno 20 caratteri",
            "string.max": "La descrizione non può superare i 500 caratteri",
            "string.trim": "La descrizione non può contenere spazi all\'inizio o alla fine",
            "string.pattern.base": "La descrizione contiene caratteri non validi"
        }),
    readTime: Joi.object({
        value: Joi.number()
            .min(1)
            .required()
            .messages({
                "number.base": "Il valore di lettura stimata deve essere un numero",
                "number.min": "Il valore di lettura stimata deve essere almeno 1",
                "any.required": "Il valore di lettura stimata è obbligatorio"
            }),
        unit: Joi.string()
            .valid("min", "hour", "day")
            .trim()
            .required()
            .messages({
                "any.only": "L'unità di readTime deve essere una tra: min, hour, day",
                "string.base": "L'unità di readTime deve essere una stringa",
                "any.required": "L'unità di readTime è obbligatoria",
                "string.trim": "L'unità di readTime non può contenere spazi all\'inizio o alla fine"
            })
    }).required()
        .messages({
            "string.empty": "Il campo readTime è obbligatorio",
            "any.required": "Il campo readTime è obbligatorio"
        }),
    categoria: Joi.string()
        .max(18)
        .trim()
        .pattern(/^[a-zA-Z0-9àèéìòùÀÈÉÌÒÙ'.,!?;:()\- ]+$/)
        .required()
        .messages({
            "string.base": "La categoria deve essere una stringa",
            "string.empty": "La categoria è obbligatoria",
            "any.required": "La categoria è obbligatoria",
            "string.max": "La categoria non può superare i 18 caratteri",
            "string.trim": "La categoria non può contenere spazi all\'inizio o alla fine",
            "string.pattern.base": "La categoria contiene caratteri non validi"
        }),
    cover: Joi.string()
        .uri()
        .trim()
        .pattern(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
        .messages({
            "string.uri": "La cover deve essere un URL valido",
            "string.pattern.base": "La cover deve avere un'estensione immagine valida",
            "string.trim": "La cover non può contenere spazi all\'inizio o alla fine"
        }),

})

//VERSIONE SEMPLIFICATA CON FORK DI JOI, NO PERCHE FORK MI FA PASSARE TUTTO ANCHE CI SON OERRORI 400
export const updatePostSchema = Joi.object({
    titolo: createPostSchema.extract("titolo"),
    descrizione: createPostSchema.extract("descrizione"),
    readTime: createPostSchema.extract("readTime"),
    categoria: createPostSchema.extract("categoria"),
    cover: createPostSchema.extract("cover")
})