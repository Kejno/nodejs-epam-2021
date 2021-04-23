import UserGroup from '../models/UserGroup';
import ApiError from '../error/ApiError';


export const addUsersToGroup = async (groupId, userIds) => {
    const multiData = userIds.reduce((curr, acc) => {
        curr.push({ user_id: acc, group_id: groupId });
        return curr;
    }, []);

    try {
        await UserGroup.bulkCreate(multiData);
    } catch (error) {
        return ApiError.badRequest('Internal error');
    }
};

