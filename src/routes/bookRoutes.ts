import { Router } from 'express'
import { bookController } from '../controllers/bookController'

const router = Router()

router.post('/', bookController.createBook)
router.get('/', bookController.listBooks)
router.get('/average', bookController.getAveragePagesPerChapter)

export default router
