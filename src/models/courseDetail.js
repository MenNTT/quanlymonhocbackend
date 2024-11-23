import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';

const CourseDetail = sequelize.define('CourseDetail', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id',
    },
  },
  duration: {
    type: DataTypes.STRING,
  },
  prerequisites: {
    type: DataTypes.TEXT,
  },
  objectives: {
    type: DataTypes.TEXT,
  },
  detailedSyllabus: {
    type: DataTypes.TEXT,
  },
  format: {
    type: DataTypes.STRING, // online, offline, etc.
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'CourseDetails',
  timestamps: false,
});

export default CourseDetail;
