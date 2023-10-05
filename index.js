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
app.use(bodyparser.urlencoded({ extended: true }));

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
  // const age
  const {
    email,
    password,
    fullname,
    age,
    city,
    country,
    gender,
    dob,
    student_status,
    disability_status,
  } = req.body;

  // console.log(fullname);

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
    subject: "OTP Verification",
    text: `Your Email Verification code is ${otp}`,
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    const sql =
      "INSERT INTO user_data (email, password, fullname,age, city, country, gender, dob, student_status, disability_status) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      email,
      password,
      fullname,
      age,
      city,
      country,
      gender,
      dob,
      student_status,
      disability_status,
    ];

    console.log(values);
    con.query(sql, values, function (err, result) {
      if (err) {
        console.error("Error inserting record:", err.message);
      } else {
        console.log("Record inserted");
      }
    });
  });
});

app.post("/otp", (req, res) => {
  const { user_otp } = req.body;
  const uotp = parseInt(user_otp);
  console.log(otp);
  console.log(user_otp);
  if (user_otp == uotp) {
    res.redirect("/home");
    // alert("Email Verified")
  } else {
    // alert("Invalid OTP");
    console.log("Wrong OTP");
    res.redirect("/");
  }
});

// login validation
app.post("/loginValid", (req, res) => {
  const { email, password } = req.body;
  // Perform the INSERT query
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query(
      "SELECT * FROM user_data WHERE email = ? AND password = ?",
      [email, password],
      (err, results) => {
        if (err) {
          console.error("Error querying the database:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        if (results.length === 1) {
          // User exists and password matches
          res.redirect("/home");
        } else {
          // User doesn't exist or password is incorrect
          res.status(401).json({ error: "Invalid credentials" });
        }
      }
    );
  });
});

// survey hompage fetch data from database
app.get("/survey", (req, res) => {
  // Fetch random questions from the database
});

// page navigation

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
  console.log(`Server is running on port ${port}`);
});
