import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';  // Adjust the path as needed

const CourseCoupon = sequelize.define('CourseCoupon', {
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id',
    },
    comment: 'Foreign key referencing Course',
  },
  couponId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Coupons',
      key: 'id',
    },
    comment: 'Foreign key referencing Coupon',
  },
}, {
  tableName: 'Course_Coupons',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['courseId', 'couponId'],
    },
  ],
});

export default CourseCoupon;
