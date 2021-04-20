import { v4 as uuidv4 } from 'uuid';

export const formatForCreate = ({ name, permissions }) => ({

    id: uuidv4(),
    name,
    permissions
});
