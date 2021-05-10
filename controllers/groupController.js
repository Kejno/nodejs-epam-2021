import { createGroupService, getGroupsService, getGroupByIdService, updateGroupService, deleteGroupService } from '../services/groupService';

export default class GroupController {
    async createGroup(req, res) {
        try {
            const createdGroup = await createGroupService(req.body);
            res.json(createdGroup);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }

    async getGroups(req, res) {
        try {
            const { rows, count } = await getGroupsService(req.query);
            res.json({ groups: rows, count });
        } catch (error) {
            res.status(error.status).json(error.message);
        }
    }

    async getGroupById(req, res) {
        try {
            const { id } = req.params;
            const currentUser = await getGroupByIdService(id);
            res.json(currentUser);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }

    async updateGroup(req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await updateGroupService(id, req.body);
            res.json(updatedUser);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }

    async deleteGroup(req, res) {
        try {
            const { id } = req.params;
            await deleteGroupService(id);

            res.json({ message: 'successfully deleted' });
        } catch (error) {
            res.status(error.status).json(error);
        }
    }
}

