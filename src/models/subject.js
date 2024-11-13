import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  courseId: {
    type: DataTypes.UUID,
    references: {
      model: 'Courses',
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Subjects',
  timestamps: false,
});

export default Subject;