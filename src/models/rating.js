import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Rating = sequelize.define('Rating', {
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Rating score from 1 to 5',
  },
  comment: {
    type: DataTypes.TEXT,
    comment: 'Rating comment',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Rating creation time',
  },
}, {
  tableName: 'Ratings',
  timestamps: false,
});

export default Rating;
