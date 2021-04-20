import ApiError from '../error/ApiError';
import { createGroupService, getGroupsService, getGroupByIdService, updateGroupService, deleteGroupService } from '../services/groupService';

export default class GroupController {
    async createGroup(req, res) {
        const createdGroup = await createGroupService(req.body);

        if (createdGroup.errorCode === 409) {
            return res.status(409).json(createdGroup);
        }

        res.json(createdGroup);
    }

    async getGroups(req, res) {
        const { rows, count } = await getGroupsService(req.query);

        res.json({ groups: rows, count });
    }

    async getGroupById(req, res) {
        const { id } = req.params;

        const currentUser = await getGroupByIdService(id);

        if (currentUser.status === 400) {
            return res.status(400).json(currentUser);
        }

        res.json(currentUser);
    }

    async updateGroup(req, res) {
        const { id } = req.params;

        const updatedUser = await updateGroupService(id, req.body);
        if (updatedUser.status === 400) {
            return res.status(400).json(updatedUser);
        }
        res.json(updatedUser);
    }

    async deleteGroup(req, res) {
        const { id } = req.params;
        const deletedGroup = await deleteGroupService(id);

        if (!deletedGroup) {
            return res.status(400).json(ApiError.badRequest('group not found'));
        }

        res.json({ message: 'successfully deleted' });
    }
}

