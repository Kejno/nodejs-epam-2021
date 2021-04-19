import { v4 as uuidv4 } from 'uuid';

export const formatForCreate = ({ login, password, age, isDeleted }) => ({

    id: uuidv4(),
    login,
    password,
    age,
    is_deleted: isDeleted
});
