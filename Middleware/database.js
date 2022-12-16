"use strict";

const Sequelize = require("sequelize");
const initModels = require("../models/init-model");
const { database } = require('../config');
const logger = require('../utils/logger');
const sequelize = new Sequelize(
  database.name,
  database.user,
  database.pwd,
  {
    logging: false,
    host: database.host,
    dialect: database.user
  }
);

sequelize
  // .sync({alter : true})
  .authenticate()
  .then(() => {
    logger.info("=======DATABASE CONNECTED======")
  })
  .catch((error) => {
    logger.error("DATABASE ERROR ....", error, database.name);
    process.exit(0);
  });

const db = initModels(sequelize);

sequelize.sync({ force: false })
  .then(() => {
    logger.info("===Database sync with models===")
  })

global.sequelize = sequelize;
module.exports = db;
