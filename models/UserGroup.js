import sequelize from '../db';
import { DataTypes } from 'sequelize';

const UserGroup = sequelize.define('user_group', {
    user_id: { type: DataTypes.UUID, primaryKey: true },
    group_id: { type: DataTypes.STRING, allowNull: false, unique: true },
    permissions: { type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')), allowNull: false }
});

export default UserGroup;
