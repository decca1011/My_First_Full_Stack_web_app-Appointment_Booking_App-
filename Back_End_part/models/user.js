
const  Sequelize = require('sequelize');
const sequelize = require('../util/database'); 
const User = sequelize.define('My_Appointment_DATA', {
  id: {
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type:Sequelize.STRING,
    allowNull: false,
  },
  pass: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  em: {
    type: Sequelize.STRING,
    allowNull: false,
     //unique: true,
  }
});

module.exports = User;
