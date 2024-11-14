import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 500],
        msg: 'Address cannot exceed 500 characters'
      }
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[0-9+\-\s]*$/i,
        msg: 'Phone number can only contain numbers, +, - and spaces'
      },
      len: {
        args: [10, 15],
        msg: 'Phone number must be between 10 and 15 characters'
      }
    }
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: {
        msg: 'Birth date must be a valid date'
      },
      isBefore: {
        args: new Date().toISOString(),
        msg: 'Birth date cannot be in the future'
      }
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Users',
  timestamps: false,
});

export default User;