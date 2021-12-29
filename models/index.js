'use strict';

const Sequelize = require('sequelize');
const config = require('../config');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize; // app에서 sync해주기 위해서
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);

module.exports = db;
