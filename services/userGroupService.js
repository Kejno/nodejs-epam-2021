import UserGroup from '../models/UserGroup';
import ApiError from '../error/ApiError';
import { UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION, INVALID_TEXT_REPRESENTATION } from '../constants';

export const createUserGroupService = async (userGroupData) => {
    try {
        const { user_id, group_id } = await UserGroup.create(userGroupData);
        console.log({ user_id, group_id });
        return { user_id, group_id };
    } catch (error) {
        if (error.parent.code === UNIQUE_VIOLATION) {
            throw ApiError.badRequest(error.errors[0].message);
        }
        if (error.parent.code === FOREIGN_KEY_VIOLATION) {
            throw ApiError.badRequest(error.parent.detail);
        }
        if (error.parent.code === INVALID_TEXT_REPRESENTATION) {
            throw ApiError.badRequest('userId or groupId is not valid');
        }
        throw ApiError.badRequest(error);
    }
};

export const getUserGroupsService = async () => {
    try {
        return await UserGroup.findAndCountAll({
            attributes: ['user_id', 'group_id']
        });
    } catch (error) {
        throw ApiError.badRequest(error.errors[0].message);
    }
};
