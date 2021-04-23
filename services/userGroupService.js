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
        // return ApiError.badRequest(error.errors[0].message);
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

// export const getGroupByIdService = async (groupId) => {
//     try {
//         const groupData = await Group.findOne({
//             attributes: ['id', 'name', 'permissions'],
//             where: { id: groupId }
//         });

//         if (!groupData) {
//             return ApiError.badRequest('group not found');
//         }
//         const group = groupData.dataValues;

//         return group;
//     } catch (error) {
//         if (error.parent.code === '22P02') {
//             return ApiError.badRequest('groupId is not valid');
//         }
//         return ApiError.badRequest(error.errors[0].message);
//     }
// };

// export const updateGroupService = async (groupId, body) => {
//     try {
//         const groupData = await Group.update(body, {
//             where: {
//                 id: groupId
//             },
//             returning: ['id', 'name', 'permissions']
//         });


//         return groupData[1][0];
//     } catch (error) {
//         return ApiError.badRequest(error);
//     }
// };

// export const deleteGroupService = async (groupId) => {
//     try {
//         return await Group.destroy({
//             where: {
//                 id: groupId
//             }
//         });
//     } catch (error) {
//         return ApiError.badRequest(error);
//     }
// };
