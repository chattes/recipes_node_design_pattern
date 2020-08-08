const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

Db = {
  sequelize,
  Sequelize,
};

module.exports = Db;
