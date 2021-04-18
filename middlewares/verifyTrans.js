const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
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


exports.getBalance = (req, res, next) => {
    let balance;
    const username = req.headers.username;
    const balSql = "select balance from account where CustName=?";
    db.query(balSql, [username], (err, result) => {
        if (result.length == 0) {
            balance = 0;
            req.balance = balance;
            next();
        } else if (!err) {
            balance = parseInt(result[result.length - 1].balance)
            req.balance = balance;
            next();
        } else {
            console.log(err);
        }
    })

}