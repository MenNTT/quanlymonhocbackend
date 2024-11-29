import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';
import Course from './Course.js';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
