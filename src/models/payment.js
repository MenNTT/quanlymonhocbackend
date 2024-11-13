import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const Payment = sequelize.define('Payment', {
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
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Payment amount',
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD',
    comment: 'Currency for payment',
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Payment date',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    comment: 'Payment status such as pending, completed, failed',
  },
}, {
  tableName: 'Payments',
  timestamps: false,
});

export default Payment;
