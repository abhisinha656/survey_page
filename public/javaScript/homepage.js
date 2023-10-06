// const questions = document.querySelectorAll(".question");
//   let currentQuestionIndex = 0;

// function showQuestion(index) {
//   questions.forEach((question, i) => {
//     if (i === index) {
//       question.style.display = "block";
//     } else {
//       question.style.display = "none";
//     }
//   });
//   if (index === 0) {
//     document.getElementById("prevButton").style.display = "none";
//   } else {
//     document.getElementById("prevButton").style.display = "block";
//   }
//   if (index === questions.length - 1) {
//     document.getElementById("nextButton").style.display = "none";
//     document.getElementById("submitButton").style.display = "block";
//   } else {
//     document.getElementById("nextButton").style.display = "block";
//     document.getElementById("submitButton").style.display = "none";
//   }
// }

async function getNextQuestion(direction) {
  const responseJSON = JSON.stringify({ direction: direction });
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: responseJSON,
  };

  try {
    const response = await fetch("/nextQuestion", requestOptions);
    const data = await response.json();
    console.log(data);
    console.log("Fetched question:", data.question);
    document.getElementById("question-label").textContent =
      data.question;
    // document.querySelector(".question-label").textContent = data.question;
  } catch (error) {
    console.error("Error fetching next question:", error);
  }
}
//  function nextQuestion() {
//    if (currentQuestionIndex < questions.length - 1) {
//      currentQuestionIndex++;
//      showQuestion(currentQuestionIndex);
//      getNextQuestion();
//      console.log("Next question index:", currentQuestionIndex); // Log the next question index
//    }
//  }

//  function prevQuestion() {
//    if (currentQuestionIndex > 0) {
//      currentQuestionIndex--;
//      showQuestion(currentQuestionIndex);
//      getNextQuestion();
//      console.log("Previous question index:", currentQuestionIndex); // Log the previous question index
//    }
//  }
// showQuestion(currentQuestionIndex); // Show the first question initially

document.getElementById("nextButton").addEventListener("click", () => {
  getNextQuestion("next");
});

document.getElementById("prevButton").addEventListener("click", () => {
  getNextQuestion("previous");
});
