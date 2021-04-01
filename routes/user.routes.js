const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const { getAllUsersMiddleware, createUserMiddleware, updateUserMiddleware } = require('../middleware/userMiddleware');

const { createUser, getUsers, getUserById, updateUser, deleteUser } = userController;

router.post('/users', createUserMiddleware, createUser);
router.get('/users', getAllUsersMiddleware, getUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUserMiddleware, updateUser);

module.exports = router;
