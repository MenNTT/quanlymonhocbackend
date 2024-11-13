import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Log = sequelize.define('Log', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    comment: 'Primary key - UUID',
  },
  accountId: {
    type: DataTypes.STRING,
    references: {
      model: 'Accounts',
      key: 'email',
    },
    comment: 'Foreign key referencing Account',
  },
  courseId: {
    type: DataTypes.UUID,
    references: {
      model: 'Courses',
      key: 'id',
    },
    comment: 'Foreign key referencing Course',
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Action type such as enroll, drop, view',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Log creation time',
  },
}, {
  tableName: 'Logs',
  timestamps: false,
});

export default Log;
