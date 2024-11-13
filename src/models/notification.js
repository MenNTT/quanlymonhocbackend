import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Notification = sequelize.define('Notification', {
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
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Notification message',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Notification creation time',
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Status of notification read/unread',
  },
}, {
  tableName: 'Notifications',
  timestamps: false,
});

export default Notification;
