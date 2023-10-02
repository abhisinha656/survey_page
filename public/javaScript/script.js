// Add a click event listener to the "Send OTP" button
document.getElementById("btnOtp").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("emailPasswordForm").style.display = "none";
  document.getElementById("otpForm").style.display = "block";
});
