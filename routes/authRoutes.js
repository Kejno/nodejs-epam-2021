import express from 'express';
import authController from '../controllers/authController';

const router = new express.Router();
const { authUser } = new authController();

router.post('/', authUser);

export default router;
