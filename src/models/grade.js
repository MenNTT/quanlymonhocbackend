import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Grade = sequelize.define('Grade', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Grades',
  timestamps: false,
});

export default Grade;
