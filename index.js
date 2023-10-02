const express = require("express");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const otp = Math.floor(1000 + Math.random() * 9000);
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const con = require("./conn/dbconn");

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/pages"));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("signup");
});

// Step 1: Handle email and password submission
app.post("/mail", async (req, res) => {
  const { email, password } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "shemar.will@ethereal.email",
      pass: "8ZPJWM77xQgj3Bn9Vt",
    },
  });

  console.log("Recipient Email:", email);

  if (!email) {
    return res.status(400).send("Recipient email not provided");
  }

  let info = await transporter.sendMail({
    from: '"Shourya " <shourya7250@gmail.com>',
    to: email,
    subject: "Email Verification",
    text: `Your Email Verification code is ${otp}`,
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    var values = [email, password];

    con.query(sql, values, function (err, result) {
      if (err) throw err;
      console.log("Record inserted");
      con.end();
    });
  });
});

app.post("/otp", (req, res) => {
  const { user_otp } = req.body;
  const uotp = parseInt(user_otp);
  console.log(otp);
  console.log(user_otp);
  if (user_otp == uotp) {
    res.redirect("/profile");
    // alert("Email Verified")
  } else {
    // alert("Invalid OTP");
    console.log("Wrong OTP");
    res.redirect("/");
  }
});

// profile information insertion
app.post("/submit", (req, res) => {
  const { fullname, phone, address, state, country, zipcode } = req.body;
  // Perform the INSERT query
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    var sql1 =
      "INSERT INTO information (fullname,phone,address,state,country,zipcode) VALUES (?,?,?,?, ?,?)";
    var values = [fullname, phone, address, state, country, zipcode];

    con.query(sql1, values, function (err, result) {
      if (err) throw err;
      console.log("Record inserted");
      con.end();
      res.redirect("/home");
    });
  });
});

// survey hompage
app.post("/survey", (req, res) => {
  const q1 = req.body.q1;
  const q2 = req.body.q2;
  const q3 = req.body.q3;
  const q4 = req.body.q4;

  const sql = "INSERT INTO responses (q1, q2,q3,q4) VALUES (?, ?, ?, ?)";
  con.query(sql, [q1, q2, q3, q4], (err, result) => {
    if (err) throw err;
    console.log("Survey responses recorded.");
  });

  res.send("Thank you for completing the survey!");
});

// page navigation
app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
