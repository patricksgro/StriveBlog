

//teniamo a mente che comments(proprietà) vive dentro Post(Model) quindi quanso recuperiamo dei dati dai commenti dobbbiamo recuperare anche i dati e validarli del padre (Post)
export async function getAll(req, res, next) {
    try {
        //middleware validateObjectId per validare id req.params
        // middleware ricerca esistenza post, se ok passa post al resto della funzione con req.post = post (vedi middleware)
        //ritorno se tutto ok req.post.comments
        res.status(200).json(req.post.comments)
    }
    catch (err) {
        next(err)
    }
}


export async function createComment(req, res, next) {
    try {
        //middleware validateObjectId per validare id req.params

        //destrutturiamo text e autore che arrivano direttamente da comments
        const { text } = req.body

        //validazione sia id autore sia ricerca esistenza autore nello stesso middleware

        // middleware ricerca esistenza post, se ok passa post al resto della funzione con req.post = post (vedi middleware)

        //aggiunta commento, ora che post esiste solo nel middleware, richiamo req.post..
        const newComment = { text, autore: req.author._id }
        req.post.comments.push(newComment)

        await req.post.save()

        res.status(201).json(req.post.comments[req.post.comments.length - 1])

    } catch (err) {
        next(err)
    }
}


export async function getSingleComment(req, res, next) {
    try {
        const { commentId } = req.params
        //middleware validateObjectId per validare id req.params

        //id del commento validato (middleware)

        // middleware ricerca esistenza post, se ok passa post al resto della funzione con req.post = post (vedi middleware)

        // essendo embeddato comments, usiamo normale js e vediamo se l'id del commento corrisponde all'id passato nella req
        const comment = req.post.comments.find(comment => comment._id == commentId)
        if (!comment) {
            res.status(404).json({ message: 'commento non trovato' })
        }

        res.status(200).json(comment)
    } catch (err) {
        next(err)
    }
}


export async function updateComment(req, res, next) {
    try {
        const { commentId } = req.params
        //middleware validateObjectId per validare id req.params

        const { text } = req.body

        //validazione sia id autore sia ricerca esistenza autore nello stesso middleware

        //id del commnto validato (middleware)

        // middleware ricerca esistenza post, se ok passa post al resto della funzione con req.post = post (vedi middleware)

        // essendo embeddato comments, usiamo normale js e vediamo se l'id del commento corrisponde all'id passato nella req
        let comment = req.post.comments.find(comment => comment._id == commentId)
        if (!comment) {
            return res.status(404).json({ message: 'commento non trovato' })
        }
        console.log(comment)

        comment.text = text

        await req.post.save()

        res.status(200).json(comment)
    } catch (err) {
        next(err)
    }
}


export async function removeCommet(req, res, next) {
    try {
        //middleware validateObjectId per validare id req.params

        const { commentId } = req.params

        //id del commnto validato (middleware)

        // middleware ricerca esistenza post, se ok passa post al resto della funzione con req.post = post (vedi middleware)

        // essendo embeddato comments, usiamo normale js e vediamo se l'id del commento corrisponde all'id passato nella req
        const comment = req.post.comments.find(comment => comment._id == commentId)
        if (!comment) {
            res.status(404).json({ message: 'commento non trovato' })
        }

        //ricreiamo l'array dei commenti lasciando fuori quello che corrisponde all'id del commento passato
        req.post.comments = req.post.comments.filter(comment => comment._id != commentId)

        //salviamo il post aggiornato
        await req.post.save()

        //ritorniamo il commento eliminato
        res.status(200).json(comment)

    } catch (err) {
        next(err)
    }
}