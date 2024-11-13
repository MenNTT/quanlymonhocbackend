import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  gradeId: {
    type: DataTypes.UUID,
    references: {
      model: 'Grades',
      key: 'id',
    },
  },
  instructorId: {
    type: DataTypes.STRING,
    references: {
      model: 'Accounts',
      key: 'email',
    },
  },
  feeAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Courses',
  timestamps: false,
});

export default Course;