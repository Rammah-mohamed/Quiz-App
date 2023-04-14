// get all required element
let startBtn = document.querySelector(".start-box button"),
rulesBox = document.querySelector(".rules-box"),
exitBtn = document.querySelector(".exit"),
continueBtn = document.querySelector(".continue"),
quizBox = document.querySelector(".quiz-box"),
nextBtn = document.querySelector(".quiz-num button"),
quizCounterTag = document.querySelector(".quiz-num p"),
timer = document.querySelector(".timer"),
timerLine = document.querySelector(".timer-line"),
resultBox = document.querySelector(".result-box"),
replayBtn = document.querySelector(".replay"),
quitBtn = document.querySelector(".quit"),
resultTag = document.querySelector(".result-box p");


let quizCount = 0,
time = 10,
correctans = 0,
counter;

// when start button clicked show the rules box
startBtn.addEventListener("click", () => {
  rulesBox.classList.add("active");
})

// when exit button clicked hide rule box
exitBtn.addEventListener("click", () => {
  rulesBox.classList.remove("active");
})

continueBtn.addEventListener("click", () => {
  // when exit button clicked hide rule box and show the quiz box
  rulesBox.classList.remove("active");
  resultBox.classList.remove("active")
  quizBox.classList.add("active");

  //trigger getQuestions and start timer function
  getQuestions();
  startTimer();
})

replayBtn.addEventListener("click", () => {
  //reset values
  quizCount = 0;
  correctans = 0;
  quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`
  clearInterval(counter);
  continueBtn.click()
})

quitBtn.addEventListener("click", () => {
  // reset all values
  resultBox.classList.remove("active");
  quizCount = 0;
  correctans = 0;
  quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`
  clearInterval(counter);
})

//get intial value to the timer
timer.innerHTML = `<span>Time Left</span><span class="num">${time > 9 ? time: "0" + time}</span>`
//start timer
function startTimer() {
  let timerLineWidth = timerLine.parentElement.offsetWidth,
  step = timerLineWidth / time,
  width = 0;
  counter = setInterval(() => {
    timer.innerHTML = `<span>Time Left</span><span class="num">${time > 9 ? time: "0" + time}</span>`
    if(time > 0) {
      time--;
    } else {
      clearInterval(counter);
      nextBtn.click()
    }

    //start the timer line movement
    timerLine.style.width = width + "px";
    width += step;
  }, 1000)
}

//set intial value to the question counter
quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`

//when next button clicked get the next question
  nextBtn.addEventListener("click", () => {
    if (quizCount < questions.length - 1) {
      quizCount++;
      getQuestions(quizCount);
  
      //reset timer
      time = 10;
      clearInterval(counter);
      startTimer();
      //count the number of questions left
      quizCounterTag.innerHTML = `<span>${quizCount + 1}</span>of <span>${questions.length}</span> Questions`
    } else {
      resultBox.classList.add("active");
      quizBox.classList.remove("active");

      //get the results
      if (continueBtn > 3) {
        resultTag.innerHTML = `<p>You've completed the Quiz! <br> and nice <i class="fa-regular fa-face-smile"></i>, you got <span>${correctans}</span> out of <span>${questions.length}</span></p>`
      } else {
        resultTag.innerHTML = `<p>You've completed the Quiz! <br> and, you got <span>${correctans}</span> out of <span>${questions.length}</span></p>`
      }
    }
  })

//getting questions and options
function getQuestions() {
  let questionTag = document.querySelector(".quiz-content h2");
  questionTag.textContent = `${questions[quizCount].num}. ${questions[quizCount].quiz}`

  let optionsList = document.querySelector(".options-list");
  optionsList.innerHTML = `<div class="option">
                            <li>${questions[quizCount].options[0]}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>
                          <div class="option">
                            <li>${questions[quizCount].options[1]}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>
                          <div class="option">
                            <li>${questions[quizCount].options[2]}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>
                          <div class="option">
                            <li>${questions[quizCount].options[3]}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>`

  //get the selected answer
  let options = document.querySelectorAll(".option"),
  selectedAns,
  rightAns;

  options.forEach((op) => {
    op.addEventListener("click", e => {
      selectedAns = e.target.textContent;
      rightAns = questions[quizCount].answer
      if(selectedAns.trim() == rightAns.trim()) {
        if (e.target.tagName == "LI") {
          correctans++;
          e.target.parentElement.classList.add("correct")
        }else {
          e.target.classList.add("correct")
          correctans++;
        }
      } else {
        if (e.target.tagName == "LI") {
          e.target.parentElement.classList.add("wrong")
        } else {
          e.target.classList.add("wrong");
        }
      }
      //disabele all option once one is selected
      if(op.classList.contains("correct") || op.classList.contains("wrong")){
        options.forEach(op => op.style.pointerEvents= "none")
      }

      //if the anwser is incorrect automatically select the correct one
      if (op.classList.contains("wrong")) {
        options.forEach(o => {
          if (o.children[0].textContent == questions[quizCount].answer) {
            o.classList.add("correct")
          }
        })
      }

      //stop the timer
      clearInterval(counter);
    })
  })
}