import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 
const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    comment: 'Primary key - UUID',
  },
  accountId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Accounts',
      key: 'email',
    },
    comment: 'Foreign key referencing Account',
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id',
    },
    comment: 'Foreign key referencing Course',
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Enrollment date',
  },
  status: {
    type: DataTypes.STRING,
    comment: 'Status can be enrolled, completed, dropped',
  },
  grade: {
    type: DataTypes.STRING,
    comment: 'Grade received for the course',
  },
}, {
  tableName: 'Enrollments',
  timestamps: false,
});

export default Enrollment;