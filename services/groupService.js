// import { Op } from 'sequelize';
import Group from '../models/Group';
import ApiError from '../error/ApiError';
import { formatForCreate } from '../formatters/groupFormatter';

export const createGroupService = async (groupData) => {
    try {
        const formatedUser = formatForCreate(groupData);

        const { id, name, permissions } = await Group.create(formatedUser, { returning: false });

        return { id, name, permissions };
    } catch (error) {
        return ApiError.badRequest(error.errors[0].message);
    }
};

export const getGroupsService = async () => {
    try {
        return await Group.findAndCountAll();
    } catch (error) {
        return ApiError.badRequest(error.errors[0].message);
    }
};

export const getGroupByIdService = async (groupId) => {
    try {
        const groupData = await Group.findOne({
            attributes: ['id', 'name', 'permissions'],
            where: { id: groupId }
        });

        if (!groupData) {
            return ApiError.badRequest('group not found');
        }
        const group = groupData.dataValues;

        return group;
    } catch (error) {
        if (error.parent.code === '22P02') {
            return ApiError.badRequest('groupId is not valid');
        }
        return ApiError.badRequest(error.errors[0].message);
    }
};

export const updateGroupService = async (groupId, body) => {
    try {
        const userData = await Group.update(body, {
            where: {
                id: groupId
            },
            returning: ['id', 'name', 'permissions']
        });


        return userData[1][0];
    } catch (error) {
        return ApiError.badRequest(error);
    }
};

export const deleteGroupService = async (groupId) => {
    try {
        return await Group.destroy({
            where: {
                id: groupId
            }
        });
    } catch (error) {
        return ApiError.badRequest(error);
    }
};
