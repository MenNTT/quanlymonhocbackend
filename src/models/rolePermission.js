import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const RolePermission = sequelize.define('RolePermission', {
  roleId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'Roles',
      key: 'id'
    }
  },
  permissionId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'Permissions',
      key: 'id'
    }
  }
}, {
  tableName: 'RolePermissions',
  timestamps: false,
});

export default RolePermission;
