import { users } from '../data/users';
import User from '../models/User';
import ApiError from '../error/ApiError';

export const seeder = async () => {
    try {
        await User.destroy({
            truncate: true,
            cascade: true
        });

        await User.bulkCreate(users);
    } catch (error) {
        return ApiError.badRequest(error.details[0].message);
    }
};
