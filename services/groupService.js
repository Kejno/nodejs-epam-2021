import Group from '../models/Group';
import ApiError from '../error/ApiError';
import { INVALID_TEXT_REPRESENTATION, UNIQUE_VIOLATION } from '../constants';
import { formatForCreate } from '../formatters/groupFormatter';
import { executionTime } from '../utils/executionFunc';

export const createGroupService = async (groupData) => {
    try {
        const formatedUser = formatForCreate(groupData);
        await Group.create(formatedUser);
    } catch (error) {
        if (error.parent.code === UNIQUE_VIOLATION) {
            throw ApiError.badRequest(error.errors[0].message);
        }
        throw ApiError.internal(error.errors[0].message);
    }
};

export const getGroupsService = async () => {
    try {
        return await executionTime(Group.findAndCountAll({
            attributes: ['id', 'name', 'permissions']
        }));
    } catch (error) {
        throw ApiError.internal(error.errors[0].message);
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
        if (error.parent.code === INVALID_TEXT_REPRESENTATION) {
            throw ApiError.badRequest('groupId is not valid');
        }
        throw ApiError.internal(error.errors[0].message);
    }
};

export const updateGroupService = async (groupId, body) => {
    try {
        const groupData = await Group.update(body, {
            where: {
                id: groupId
            },
            returning: ['id', 'name', 'permissions']
        });
        if (!groupData[0]) {
            throw ApiError.badRequest('group not found');
        }
        return groupData[1][0];
    } catch (error) {
        throw ApiError.internal(error);
    }
};

export const deleteGroupService = async (groupId) => {
    try {
        const deletedGroup = await Group.destroy({
            where: {
                id: groupId
            }
        });
        if (!deletedGroup) {
            throw ApiError.badRequest('group not found');
        }
        return deletedGroup;
    } catch (error) {
        throw ApiError.internal(error);
    }
};
