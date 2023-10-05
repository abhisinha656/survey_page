document.getElementById("btnOtp").addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.querySelector(".password").value;
  const fullname = document.getElementById("fname").value;
  const age = validateDOB();
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  let genderRadio;
  if (gender) {
    genderRadio = gender.value;
  }

  const dob = document.getElementById("dob").value;
  const student_status = document.getElementById("student_status").value;
  const disability_status = document.getElementById("disability_status").value;

  if (
    email.trim() !== "" &&
    password.trim() !== "" &&
    fullname.trim() !== "" &&
    age !== null &&
    city.trim() !== "" &&
    country.trim() !== "" &&
    gender !== null &&
    dob.trim() !== "" &&
    student_status.trim() !== "" &&
    disability_status.trim() !== ""
  ) {
    const data = {
      email: email,
      password: password,
      fullname: fullname,
      age: age,
      city: city,
      country: country,
      gender: genderRadio,
      dob: dob,
      student_status: student_status,
      disability_status: disability_status,
    };
    console.log(data);
    fetch("/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Data could not be sent to the server.");
        }
      })
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
    document.getElementById("emailPasswordForm").style.display = "none";
    document.getElementById("otpForm").style.display = "block";
  } else {
    alert("Please fill in all required fields.");
  }
});

function validateEmail() {
  var emailInput = document.getElementById("email");
  var emailError = document.getElementById("emailError");
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = "Invalid email address";
  } else {
    emailError.textContent = "";
  }
}
function validatePassword() {
  var passwordInput = document.querySelector(".password");
  var passwordError = document.getElementById("passwordError");
  var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!passwordPattern.test(passwordInput.value)) {
    passwordError.textContent =
      "Password must contain at least 8 characters and mix of uppercase, lowercase and number";
  } else {
    passwordError.textContent = "";
  }
}

function validateDOB() {
  var dobInput = document.getElementById("dob");
  var dobError = document.getElementById("dobError");
  var dobValue = dobInput.value;
  var dobDate = new Date(dobValue);
  var currentDate = new Date();

  // Check if the input is a valid date
  if (isNaN(dobDate.getTime())) {
    dobError.textContent = "Invalid date format";
    dobInput.focus();
    return null;
  }

  // Calculate age as previously shown
  var age = currentDate.getFullYear() - dobDate.getFullYear();
  if (
    currentDate.getMonth() < dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() < dobDate.getDate())
  ) {
    age--;
  }

  // Check if the age is less than 17 or greater than 28
  if (age < 17 || age > 28) {
    dobError.textContent = "You are not eligible";
    dobInput.focus();
    return null;
  } else {
    dobError.textContent = "";
    return age;
  }
}
