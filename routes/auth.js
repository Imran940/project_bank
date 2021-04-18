const express = require("express");

const router = express.Router();


//controller
const { checkUser } = require('../controllers/auth');

router.post('/login', checkUser);

module.exports = router