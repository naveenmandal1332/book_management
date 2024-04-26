import express from 'express';
const router = express.Router();
import { addBooks, updateBook } from '../controller/bookController.js';

router.route('/book').post(addBooks);
router.route('/book/:id').patch(updateBook);
// router.route('/logout').get(logout);

export default router;
