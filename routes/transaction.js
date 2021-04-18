const express = require("express");

const router = express.Router();


//middlewares
const { getBalance, verifyToken } = require('../middlewares/verifyTrans')

//controllers
const { getRecords, getRecord, getDeposit, getWithdraw } = require('../controllers/transactions');

//routes
router.post('/getRecords', verifyToken, getRecords);
router.post('/getRecord', verifyToken, getRecord);
router.post('/deposit', verifyToken, getBalance, getDeposit);
router.post('/withdraw', verifyToken, getBalance, getWithdraw);

module.exports = router;