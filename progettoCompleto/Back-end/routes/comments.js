import express from 'express'
import { validateObjectID } from '../middlewares/common/validateObjectId.js'
import { createComment, getAll, getSingleComment, removeCommet, updateComment } from '../controllers/comments.js'
import { findPost } from '../middlewares/common/findPost.js'
import { } from '../middlewares/comments/validateFindAuthorId.js'
import { validateCommentId } from '../middlewares/comments/validateCommentId.js'
import { sanitizeComment } from '../middlewares/comments/sanitizeComment.js'
import { validateRequest } from '../middlewares/common/validateRequest.js'
import { createCommentSchema, updateCommentSchema } from '../validations.js/comment.validator.js'

const commentRouter = express.Router()

commentRouter.get('/:id/comments', validateObjectID, findPost, getAll)

commentRouter.post('/:id/comments', validateObjectID, findPost, sanitizeComment, validateRequest(createCommentSchema), createComment)

commentRouter.get('/:id/comments/:commentId', validateObjectID, validateCommentId, findPost, getSingleComment)

commentRouter.put('/:id/comments/:commentId', validateObjectID, validateCommentId, findPost, sanitizeComment, validateRequest(updateCommentSchema), updateComment)

commentRouter.delete('/:id/comments/:commentId', validateObjectID, validateCommentId, findPost, removeCommet)


export default commentRouter