// import ApiError from '../error/ApiError';
import { createUserGroupService, getUserGroupsService } from '../services/userGroupService';
import { addUsersToGroup } from '../utils/addUsersToGroup';

export default class GroupController {
    async createUserGroup(req, res) {
        const createdUserGroup = await createUserGroupService(req.body);

        if (createdUserGroup.errorCode === 409) {
            return res.status(409).json(createdUserGroup);
        }

        res.json(createdUserGroup);
    }

    async getUserGroups(req, res) {
        await addUsersToGroup('37106320-14bb-49a0-a22c-363d3140c11e', ['7240630e-d54e-4311-a90e-0eed23c5d0b7', '9b3fafe2-76b1-4a8b-b668-4177e1e820f5', '34e52832-5769-42f0-bf08-38d675ea6e52']);

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

