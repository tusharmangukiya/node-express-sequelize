const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcryptJs = require('bcryptjs');
const logger = require("../utils/logger");
const { secretKeys } = require('../config');

const { USER } = require("../Middleware/database");

const localStrategyOpts = { usernameField: 'email', passwordField: 'password' };

const jwtStrategyOpts = { jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), secretOrKey: secretKeys.jwt };

/**
 * To validate user login
 * @param {*} email User email
 * @param {*} password User password
 * @param {*} done
 */
const loginLocalStrategy = async (email, password, done) => {
  try {
    let user = await USER.findOne({ where: { email: email, isDeleted: false } });
    if (!user) return done(new Error('Invalid email and password'));
    const validPassword = await bcryptJs.compare(password, user.password);
    if (!validPassword) return done(new Error('Invalid email and password'));
    return (done(null, user, { message: 'Logged in Successfully' }),
      logger.info('Logged in Successfully'))
  }
  catch (error) { return done(error),
    logger.error(' Logged in UnSuccesfully') }
};

/**
 * To authenticate current user's session using JWT verification
 * @param {*} jwtPayload Current user's JWT token
 * @param {*} done
 */
const authenticateJwtStrategy = async (jwtPayload, done) => {
  try {
    let user = await USER.findOne({ where: { id: jwtPayload.user.id, isDeleted: false } });
    if (user) { return done(null, user); }
    else { return done('Invalid access token'); }
  } catch (error) { done(error); }
};

passport.use('login', new localStrategy(localStrategyOpts, loginLocalStrategy));
passport.use('authentication', new JWTstrategy(jwtStrategyOpts, authenticateJwtStrategy));