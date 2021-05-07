import sequelize from '../db';
import { DataTypes } from 'sequelize';

const UserGroup = sequelize.define('user_group', {
    user_id: {
        type: DataTypes.UUID,
        unique: 'compositeIndex',
        references:{
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    group_id: {
        type: DataTypes.UUID,
        unique: 'compositeIndex',
        references: {
            model: 'groups',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
});

export default UserGroup;
