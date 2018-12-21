import * as express from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import newsCtrl from '../../controllers/news';

const router = express.Router();

router.get('/', asyncHandler(newsCtrl.getNews));
router.put('/', asyncHandler(newsCtrl.createNews));
router.put('/:id', asyncHandler(newsCtrl.editNews))
router.delete('/:id', asyncHandler(newsCtrl.deleteNews));
router.put('/test', asyncHandler(newsCtrl.editNews));

export default router;

