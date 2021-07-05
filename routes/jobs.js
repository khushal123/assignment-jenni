const express = require("express");
const router = express.Router();
const { body, validationResult, param } = require("express-validator");
const { errorResponse } = require("../utils/response");
const { create, update, list, getByUser } = require("../controllers/jobs");
const { checkAdmin } = require("../middleware/auth")
const passport = require("passport");
router.post(
  "/",
  [
    body("worker", "A valid worker id is required").exists(),
    body("task", "A valid task name is required").exists(),
    body("status", "A valid status is required").exists(),
  ],
  passport.authenticate("jwt", { session: false }),
  checkAdmin,
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors);
    }
    return create(req, res);
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors);
    }
    return getByUser(req, res);
  }
);
router.get("/", passport.authenticate("jwt", { session: false }), function (req, res) {
  return list(req, res);
});

router.patch(
  "/:jobId",
  [
    param("jobId", "A valid jobId is required").exists(),
    body("status", "A valid status is required").exists(),
  ],
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors);
    }
    return update(req, res);
  }
);

module.exports = router;
