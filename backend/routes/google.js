const express = require('express');
const googleController = require('../controllers/google');

//creating the router
const router = express.Router();

router.post('/api/google-login', googleController.addGoogle)

module.exports = router;