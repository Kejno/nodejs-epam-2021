// import ApiError from '../error/ApiError';
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

    // async getGroupById(req, res) {
    //     const { id } = req.params;

    //     const currentUser = await getGroupByIdService(id);

    //     if (currentUser.status === 400) {
    //         return res.status(400).json(currentUser);
    //     }

    //     res.json(currentUser);
    // }

    // async updateGroup(req, res) {
    //     const { id } = req.params;

    //     const updatedUser = await updateGroupService(id, req.body);
    //     if (updatedUser.status === 400) {
    //         return res.status(400).json(updatedUser);
    //     }
    //     res.json(updatedUser);
    // }

    // async deleteGroup(req, res) {
    //     const { id } = req.params;
    //     const deletedGroup = await deleteGroupService(id);

    //     if (!deletedGroup) {
    //         return res.status(400).json(ApiError.badRequest('group not found'));
    //     }

    //     res.json({ message: 'successfully deleted' });
    // }
}

