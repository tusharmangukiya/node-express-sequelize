const { USER } = require("../Middleware/database");
const { toObject, generateJwt, removeFields } = require("../utils/helper");
const passport = require("passport");
const APIError = require("../utils/APIError");
const logger = require("../utils/logger");
/**
 * API TO GET LIST OF ALL USERS
 * */

exports.getAll = async (req, res, next) => {
  try {
    const data = await USER.findAll({
      where: {
        isDeleted: false,
      },
    });
    return res.sendJson(200, data), logger.info("Get List done successfully.");
  } catch (error) {
    logger.info(error), next(error);
  }
};

/**
 * User signup
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

/**
 * API FOR SIGNUP WITH ENCRYPTED PASSWORD
 * */
exports.signup = async (req, res, next) => {
  try {
    let user = await USER.create(req.body);
    const body = { id: user.id, firstName: user.firstName, email: user.email };
    const token = generateJwt({ user: body });
    user = toObject(user);
    user.token = "Bearer " + token;
    return (
      res.sendJson(200, {
        data: removeFields(user, ["password", "role"]),
        message: "Signup done successfully.",
      }),
      logger.info("Signup done successfully.")
    );
  } catch (error) {
    logger.error(error), next(error);
  }
};

/**
 * User login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

/**
 * API FOR SIGNIN WITH AUTH TOKEN
 * */

exports.signin = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user)
        throw new APIError({
          status: 401,
          message: err ? err.message : "Unauthorized access",
        });

      req.login(user, { session: false }, async (err) => {
        if (err) throw new APIError();
        const body = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };
        const token = generateJwt({ user: body });
        user = toObject(user);
        user.token = "Bearer " + token;
        return (
          res.sendJson(200, {
            data: removeFields(user, ["password", "role"]),
            message: info.message,
          }),
          logger.info(info.message)
        );
      });
    } catch (err) {
      logger.error(err), next(err);
    }
  })(req, res, next);
};

