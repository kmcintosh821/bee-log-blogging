const { Sequelize } = require('sequelize');
require('dotenv').config();

const is_prod = process.env.PORT;

const sequelize = new Sequelize(
    'bee_log_db',
    'root',
    '', {
    host: 'localhost',
    dialect: 'mysql',
    // Turn off SQL logging in the terminal
    logging: false
});
module.exports = sequelize;