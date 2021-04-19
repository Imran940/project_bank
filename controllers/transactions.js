//configuration of database
const db = require('../db/database');

exports.getRecords = async (req, res) => {
    const { username } = req.body;
    const result = await db('account').where({
        CustName: username
    }).select()

    if (result.length > 0) {
        res.send(result);
        console.log(result);
    }

}

exports.getRecord = async (req, res) => {

    const result = await db('Customer', 'Cust_bal').from('user')
    if (result) {
        res.send(result);
        console.log(result);
    }

}

exports.getDeposit = async (req, res) => {
    const balance = parseInt(req.balance);
    const { date, username, amount } = req.body;
    const bal = balance + parseInt(amount);

    const result = await db('account').insert({
        Date: date,
        CustName: username,
        Deposit: amount,
        withdrawn: 0,
        balance: bal
    })
    if (result) {
        await db('user')
            .where('Customer', '=', username)
            .update({
                Cust_bal: bal
            })
        console.log(result);
        res.send(result);
    }


}

exports.getWithdraw = async (req, res) => {
    const balance = parseInt(req.balance);
    const { date, username, amount } = req.body;
    if (balance < parseInt(amount)) {
        return res.status(400).send(`You do not have sufficcient balance and current balance is ${balance}`);
    }
    const bal = balance - parseInt(amount);
    const result = await db('account').insert({
        Date: date,
        CustName: username,
        Deposit: 0,
        withdrawn: amount,
        balance: bal
    })
    if (result) {
        await db('user')
            .where('Customer', '=', username)
            .update({
                Cust_bal: bal
            })
        console.log(result);
        res.send(result);
    }
}
