let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = [];
let startTime = Date.now();

const questions = generateQuestions(15);
displayQuestion();

document.getElementById('submit').addEventListener('click', function() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  checkAnswer(userAnswer);
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    displayResults();
  }
});

function generateQuestions(numQuestions) {
  const questions = [];
  for (let i = 0; i < numQuestions; i++) {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    questions.push({ num1, num2, answer: num1 * num2 });
  }
  return questions;
}

function displayQuestion() {
  document.getElementById('question').innerText = `What is ${questions[currentQuestion].num1} x ${questions[currentQuestion].num2}?`;
  document.getElementById('answer').value = '';
  document.getElementById('progress').innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function checkAnswer(userAnswer) {
  if (userAnswer === questions[currentQuestion].answer) {
    correctAnswers++;
  } else {
    wrongAnswers.push({ question: currentQuestion, correctAnswer: questions[currentQuestion].answer });
  }
  currentQuestion++;
}

function displayResults() {
  const endTime = Date.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  document.getElementById('quiz-container').style.display = 'none';
  const resultContainer = document.getElementById('result');
  resultContainer.style.display = 'block';
  resultContainer.innerHTML = `<h3>You've finished! Here are your results:</h3>
                                <p>Correct Answers: ${correctAnswers}</p>
                                <p>Wrong Answers: ${wrongAnswers.length}. <br> ${wrongAnswers.map(wa => `Question ${wa.question + 1} = ${questions[wa.question].num1} x ${questions[wa.question].num2}, Correct Answer: ${wa.correctAnswer}`).join('<br>')}</p>
                                <p>Time taken: ${timeTaken} seconds</p>`;
}
