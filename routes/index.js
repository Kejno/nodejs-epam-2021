import { Router } from 'express';
import userRouter from './userRoutes';
import authRouter from './authRoutes';
import groupRouter from './groupRoutes';
import userGroupRouter from './userGroupRoutes';
import { loggerMiddleware } from '../middleware/loggerMiddleware';
import { checkToken } from '../middleware/authMiddleware';

const router = new Router();

router.use('/users', loggerMiddleware, checkToken, userRouter);
router.use('/login', loggerMiddleware, authRouter);
router.use('/groups', loggerMiddleware, checkToken, groupRouter);
router.use('/user-groups', loggerMiddleware, checkToken, userGroupRouter);

export default router;
