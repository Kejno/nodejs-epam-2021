import { cyan, red, green } from 'colors';
import { ConsoleLogger } from '../utils/logger';
import ApiError from '../error/ApiError';
import { createUserService, getUsersService, getUserByIdService, updateUserService, deleteUserService } from '../services/userService';

export default class UserController {
    async createUser(req, res) {
        try {
            ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.body)}`);
            const createdUser = await createUserService(req.body);
            if (createdUser.errorCode === 409) {
                ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${createdUser.message}`);
                return res.status(409).json(createdUser);
            }

            res.json(createdUser);
        } catch (error) {
            ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }

    async getUsers(req, res) {
        try {
            const { execTime, data: { rows, count } } = await getUsersService(req.query);
            ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.query)}, ${green('Execution time:')} ${execTime} ms`);
            res.json({ users: rows, count });
        } catch (error) {
            ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }

    async getUserById(req, res) {
        try {
            ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.params)}`);
            const { id } = req.params;
            const currentUser = await getUserByIdService(id);

            if (currentUser.status === 400) {
                ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${currentUser.message}`);
                return res.status(400).json(currentUser);
            }

            res.json(currentUser);
        } catch (error) {
            ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }

    async updateUser(req, res) {
        try {
            ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.body)}`);
            const { id } = req.params;
            const updatedUser = await updateUserService(id, req.body);
            if (updatedUser.status === 400) {
                ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${updatedUser.message}`);
                return res.status(400).json(updatedUser);
            }
            res.json(updatedUser);
        } catch (error) {
            ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }

    async deleteUser(req, res) {
        try {
            ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.params)}`);
            const { id } = req.params;
            const deletedUser = await deleteUserService(id);
            if (!deletedUser[0]) {
                ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: user not found`);
                return res.status(400).json(ApiError.badRequest('user not found'));
            }
            res.json({ message: 'successfully deleted' });
        } catch (error) {
            ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }
}

