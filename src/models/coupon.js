import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';  // Adjust the path as needed

const Coupon = sequelize.define('Coupon', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    comment: 'Primary key - UUID',
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'Unique discount code',
  },
  description: {
    type: DataTypes.TEXT,
    comment: 'Coupon description',
  },
  discountPercent: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Discount percentage',
  },
  validFrom: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Start date of coupon validity',
  },
  validUntil: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'End date of coupon validity',
  },
  maxRedemptions: {
    type: DataTypes.INTEGER,
    comment: 'Maximum number of redemptions',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Coupon creation time',
  },
  updatedAt: {
    type: DataTypes.DATE,
    comment: 'Coupon update time',
  },
}, {
  tableName: 'Coupons',
  timestamps: false,
});

export default Coupon;
