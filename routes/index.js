import { Router } from 'express';
import userRouter from './userRoutes';
import groupRouter from './groupRoutes';
import userGroupRouter from './userGroupRoutes';

const router = new Router();

router.use('/users', userRouter);
router.use('/groups', groupRouter);
router.use('/user-groups', userGroupRouter);

export default router;
