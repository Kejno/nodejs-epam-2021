import { createUserGroupService, getUserGroupsService } from '../services/userGroupService';

export default class GroupController {
    async createUserGroup(req, res) {
        try {
            const createdUserGroup = await createUserGroupService(req.body);

            res.json(createdUserGroup);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }

    async getUserGroups(req, res) {
        const { rows, count } = await getUserGroupsService(req.query);

        res.json({ userGroups: rows, count });
    }
}

