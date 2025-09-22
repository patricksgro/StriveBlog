import express from 'express'
import { getAll, get, edit, remove, getMe, updateAvatar } from '../controllers/authors.js'
import { validateRequest } from '../middlewares/common/validateRequest.js'
import { updateAuthorSchema } from '../validations.js/author.validator.js'
import { sanitizeRequest } from '../middlewares/common/sanitizeRequest.js'
import { validateSearch } from '../middlewares/common/validateSearch.js'
import { validateObjectID } from '../middlewares/common/validateObjectId.js'
import uploadCloudinary from '../middlewares/common/uploadColudinary.js'





const authorRouter = express.Router()

authorRouter.get('/me', /*validazioni da mettere?*/ getMe)

authorRouter.get('/', validateSearch('search'), getAll)

authorRouter.get('/:id', validateObjectID, get)

authorRouter.put('/:id', validateObjectID, sanitizeRequest, validateRequest(updateAuthorSchema), edit)

authorRouter.patch('/:id/avatar', validateObjectID, validateRequest(updateAuthorSchema), uploadCloudinary.single('avatar'), updateAvatar)

authorRouter.delete('/:id', validateObjectID, remove)

export default authorRouter