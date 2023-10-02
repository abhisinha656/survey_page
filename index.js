const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const otp = Math.floor(1000 + Math.random() * 9000);
<<<<<<< HEAD
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const con = require('./conn/dbconn');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/pages'));
app.use('/public', express.static('public'));
// require('./registration/sendmail');
// const sendmail = require('./registration/sendmail');
app.get('/',(req,res)=>{
    res.render('signup');
})
=======
const con = require("./conn/dbconn");
>>>>>>> b9c06c74ea95ed79f8878057e27a566eb1e8ff79

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
<<<<<<< HEAD
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'giovani.hackett@ethereal.email',
        pass: 'MYRFscjN8mGk4rYHhv',
      },
    });
  
  
    console.log('Recipient Email:', email); 
  
    if (!email) {
      return res.status(400).send('Recipient email not provided');
    }
  
    let info = await transporter.sendMail({
      from: '"Abhineet " <abhineet@gmail.com>',
      to: email,
      subject: 'Email Verification',
      text: `Your Email Verification code is ${otp}`,
    });
=======
>>>>>>> b9c06c74ea95ed79f8878057e27a566eb1e8ff79

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
<<<<<<< HEAD
      console.log('Connected!');
      
      var sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
      var values = [email, password]; 
      
=======
      console.log("Connected!");

      var sql = "INSERT INTO users (email, password) VALUES (?, ?)";
      var values = [email, password];

>>>>>>> b9c06c74ea95ed79f8878057e27a566eb1e8ff79
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("Record inserted");
        con.end();
      });
    });
<<<<<<< HEAD
  });

app.post('/otp',(req,res)=>{
  const { user_otp } = req.body;
  const uotp = parseInt(user_otp);
  console.log(otp);
  console.log(user_otp);
  if(user_otp == uotp){
    res.redirect('/profile');
    alert("Email Verified")
  }else{
    alert("Invalid OTP");
=======

    res.redirect("/profile"); // Redirect to the user's profile after successful registration
  } else {
>>>>>>> b9c06c74ea95ed79f8878057e27a566eb1e8ff79
    console.log("Wrong OTP");
    res.redirect("/"); // Redirect back to the initial signup page
  }
});

<<<<<<< HEAD
})
  
app.get('/profile',(req,res)=>{
  res.render('profile');
=======
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
>>>>>>> b9c06c74ea95ed79f8878057e27a566eb1e8ff79
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
