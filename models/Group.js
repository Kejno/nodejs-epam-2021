import sequelize from '../db';
import { DataTypes } from 'sequelize';

const Group = sequelize.define('group', {
    id: { type: DataTypes.UUID, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    permissions: { type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')), allowNull: false }
});

export default Group;
