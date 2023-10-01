const express = require('express');
const app = express();
const port = 8000;
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const otp = Math.floor(1000 + Math.random() * 9000);
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const con = require('./conn/dbconn');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/pages'));
app.use('public', express.static('public/pages'));
// require('./registration/sendmail');
// const sendmail = require('./registration/sendmail');
app.get('/',(req,res)=>{
    res.render('signup');
})

app.post("/mail",async (req, res) => {
  const { email, password } = req.body;
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

    con.connect(function (err) {
      if (err) throw err;
      console.log('Connected!');
      
      var sql = 'INSERT INTO users (email, password, otp) VALUES (?, ?, ?)';
      var values = [email, password, otp]; 
      
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log('Record inserted');
        con.end();
      });
    });
    res.render('otpv');
  });

app.post('/otp',(req,res)=>{
  const { user_otp } = req.body;
  const uotp = parseInt(user_otp);
  console.log(otp);
  console.log(user_otp);
  if(user_otp == uotp){
    res.redirect('/home');
  }else{
    console.log("Wrong OTP");
  }

})
  
app.get('/home',(req,res)=>{
  res.render('home');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
