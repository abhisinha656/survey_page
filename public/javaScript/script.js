<<<<<<< HEAD
document.getElementById("btnOtp").addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.querySelector(".password").value;
  if (email.trim() !== "" && password.trim() !== "") {
      const data = {
          email: email,
          password: password
      };

      fetch('/mail', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Data could not be sent to the server.');
          }
      })
      .then(responseData => {
          console.log(responseData);
      })
      .catch(error => {
          console.error(error);
      });
      document.getElementById("emailPasswordForm").style.display = "none";
      document.getElementById("otpForm").style.display = "block";
  } else {
      alert("Please fill in both email and password fields.");
  }
});

=======
// Add a click event listener to the "Send OTP" button
document.getElementById("btnOtp").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("emailPasswordForm").style.display = "none";
  document.getElementById("otpForm").style.display = "block";
});
>>>>>>> b9c06c74ea95ed79f8878057e27a566eb1e8ff79
