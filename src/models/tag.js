import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    comment: 'Primary key - UUID',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'Unique tag name',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Tag creation time',
  },
  updatedAt: {
    type: DataTypes.DATE,
    comment: 'Tag update time',
  },
}, {
  tableName: 'Tags',
  timestamps: false,
});

export default Tag;
