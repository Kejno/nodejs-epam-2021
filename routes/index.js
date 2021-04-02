import { Router } from 'express';
import userRouter from './userRoutes';

const router = new Router();

router.use('/users', userRouter);

export default router;
