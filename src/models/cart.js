import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';
import Course from './Course.js';
import { v4 as uuidv4 } from 'uuid';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false,
    field: 'id'
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'userId'
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Course,
      key: 'id'
    },
    field: 'courseId'
  }
}, {
  tableName: 'Carts',
  timestamps: true,
  sequelize
});

// Định nghĩa quan hệ
Cart.belongsTo(Course, {
  foreignKey: 'courseId',
  as: 'Course'
});

export default Cart;
