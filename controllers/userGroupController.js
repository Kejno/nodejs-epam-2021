import { red } from 'colors';
import { ConsoleLogger } from '../utils/logger';
import { createUserGroupService, getUserGroupsService } from '../services/userGroupService';

export default class GroupController {
    async createUserGroup(req, res) {
        try {
            const createdUserGroup = await createUserGroupService(req.body);
            res.json(createdUserGroup);
        } catch (error) {
            ConsoleLogger.error(`${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }

    async getUserGroups(req, res) {
        try {
            const { rows, count } = await getUserGroupsService(req.query);
            res.json({ userGroups: rows, count });
        } catch (error) {
            ConsoleLogger.error(`${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }
}

