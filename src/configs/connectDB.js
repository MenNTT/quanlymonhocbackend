import { Sequelize } from 'sequelize';

// Database configuration
const sequelize = new Sequelize('quanlykhoahoc', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, // Specify the port
  logging: false, // Disable logging
});

export default sequelize;
