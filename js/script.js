// importing file that have questions
import { questions } from "./questions.js";

//getting all required elements
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = document.querySelector(".btns .quit");
const continueBtn = document.querySelector(".btns .restart");
const quizBox = document.querySelector(".quiz-box");
const queText = document.querySelector(".que-text");
const optionList = document.querySelector(".option-list");

const nextBtn = document.querySelector(".next-btn");
const timeCount = document.querySelector(".timer .timer-sec");
const timeText = document.querySelector(".timer .time-text");
const timeLine = document.querySelector("header .time-line");
const resultBox = document.querySelector(".result-box");
const restartQuizBtn = resultBox.querySelector(".btns .restart");
const quitQuizBtn = resultBox.querySelector(".btns .quit");
const scoreText = resultBox.querySelector(".score-text");

//if Start Quiz Button is clicked
startBtn.addEventListener("click", () => {
  infoBox.classList.add("activeInfo"); //show info box
});

//if Exit Button is clicked
exitBtn.addEventListener("click", () => {
  infoBox.classList.remove("activeInfo"); //hide info box
});

//if continue Button is clicked
continueBtn.addEventListener("click", () => {
  infoBox.classList.remove("activeInfo"); //hide info box
  quizBox.classList.add("activeQuiz"); //show quiz box
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimeline(0);
});

let queCount = 0;
let queNum = 1;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

//if next Button clicked
nextBtn.addEventListener("click", () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNum++;
    showQuestions(queCount);
    queCounter(queNum);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimeline(widthValue);

    nextBtn.style.display = "none";
    timeText.innerHTML = "Time Left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);

    showResultBox();
  }
});

//getting questions and options from array
function showQuestions(index) {
  let queTag = `<span>${questions[index].num}. ${questions[index].question}</span>`;
  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div><div class="option"><span>${questions[index].options[2]}</span></div><div class="option"><span>${questions[index].options[3]}</span></div>`;

  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;

  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].addEventListener("click", optionSelected);

    function optionSelected() {
      clearInterval(counter);
      clearInterval(counterLine);
      let userAnswer = option[i].textContent;
      let correctAnswer = questions[queCount].answer;
      let allOptions = optionList.children.length;
      console.log(userAnswer, correctAnswer);
      if (userAnswer == correctAnswer) {
        userScore += 1;
        // console.log("Answer is correct");
        option[i].classList.add("correct");
        option[i].insertAdjacentHTML(
          "beforeend",
          `<div class="icon tick"><i class="fas fa-check"></i></div>`
        );
      } else {
        console.log("Answer is not correct");
        option[i].classList.add("incorrect");
        option[i].insertAdjacentHTML(
          "beforeend",
          `<div class="icon cross"><i class="fas fa-times"></i></div>`
        );

        //if answer is incorrect then automatically selected the correct answer
        for (let i = 0; i < allOptions; i++) {
          if (optionList.children[i].textContent == correctAnswer) {
            optionList.children[i].classList.add("correct");
            optionList.children[i].insertAdjacentHTML(
              "beforeend",
              `<div class="icon tick"><i class="fas fa-check"></i></div>`
            );
          }
        }
      }

      // once user selected disabled all options
      for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
      }

      nextBtn.style.display = "block";
    }
  }
}

//change questionsCount dynamically
function queCounter(index) {
  const bottomQuesCounter = document.querySelector(".total-que");
  let totalQuesCountTag = `<span><p>${index}</p>of<p>${questions.length}</p>Questions</span>`;
  bottomQuesCounter.innerHTML = totalQuesCountTag;
}

function showResultBox() {
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");

  if (userScore > 3) {
    let scoreTag = `<span>and congrats😎, You got<p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag = `<span>and nice😁, You got <p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag = `<span>and sorry😢, You got only<p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  }
}

restartQuizBtn.addEventListener("click", () => {
  queCount = 0;
  queNum = 1;
  timeValue = 15;
  widthValue = 0;
  userScore = 0;

  resultBox.classList.remove("activeResult");
  infoBox.classList.remove("activeInfo"); //hide info box
  quizBox.classList.add("activeQuiz"); //show quiz box

  showQuestions(queCount);
  queCounter(queNum);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimeline(widthValue);

  nextBtn.style.display = "none";
  timeText.innerHTML = "Time Left";
});

quitQuizBtn.addEventListener("click", () => {
  location.reload();
});

//start timer
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;

    // console.log(timeCount.textContent,timeCount.textContent < 10);
    if (time < 9) {
      timeCount.innerHTML = "0" + timeCount.innerHTML;
    }

    if (time < 0) {
      clearInterval(counter);

      let allOptions = optionList.children.length;
      let correctAnswer = questions[queCount].answer;

      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAnswer) {
          optionList.children[i].classList.add("correct");
          optionList.children[i].insertAdjacentHTML(
            "beforeend",
            `<div class="icon tick"><i class="fas fa-check"></i></div>`
          );
        }
      }

      for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
      }

      nextBtn.style.display = "block";
      timeText.innerHTML = "Time off";
    }
  }
}

//time line
function startTimeline(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 550) {
      clearInterval(counterLine);
    }
  }
}
