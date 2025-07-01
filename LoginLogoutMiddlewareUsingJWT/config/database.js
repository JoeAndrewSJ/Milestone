// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crudtable', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
