const DataTypes = require("sequelize").DataTypes;
const _user = require("./user");
const _orgs = require("./organization");
const _upload = require("./upload");
const _orgroles = require("./organization_roles");
const _organization_user = require("./organization_user");
const _user_roles = require("./user_roles");

function initModels(sequelize) {
  const USER = _user(sequelize, DataTypes);

  return {
    USER
  };
}

module.exports = initModels;
