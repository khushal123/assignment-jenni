const express = require('express');
const router = express.Router();

router.post('/jobs', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/jobs', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
