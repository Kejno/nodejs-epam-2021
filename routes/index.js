import { Router } from 'express';
import userRouter from './userRoutes';
import groupRouter from './groupRoutes';
import userGroupRouter from './userGroupRoutes';
import { loggerMiddleware } from '../middleware/loggerMiddleware';

const router = new Router();

router.use('/users', loggerMiddleware, userRouter);
router.use('/groups', loggerMiddleware, groupRouter);
router.use('/user-groups', loggerMiddleware, userGroupRouter);

export default router;
