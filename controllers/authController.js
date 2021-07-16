import { red } from 'colors';
import { ConsoleLogger } from '../utils/logger';
import { authUserService } from '../services/authService';

export default class UserController {
    async authUser(req, res) {
        try {
            const auth = await authUserService(req.body);
            res.json(auth);
        } catch (error) {
            ConsoleLogger.error(`${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }
}

