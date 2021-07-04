const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response')

router.post('/jobs', function (req, res) {
  res.send('respond with a resource');
});

router.get('/jobs', function (req, res) {
  res.send('respond with a resource');
});

module.exports = router;
