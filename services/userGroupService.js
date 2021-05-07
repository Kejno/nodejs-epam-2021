import UserGroup from '../models/UserGroup';
import User from '../models/User';
import ApiError from '../error/ApiError';

export const createUserGroupService = async (userGroupData) => {
    try {
        const userData = await User.findOne({
            where: {
                id: userGroupData.user_id,
                is_deleted: false
            }
        });

        if (userData) {
            const { user_id, group_id } = await UserGroup.create(userGroupData, { returning: false });
            console.log({ user_id, group_id });
            return { user_id, group_id };
        }
        return { message: `Not fount user with id = ${userGroupData.user_id}` };
    } catch (error) {
        return ApiError.badRequest(error);
    }
};

export const getUserGroupsService = async () => {
    try {
        return await UserGroup.findAndCountAll({
            attributes: ['user_id', 'group_id']
        });
    } catch (error) {
        return ApiError.badRequest(error.errors[0].message);
    }
};
