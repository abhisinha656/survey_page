    const questions = document.querySelectorAll(".question");
      let currentQuestionIndex = 0;

      function showQuestion(index) {
        questions.forEach((question, i) => {
          if (i === index) {
            question.style.display = "block";
          } else {
            question.style.display = "none";
          }
        });
        if (index === 0) {
          document.getElementById("prevButton").style.display = "none";
        } else {
          document.getElementById("prevButton").style.display = "block";
        }
        if (index === questions.length - 1) {
          document.getElementById("nextButton").style.display = "none";
          document.getElementById("submitButton").style.display = "block";
        } else {
          document.getElementById("nextButton").style.display = "block";
          document.getElementById("submitButton").style.display = "none";
        }
      }

      function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          showQuestion(currentQuestionIndex);
        }
      }

      function prevQuestion() {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          showQuestion(currentQuestionIndex);
        }
      }

      showQuestion(currentQuestionIndex); // Show the first question initially
