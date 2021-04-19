const knex = require("knex");
const knexfile = require("./knexfile")  //configuration of database

const db = knex(knexfile.development);

module.exports = db;