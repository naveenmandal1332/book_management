import express from 'express';
const router = express.Router();
import {
  addBooks,
  updateBook,
  deleteBooks,
  fetchBooksByFilter,
} from '../controller/bookController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

router.route('/book').post(isLoggedIn, addBooks);
router.route('/book/:id').patch(isLoggedIn, updateBook);
router.route('/book/:id').delete(isLoggedIn, deleteBooks);
router.route('/book/fetch').post(isLoggedIn, fetchBooksByFilter);

// router.route('/logout').get(logout);

export default router;
