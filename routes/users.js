const express = require('express');
const router = express.Router();

router.post('/signup-admin', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup-worker', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/jobs', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/jobs', function(req, res, next) {
  res.send('respond with a resource');
});




module.exports = router;
