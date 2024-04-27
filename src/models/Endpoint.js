const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const Endpoint = sequelize.define('Endpoint', {
  path: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  method: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  request: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  statusCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Endpoint;