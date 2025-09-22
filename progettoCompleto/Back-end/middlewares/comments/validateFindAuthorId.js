import mongoose from "mongoose"
import Author from "../../models/Author.js"


export async function validateFindAuthorId(req, res, next) {
    try {
        const { autore } = req.body

        if (!mongoose.Types.ObjectId.isValid(autore)) {
            return res.status(400).json({ message: 'id autore non valido' })
        }

        const author = await Author.findById(autore)
        if (!author) {
            return res.status(404).json({ message: 'autore non trovato' })
        }
        next()
    } catch (err) {
        next(err)
    }

}