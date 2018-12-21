import * as express from 'express';
import newsApi from './api/news';
const router = express.Router();
/**
 * Route for News
 */
router.use('/news', newsApi);

export default router;
