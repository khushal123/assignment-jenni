const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createAdmin, createWorker, login, list } = require('../controllers/user')
const { errorResponse } = require('../utils/response')
const { checkAdmin } = require("../middleware/auth")
const passport = require("passport");

router.get('/',
  passport.authenticate("jwt", { session: false }),
  checkAdmin,
  function (req, res) {
    return list(req, res)
  })

router.post('/signup-admin', [
  body("name", "A valid name is required").exists(),
  body("email", "A valid email is required").exists().isEmail(),
  body("password", "A valid coupon_code is required").exists(),
], function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors)
  }
  return createAdmin(req, res)
});

router.post('/signup-worker', [
  body("name", "A valid name is required").exists(),
  body("email", "A valid email is required").exists().isEmail(),
  body("password", "A valid coupon_code is required").exists(),
], function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors)
  }
  return createWorker(req, res)
});

router.post('/login', [
  body("email", "A valid email is required").exists().isEmail(),
  body("password", "A valid password is required").exists(),
], function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors)
  }
  return login(req, res)
});






module.exports = router;
