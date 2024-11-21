import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const AccountRole = sequelize.define('AccountRole', {
  accountId: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: 'Accounts',
      key: 'email',
    },
  },
  roleId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'Roles',
      key: 'id',
    },
  },
}, {
  tableName: 'AccountRoles',
  timestamps: false,
});

export default AccountRole;
