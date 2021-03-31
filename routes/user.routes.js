const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

const { createUser, getUsers, getUserById, updateUser } = userController;

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', updateUser);
router.put('/users/:id', updateUser);

module.exports = router;
