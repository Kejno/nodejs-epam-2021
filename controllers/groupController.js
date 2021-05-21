import { cyan, red, green } from 'colors';
import { ConsoleLogger } from '../utils/logger';
import { createGroupService, getGroupsService, getGroupByIdService, updateGroupService, deleteGroupService } from '../services/groupService';

export default class GroupController {
    async createGroup(req, res) {
        try {
            const { execTime } = await createGroupService(req.body);
            ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.query)}, ${green('Execution time:')} ${execTime} ms`);
            res.json({ message: 'group created successful' });
        } catch (error) {
            ConsoleLogger.error(`${cyan('Request')}: ${req.method} ${req.url}, ${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }

    async getGroups(req, res) {
        try {
            const { execTime, rows, count } = await getGroupsService(req.query);
            ConsoleLogger.info(execTime);
            res.json({ groups: rows, count });
        } catch (error) {
            ConsoleLogger.error(`${red('Error')}: ${error.message}`);
            res.status(error.status).json(error.message);
        }
    }

    async getGroupById(req, res) {
        try {
            const { id } = req.params;
            const currentUser = await getGroupByIdService(id);
            res.json(currentUser);
        } catch (error) {
            ConsoleLogger.error(`${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }

    async updateGroup(req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await updateGroupService(id, req.body);
            res.json(updatedUser);
        } catch (error) {
            ConsoleLogger.error(`${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }

    async deleteGroup(req, res) {
        try {
            const { id } = req.params;
            await deleteGroupService(id);
            res.json({ message: 'successfully deleted' });
        } catch (error) {
            ConsoleLogger.error(`${red('Error')}: ${error.message}`);
            res.status(error.status).json(error);
        }
    }
}

