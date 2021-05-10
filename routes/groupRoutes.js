import express from 'express';
import groupController from '../controllers/groupController';
import { createGroupMiddleware, updateGroupMiddleware, deleteGroupMiddleware, getAllGroupsMiddleware, getGroupByIdMiddleware } from '../middleware/groupMiddleware';

const router = new express.Router();
const { createGroup, getGroups, getGroupById, updateGroup, deleteGroup } = new groupController();

router.post('/', createGroupMiddleware, createGroup);
router.get('/', getAllGroupsMiddleware, getGroups);
router.get('/:id', getGroupByIdMiddleware, getGroupById);
router.delete('/:id', deleteGroupMiddleware, deleteGroup);
router.put('/:id', updateGroupMiddleware, updateGroup);

export default router;
