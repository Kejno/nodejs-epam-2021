import { cyan, red } from 'colors';
import { ConsoleLogger } from '../utils/logger';
import { createUserGroupService, getUserGroupsService } from '../services/userGroupService';

export default class GroupController {
    async createUserGroup(req, res) {
        try {
            ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.body)}`);
            const createdUserGroup = await createUserGroupService(req.body);
            res.json(createdUserGroup);
        } catch (error) {
            ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }

    async getUserGroups(req, res) {
        try {
            ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.query)}`);
            const { rows, count } = await getUserGroupsService(req.query);
            res.json({ userGroups: rows, count });
        } catch (error) {
            ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }
}

