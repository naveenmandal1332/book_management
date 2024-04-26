import express from 'express';
const router = express.Router();
import { signup, signin, logout } from '../controller/userController.js';

router.route('/user/signup').post(signup);
router.route('/user/signin').post(signin);
router.route('/user/logout').get(logout);

export default router;
