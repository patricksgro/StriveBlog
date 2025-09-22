import express from 'express'
import { create, edit, getAll, getPost, remove, updateCover } from '../controllers/posts.js';
import { validateSearch } from '../middlewares/common/validateSearch.js';
import { sanitizeRequest } from '../middlewares/common/sanitizeRequest.js';
import { validateRequest } from '../middlewares/common/validateRequest.js';
import { createPostSchema, updatePostSchema } from '../validations.js/post.validator.js';
import { validateObjectID } from '../middlewares/common/validateObjectId.js';
import uploadCloudinary from '../middlewares/common/uploadColudinary.js';
import { findPost } from '../middlewares/common/findPost.js';


const postsRouter = express.Router()

postsRouter.get('/', validateSearch('search'), getAll)

postsRouter.post('/', sanitizeRequest, validateRequest(createPostSchema), create)

postsRouter.get('/:id', validateObjectID, findPost, getPost)

postsRouter.put('/:id', validateObjectID, sanitizeRequest, validateRequest(updatePostSchema), edit)

postsRouter.patch('/:id/cover', validateObjectID, validateRequest(updatePostSchema), uploadCloudinary.single('cover'), updateCover)

postsRouter.delete('/:id', validateObjectID, remove)

export default postsRouter;