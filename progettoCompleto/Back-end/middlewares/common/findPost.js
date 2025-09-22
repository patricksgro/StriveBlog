import Post from "../../models/Post.js";


export async function findPost(req, res, next) {
    try {
        const { id } = req.params
        // aggiungiamo il populate ma non di 'autore' perche essendo il middleware dei commenti non ci serve avere tutti i dati dell'autore del post ma l'autore dei commenti va bene
        const post = await Post.findById(id).populate('comments.autore')
        if (!post) {
            return res.status(404).json({ message: 'Post non trovato' })
        }
        req.post = post
        next()
    } catch (err) {
        next(err)
    }
}