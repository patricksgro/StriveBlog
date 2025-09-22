
import Author from "../models/Author.js"

export async function getMe(req, res, next) {
    try {
        const author = await Author.findById(req.author._id).populate('posts');
        return res.status(200).json(author);
    } catch (err) {
        next(err)
    }
}

export async function getAll(req, res, next) {
    try {
        const { search } = req.query
        let filter = {}
        if (search) {
            filter = { nome: { $regex: search, $options: 'i' } }
        }
        const authors = await Author.find(filter).populate('posts')

        return res.status(200).json({
            results: authors.length,
            data: authors
        })
    } catch (err) {
        next(err)
    }

}


export async function get(req, res, next) {
    try {
        const { id } = req.params

        const author = await Author.findById(id).populate('posts')
        if (!author) {
            return res.status(404).json({ message: 'Autore non trovato' })
        }
        return res.status(200).json({
            data: author
        })
    } catch (err) {
        next(err)
    }
}


export async function edit(req, res, next) {
    try {
        const { id } = req.params

        //qui verificheremo se l'id passato e destrutturato coincide con quello del token ossia req.uthor.id ottenuto nella funzione verify per far modificare i dati solo all'utente loggato nel proprio profilo

        let { nome, cognome, email, dataDiNascita, avatar } = req.body

        const updatedAuthor = await Author.findByIdAndUpdate(id, {
            nome, cognome, email, dataDiNascita, avatar
        },
            {
                new: true
            }
        )
        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Autore non trovato' })
        }
        return res.status(200).json(updatedAuthor)
    } catch (err) {
        next(err)
    }
}


export async function updateAvatar(req, res, next) {
    try {
        const filePath = req.file.path
        const { id } = req.params

        const updateAvatar = await Author.findByIdAndUpdate(id, { avatar: filePath }, { new: true })  //passiamo id per recupero corretto, oggetto con campo da modificare e ciò che deve andarci, e ritorno modifica
        if (!updateAvatar) {
            return res.status(404).json({ message: 'Autore non trovato' })
        }

        res.status(200).json(updateAvatar)

    } catch (err) {
        next(err)
    }
}


export async function remove(req, res, next) {
    try {
        const { id } = req.params

        const deletedAuthor = await Author.findByIdAndDelete(id)
        if (!deletedAuthor) {
            return res.status(404).json({ message: 'Autore non trovato' })
        }
        res.status(200).json(deletedAuthor)
    } catch (err) {
        next(err)
    }
}