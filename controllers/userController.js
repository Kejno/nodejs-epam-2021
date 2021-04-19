import ApiError from '../error/ApiError';
import { createUserService, getUsersService, getUserByIdService, updateUserService, deleteUserService } from '../services/userService';

export default class UserController {
    async createUser(req, res) {
        const createdUser = await createUserService(req.body);

        if (createdUser.errorCode === 409) {
            return res.status(409).json(createdUser);
        }

        res.json(createdUser);
    }

    async getUsers(req, res) {
        const { rows, count } = await getUsersService(req.query);

        res.json({ users: rows, count });
    }

    async getUserById(req, res) {
        const { id } = req.params;

        const currentUser = await getUserByIdService(id);

        if (currentUser.status === 400) {
            return res.status(400).json(currentUser);
        }

        res.json(currentUser);
    }

    async updateUser(req, res) {
        const { id } = req.params;

        const updatedUser = await updateUserService(id, req.body);
        if (updatedUser.status === 400) {
            return res.status(400).json(updatedUser);
        }
        res.json(updatedUser);
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        const deletedUser = await deleteUserService(id);

        if (!deletedUser[0]) {
            return res.status(400).json(ApiError.badRequest('user not found'));
        }

        res.json({ message: 'successfully deleted' });
    }
}

