import { Router } from 'express';
import userRouter from './userRoutes';
import groupRouter from './groupRoutes';

const router = new Router();

router.use('/users', userRouter);
router.use('/groups', groupRouter);

export default router;
