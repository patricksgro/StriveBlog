import mongoose from "mongoose"


export async function validateCommentId(req, res, next) {
    const { commentId } = req.params

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({ message: 'id commento non valido' })
    }
    next()
}