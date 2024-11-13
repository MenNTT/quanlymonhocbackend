import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'Roles',
  timestamps: false,
});

export default Role;
