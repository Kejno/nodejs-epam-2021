import sequelize from '../db';

import UserGroup from '../models/UserGroup';
import ApiError from '../error/ApiError';


export const addUsersToGroup = async (groupId, userIds) => {
    const multiData = userIds.reduce((curr, acc) => {
        curr.push({ user_id: acc, group_id: groupId });
        return curr;
    }, []);

    const transaction = await sequelize.transaction();
    try {
        await UserGroup.bulkCreate(multiData, { transaction });
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        return ApiError.badRequest('Internal error');
    }
};

