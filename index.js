const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { readdirSync } = require('fs');
let balance;

//app begin
const app = express();

dotenv.config({ path: './.env' })




// //connecting with db
// db.connect(err => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("Connection made successful");
//     }
// })


//middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

//routes middlewares
readdirSync("./routes").map((r) =>
    app.use("/", require("./routes/" + r))
)


//Routes


// app.get('/', (req, res) => {
//     res.send("Home directory working");
// })

// app.post("/getRecords", verifyToken, (req, res) => {
//     const { username } = req.body;
//     const sql = `select * from account where CustName=?`;
//     db.query(sql, [username], (err, result) => {
//         if (!err) {
//             res.send(result);
// //             console.log(result);
//         } else {
//             console.log(err);
//             res.send("Unable to get records due to some errorrs");
//         }
//     })
// })

// app.get('/getRecord', verifyToken, (req, res) => {
//     const sql = "select Customer,Cust_bal from user";
//     db.query(sql, (err, result) => {
//         if (!err) {
//             console.log(result);
//             res.send(result);
//         } else {
//             console.log(err);
//         }
//     })
// })


// app.post("/deposit", verifyToken, getBalance, (req, res) => {
//     const { date, username, amount } = req.body;
//     const bal = balance + parseInt(amount);
//     const insertSql = `insert into account values(?,?,?,?,?)`;
//     const updateSql = "update user set Cust_bal=? where Customer=?";
//     db.query(insertSql, [date, username, amount, 0, bal], (err, result) => {
//         if (!err) {
//             db.query(updateSql, [bal, username]);
//             res.send(result);
//         }
//         else {
//             console.log(err);
//             res.send(err);
//         }
//     })

// })

// app.post("/withdraw", verifyToken, getBalance, (req, res) => {
//     const { date, username, amount } = req.body;
//     if (balance < parseInt(amount)) {
//         return res.status(400).send(`You do not have sufficcient balance and current balance is ${balance}`);

//     }
//     const bal = balance - parseInt(amount);
//     const insertSql = `insert into account values(?,?,?,?,?)`;
//     const updateSql = "update user set Cust_bal=? where Customer=?";
//     db.query(insertSql, [date, username, 0, amount, bal], (err, result) => {
//         if (!err) {
//             db.query(updateSql, [bal, username]);
//             res.send(result);
//         }
//         else {
//             console.log(err);
//             res.send(err);
//         }
//     })

// })

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     db.query('select * from login where username=? and password=?', [username, password], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result);
//             jwt.sign({ user: result[0] }, 'password', (error, token) => {
//                 if (!err) {
//                     res.send(token);
//                 } else {
//                     console.log(error)
//                 }

//             })

//         }
//     })

// })


//Listening
app.listen(8000, () => console.log("Listening port on 8000"));