import express from 'express';
import userGroupController from '../controllers/userGroupController';
import { createUserGroupMiddleware, getAllUserGroupsMiddleware } from '../middleware/userGroupMiddleware';

const router = new express.Router();
const { createUserGroup, getUserGroups } = new userGroupController();

router.post('/', createUserGroupMiddleware, createUserGroup);
router.get('/', getAllUserGroupsMiddleware, getUserGroups);

export default router;
