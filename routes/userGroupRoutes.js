import express from 'express';
import userGroupController from '../controllers/userGroupController';
import { createUserGroupMiddleware } from '../middleware/userGroupMiddleware';

const router = new express.Router();
const { createUserGroup, getUserGroups } = new userGroupController();

router.post('/', createUserGroupMiddleware, createUserGroup);
router.get('/', getUserGroups);

export default router;
