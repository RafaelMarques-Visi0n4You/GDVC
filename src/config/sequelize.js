const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize('gdvc', 'gdvcweb', 'J_zJQ6K?UpFx', {
    host: '207.180.232.121',
    dialect: 'postgres',
    logging: false, // Remove this line if you don't want to see the raw SQL queries
    });

module.exports = { sequelize };
