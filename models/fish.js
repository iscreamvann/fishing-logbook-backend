const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path based on your project structure

const Fish = sequelize.define('Fish', {
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dateAdded: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  catchBait: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,  
  tableName: 'fish',
});

module.exports = Fish;
