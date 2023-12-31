const { Sequelize } = require('sequelize');
require('dotenv').config();

const is_prod = process.env.PORT;

let sequelize;
if(is_prod) {
    sequelize = new Sequelize(process.env.JAWSDB_URL)
} else sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    // Turn off SQL logging in the terminal
    logging: false
});
module.exports = sequelize;