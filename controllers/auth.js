const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
exports.checkUser = (req, res) => {
    const { username, password } = req.body;
    db.query('select * from login where username=? and password=?', [username, password], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            jwt.sign({ user: result[0] }, 'password', (error, token) => {
                if (!err) {
                    res.send(token);
                } else {
                    console.log(error)
                }

            })

        }
    })

}