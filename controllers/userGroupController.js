import { createUserGroupService, getUserGroupsService } from '../services/userGroupService';

export default class GroupController {
    async createUserGroup(req, res) {
        const createdUserGroup = await createUserGroupService(req.body);

        if (createdUserGroup.errorCode === 409) {
            return res.status(409).json(createdUserGroup);
        }

        res.json(createdUserGroup);
    }

    async getUserGroups(req, res) {
        const { rows, count } = await getUserGroupsService(req.query);

        res.json({ userGroups: rows, count });
    }
}

