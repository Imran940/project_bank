//configuration of database
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

exports.getRecords = (req, res) => {
    const { username } = req.body;
    const sql = `select * from account where CustName=?`;
    db.query(sql, [username], (err, result) => {
        if (!err) {
            res.send(result);
            console.log(result);
        } else {
            console.log(err);
            res.send("Unable to get records due to some errorrs");
        }
    })
}

exports.getRecord = (req, res) => {
    const sql = "select Customer,Cust_bal from user";
    db.query(sql, (err, result) => {
        if (!err) {
            console.log(result);
            res.send(result);
        } else {
            console.log(err);
        }
    })
}

exports.getDeposit = (req, res) => {
    const balance = parseInt(req.balance);
    const { date, username, amount } = req.body;
    const bal = balance + parseInt(amount);
    const insertSql = `insert into account values(?,?,?,?,?)`;
    const updateSql = "update user set Cust_bal=? where Customer=?";
    db.query(insertSql, [date, username, amount, 0, bal], (err, result) => {
        if (!err) {
            db.query(updateSql, [bal, username]);
            res.send(result);
        }
        else {
            console.log(err);
            res.send(err);
        }
    })

}

exports.getWithdraw = (req, res) => {
    const balance = parseInt(req.balance);
    const { date, username, amount } = req.body;
    if (balance < parseInt(amount)) {
        return res.status(400).send(`You do not have sufficcient balance and current balance is ${balance}`);

    }
    const bal = balance - parseInt(amount);
    const insertSql = `insert into account values(?,?,?,?,?)`;
    const updateSql = "update user set Cust_bal=? where Customer=?";
    db.query(insertSql, [date, username, 0, amount, bal], (err, result) => {
        if (!err) {
            db.query(updateSql, [bal, username]);
            res.send(result);
        }
        else {
            console.log(err);
            res.send(err);
        }
    })

}