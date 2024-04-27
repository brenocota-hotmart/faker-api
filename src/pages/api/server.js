const sequelize = require('../../utils/sequelize');
const Endpoint = require('../../models/Endpoint');

(async () => {
  try {
    await sequelize.sync({ force: false }); // Set force to true to drop existing tables
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();