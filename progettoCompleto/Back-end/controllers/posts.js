import mailer from "../helpers/mailer.js"
import Post from "../models/Post.js"


export async function getAll(req, res, next) {
    try {
        const { search } = req.query

        let filter = {}
        if (search) {
            filter = { titolo: { $regex: search, $options: 'i' } }
        }
        const posts = await Post.find(filter).populate('autore')
        return res.status(200).json({
            results: posts.length,
            data: posts
        })

    } catch (err) {
        next(err)
    }
}


export async function create(req, res, next) {
    try {
        let { titolo, descrizione, categoria, readTime } = req.body

        const newPosts = new Post({ titolo, descrizione, autore: req.author._id, categoria, readTime })
        console.log(req.author)
        const postSaved = await newPosts.save()
        //l 'altra tecina è con la funzione create in un rigo solo senza la save
        return res.status(201).json(postSaved)

    } catch (err) {
        next(err)
    }
}


export async function getPost(req, res, next) {
    try {
        //middleware verifica id post
        return res.status(200).json(req.post)
    } catch (err) {
        next(err)
    }
}

export async function edit(req, res, next) {
    try {
        const { id } = req.params

        let { titolo, descrizione, categoria, readTime, cover } = req.body

        const updatePost = await Post.findByIdAndUpdate(id, {
            titolo, descrizione, categoria, readTime, cover
        },
            {
                new: true
            }
        )
        if (!updatePost) {
            return res.status(404).json({ message: 'Post non trovato' })
        }
        return res.status(200).json(updatePost)
    } catch (err) {
        next(err)
    }
}


export async function updateCover(req, res, next) {
    try {
        const filePath = req.file.path
        const { id } = req.params

        const updateCover = await Post.findByIdAndUpdate(id, { cover: filePath }, { new: true })  //passiamo id per recupero corretto, oggetto con campo da modificare e ciò che deve andarci, e ritorno modifica
        if (!updateCover) {
            return res.status(404).json({ message: 'Post non trovato' })
        }

        res.status(200).json(updateCover)

        //invio email
        await mailer.sendMail({
            from: '"Social App" <noreply@socialapp.com>', //da vedere per i controlli
            to: "qualcuno@esempio.com",
            subject: "Test Mailtrap",
            text: "Ciao, questa è una mail di test",
            html: "<b>Ciao, la foto è stata aggiornata</b>"
        })

    } catch (err) {
        next(err)
    }
}


export async function remove(req, res, next) {
    try {
        const { id } = req.params

        const deletedPost = await Post.findByIdAndDelete(id)
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post non trovato' })
        }
        return res.status(200).json(deletedPost)

    } catch (err) {
        next(err)
    }
}