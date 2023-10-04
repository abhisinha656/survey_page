document.getElementById("btnOtp").addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.querySelector(".password").value;
  const fullname = document.getElementById("fname").value;
  const age = document.getElementById("age").value;
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
    age.trim() !== "" &&
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
