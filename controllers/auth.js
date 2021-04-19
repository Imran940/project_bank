const db = require('../db/database')
const jwt = require("jsonwebtoken");
exports.checkUser = async (req, res) => {
    const { username, password } = req.body;
    const result = await db('login').where({
        username: username,
        password: password
    }).select()

    if (result.length > 0) {
        jwt.sign({ user: result[0] }, 'password', (error, token) => {
            if (!error) {
                res.send(token);
            } else {
                console.log(error)
            }

        })
    }


}
