const passport = require('passport');
const APIError = require('../utils/APIError');
const { capitalize } = require('../utils/helper');
const logger = require('../utils/logger');
const { admin_permissions, client_permissions } = require('../Middleware/permissions')
const { ORGANISATION_USER, ORGANISATION_ROLES, USER_ROLE} = require("../Middleware/database");

 /**
 * To authenticate user as well as their roles
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} roles Roles can be string or array of string
 */
const handleJWT = (req, res, next, asset) => async (err, user, info) => {

  try {
    if (err || info || !user) {
      const error = err || info.message;
      throw new APIError({ status: 401, message: error ? error : 'Unauthorized access' })
    }
    logger.info(`========user===== :: ${JSON.stringify(user)}`);
    req.user = user;
    return next();
  } catch (err) { next(err) }
};

/**
 * Authentication middleware
 * @param {*} roles Roles can be string or array of string
 */
exports.isAuth = (asset) => (req, res, next) => {
  passport.authenticate('authentication', { session: false }, handleJWT(req, res, next, asset))(req, res, next)
};
