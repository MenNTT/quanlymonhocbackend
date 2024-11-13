import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  canCreate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canUpdate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canView: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'Permissions',
  timestamps: false,
});

export default Permission;
