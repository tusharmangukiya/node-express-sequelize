const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const {
  register,
  login
} = require("../validations/auth");

const {
  signup,
  signin,
} = require("../Controller/auth");

/**
 * API ROUTE FOR SIGNUP WITH VALIDATION
 * */
router.post("/signup", validate(register), signup);

/**
 * API ROUTE FOR SIGNIN WITH VALIDATION
 * */
router.post("/signin", validate(login), signin);

module.exports = router;
