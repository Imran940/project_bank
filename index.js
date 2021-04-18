const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { readdirSync } = require('fs');
let balance;

//app begin
const app = express();

dotenv.config({ path: './.env' })



//middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

//routes middlewares
readdirSync("./routes").map((r) =>
    app.use("/", require("./routes/" + r))
)


//Listening
app.listen(8000, () => console.log("Listening port on 8000"));
