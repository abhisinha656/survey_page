var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "survey",
  port: "3308",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected !");
});

module.exports = con;
