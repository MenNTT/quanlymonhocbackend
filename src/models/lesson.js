import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  subjectId: {
    type: DataTypes.UUID,
    references: {
      model: 'Subjects',
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  content: {
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
  tableName: 'Lessons',
  timestamps: false,
});

export default Lesson;
