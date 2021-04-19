const db = require('../db/database');
const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, 'password', (err, resp) => {
        if (!err) {
            next();
        } else {
            return res.status(403).send("Invalid Token");
        }
    })
}
exports.getBalance = async (req, res, next) => {
    let balance;
    const username = req.headers.username;
    const result = await db('account').where({
        CustName: username
    }).select('balance')

    if (result.length === 0) {
        balance = 0;
        req.balance = balance;
        next();
    } else {
        balance = parseInt(result[result.length - 1].balance)
        req.balance = balance;
        next();
    }
}
