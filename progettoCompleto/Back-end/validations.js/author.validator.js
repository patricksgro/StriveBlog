import Joi from "joi";


//CREATE AUTHOR
export const createAuthorSchema = Joi.object({
    nome: Joi.string()
        .min(2)
        .max(35)
        .pattern(/^[a-zA-Z0-9àèéìòùÀÈÉÌÒÙ' -]+$/)
        .required()
        .messages({
            "string.base": "Il nome deve essere una stringa",
            "string.empty": "Il nome è obbligatorio",
            "any.required": "Il nome è obbligatorio",
            "string.min": "Il nome deve avere almeno 2 caratteri",
            "string.max": "Il nome non può superare i 35 caratteri",
            "string.pattern.base": "Il nome contiene caratteri non validi"
        }),
    cognome: Joi.string()
        .min(2)
        .max(35)
        .pattern(/^[a-zA-Z0-9àèéìòùÀÈÉÌÒÙ' -]+$/)
        .required()
        .messages({
            "string.base": "Il cognome deve essere una stringa",
            "string.empty": "Il cognome è obbligatorio",
            "any.required": "Il cognome è obbligatorio",
            "string.min": "Il cognome deve avere almeno 2 caratteri",
            "string.max": "Il cognome non può superare i 35 caratteri",
            "string.pattern.base": "Il cognome contiene caratteri non validi"
        }),
    email: Joi.string()
        .pattern(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,7}$/)
        .required()
        .lowercase()
        .messages({
            "string.email": "Email non valida",
            "string.empty": "L'email è obbligatoria",
            "any.required": "L\'email è obbligatoria",
            "string.pattern.base": "L'email deve avere un dominio valido (es. .com, .it, max 7 caratteri)."
        }),
    dataDiNascita: Joi.date()
        .less('now')
        .greater('1920-01-01')   // da rivedere il formato, 12 lo prende ancora
        .required()
        .messages({
            "date.base": "La data di nascita deve essere una data valida",
            "date.less": "La data di nascita non può essere futura",
            "date.greater": "La data di nascita non può essere precedente al 1920",
            "any.required": "La data di nascita è obbligatoria"
        }),
    avatar: Joi.string()
        .uri()
        .pattern(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
        .messages({
            "string.uri": "L'avatar deve essere un URL valido",
            "string.pattern.base": "L'avatar deve avere un'estensione immagine valida"
        }),
    role: Joi.string()
        .valid('admin', 'user')
        .forbidden()
        .messages({
            "string.base": "Il ruolo deve essere una stringa",
            "any.only": "I campi concessi sono solo admin e user",
            "any.unknown": "Il campo role non può essere inviato"
        }),
    password: Joi.string()
        .min(6)
        .required(),
    // lastPasswordChangedAt: Joi.date()
});


//UPDATE AUTHOR
export const updateAuthorSchema = Joi.object({
    nome: createAuthorSchema.extract("nome").optional(),
    cognome: createAuthorSchema.extract("cognome").optional(),
    email: createAuthorSchema.extract("email").optional(),
    dataDiNascita: createAuthorSchema.extract("dataDiNascita").optional(),
    avatar: createAuthorSchema.extract("avatar").optional()
});