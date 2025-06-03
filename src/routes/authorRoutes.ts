import { Router } from 'express'
import { authorController } from '../controllers/authorController'

const router = Router()

router.post('/', authorController.createAuthor)
router.get('/', authorController.listAuthors)

export default router
