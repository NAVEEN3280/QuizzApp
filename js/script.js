let currentQuiz = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;

// Success and failure messages
const successMessages = [
  "Amazing! 🎉 You're a genius!",
  "Wow! 🎯 That was brilliant!",
  "Boom! 💥 You nailed it!",
  "Correct! 🚀 Keep going!",
  "Fantastic! 🏆 You got it!",
];

const failureMessages = [
  "Oops! 😅 The correct answer is: ",
  "Almost! 🚀 Try again next time! The right answer is: ",
  "Nice attempt! 🔥 But the correct answer is: ",
  "You'll get it next time! 🎯 The right answer is: ",
  "Don't give up! 💪 The answer is: ",
];

function startQuiz(topic) {
  document.getElementById("topic-selection").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");

  currentQuiz = shuffleArray(quizData[topic]);
  currentQuestionIndex = 0;
  correctAnswers = 0;

  loadQuestion();
}

function loadQuestion() {
  let questionData = currentQuiz[currentQuestionIndex];
  document.getElementById("question-text").textContent = questionData.question;

  let optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  shuffleArray(questionData.options).forEach((option) => {
    let button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, questionData.answer);
    optionsContainer.appendChild(button);
  });

  let feedback = document.getElementById("feedback");
  feedback.textContent = "";
  feedback.className = ""; // Remove previous animations

  document.getElementById("next-btn").classList.add("hidden");
}

function checkAnswer(selected, correct) {
  let feedback = document.getElementById("feedback");

  // Remove and re-add the class to force re-trigger animation
  feedback.classList.remove("correct", "wrong");
  void feedback.offsetWidth; // Forces a reflow to restart animation

  if (selected === correct) {
    feedback.textContent = randomMessage(successMessages);
    feedback.classList.add("correct");
    correctAnswers++; // ✅ Fix: Count correct answers properly
  } else {
    feedback.textContent = randomMessage(failureMessages) + correct;
    feedback.classList.add("wrong");
  }

  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  let totalQuestions = currentQuiz.length;
  let wrongAnswers = totalQuestions - correctAnswers;

  document.getElementById("result-text").innerHTML = `
        🎯 You got <b>${correctAnswers}</b> right and <b>${wrongAnswers}</b> wrong! <br>
        ${
          correctAnswers === totalQuestions
            ? "You're a genius! 🚀"
            : "Great effort! Try again! 😃"
        }
    `;
}

function restartQuiz() {
  document.getElementById("result-container").classList.add("hidden");
  document.getElementById("topic-selection").classList.remove("hidden");
}

function randomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
