import { signJWT } from "../helpers/jwt.js"
import Author from "../models/Author.js"


export async function login(req, res, next) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Inserisci email e password' })
    }

    //cerchiamo se l'email esiste
    const userEmail = await Author.findOne({ email })

    //se esiste
    if (userEmail) {
        //se la password fornita coincede con quella della funzione sotto che si riferisce alla password del documento corrente (authorSchema) creiamo la firma
        if (await userEmail.comparePassword(password)) {
            const jwt = await signJWT({
                id: userEmail._id
            })
            return res.status(200).json({ message: 'token gerenato', jwt })
        }
    }
    console.log("Body ricevuto:", req.body)

    return res.status(400).json({ message: 'email o password errati' })
}



export async function register(req, res, next) {
    try {
        //destracturing di ciò che manda l'utente nel body
        let { nome, cognome, email, dataDiNascita, avatar, password } = req.body

        //creazione nuovo autore, salvo nel DB e lo rimando
        const newAuthor = new Author({ nome, cognome, email, role: 'user', dataDiNascita, avatar, password })
        const authorEmail = await Author.findOne({ email })
        if (authorEmail) {
            return res.status(400).json({ message: 'l\'email è già presente' })
        }
        const authorSaved = await newAuthor.save()

        const jwt = await signJWT({ id: authorSaved._id })

        return res.status(201).json({ message: 'Registrazione avvenuta con successo', jwt })

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email già presente (errore DB)' });
        }
        next(err)
    }
}