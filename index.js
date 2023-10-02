const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const otp = Math.floor(1000 + Math.random() * 9000);
const con = require("./conn/dbconn");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/pages"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("signup");
});

// Step 1: Handle email and password submission
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Generate OTP and send it via email (you can add your OTP logic here)
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "laurence.harvey82@ethereal.email",
      pass: "tCvvd1ynFYhDAmf52N",
    },
  });

  let info = await transporter.sendMail({
    from: '"Shourya"<shourya7250@gmail.com>',
    to: email,
    subject: "Email Verification",
    text: `Your Email Verification code is ${otp}`,
  });

  // Render the OTP entry form (signup-otp.ejs)
  res.render("signup-otp", { email, password });
});

// Step 2: Handle OTP verification
app.post("/signup-verify", (req, res) => {
  const { user_otp } = req.body;
  const uotp = parseInt(user_otp);

  // Verify the OTP (you can add your OTP verification logic here)
  if (uotp === otp) {
    // Insert user data into the database
    const { email, password } = req.body;
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

    res.redirect("/profile"); // Redirect to the user's profile after successful registration
  } else {
    console.log("Wrong OTP");
    res.redirect("/"); // Redirect back to the initial signup page
  }
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
