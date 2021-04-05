import express from 'express';
import userController from '../controllers/userController';
import { getAllUsersMiddleware, createUserMiddleware, updateUserMiddleware } from '../middleware/userMiddleware';

const router = new express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = new userController();

router.post('/', createUserMiddleware, createUser);
router.get('/', getAllUsersMiddleware, getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.put('/:id', updateUserMiddleware, updateUser);

export default router;
