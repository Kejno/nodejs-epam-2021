import sequelize from '../db';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
    id: { type: DataTypes.UUID, primaryKey: true },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 4,
            max: 130
        }
    },
    is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
});

export default User;
