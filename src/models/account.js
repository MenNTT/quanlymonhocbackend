import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const Account = sequelize.define('account', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    comment: 'Primary key - unique email',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Password for the account',
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users', // Name of the table the foreign key refers to
      key: 'id',
    },
    comment: 'Foreign key referencing User',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Account creation time',
  },
}, {
  tableName: 'Accounts',
  timestamps: false, // Disable Sequelize's automatic timestamp fields
  comment: 'Table to store account information',
});

export default Account;
