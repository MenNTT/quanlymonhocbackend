import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 
const RolePermission = sequelize.define('RolePermission', {
  roleId: {
    type: DataTypes.UUID,
    references: {
      model: 'Roles',
      key: 'id',
    },
  },
  permissionId: {
    type: DataTypes.UUID,
    references: {
      model: 'Permissions',
      key: 'id',
    },
  },
}, {
  tableName: 'Role_Permissions',
  timestamps: false,
});

export default RolePermission;
