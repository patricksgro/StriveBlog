import { verifyJWT } from "../../helpers/jwt.js"
import Author from "../../models/Author.js"


export async function authVerify(req, res, next) {
    const headerAuth = req.headers.authorization || ''

    const token = headerAuth.replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ message: 'Token mancante' })
    }

    try {
        //questo ci restituisce un oggetto avente payload (id utente), data creazione e scadenza token e chiave segreta
        const payload = verifyJWT(token)
        //dopo verifica token vediamo se con l id che abbiamo messo nel payload l'utente esiste nel db
        const author = await Author.findById(payload.id)
        if (!author) {
            return res.status(401).json({ message: 'Utente non valido' })
        }

        //verifica ulteriore, se la password non è stata cambiata magari a seguito del furto del token e l'utente vuole proteggersi
        // if (author.lastPasswordChangedAt && author.lastPasswordChangedAt.getTime() > payload.iat * 1000) {
        //     res.status(401).json({ message: 'Token non valido, la password è stata cambiata' })
        // }

        req.author = author
        next()
    } catch (err) {
        res.status(401).json({ message: 'token scaduto o non valido' })
    }
}