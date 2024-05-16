"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let startBtn = document.querySelector(".start-box button"), rulesBox = document.querySelector(".rules-box"), backBtn = document.querySelector(".back"), continueBtn = document.querySelector(".continue"), levelBox = document.querySelector(".level-cat"), quizNumIn = document.querySelector(".level-cat input"), levelOp = document.querySelectorAll(".level-cat .level li"), catOp = document.querySelectorAll(".level-cat .category li"), submitBtn = document.querySelector(".submit button"), quizBox = document.querySelector(".quiz-box"), nextBtn = document.querySelector(".quiz-num button"), quizCounterTag = document.querySelector(".quiz-num p"), timer = document.querySelector(".timer"), timerLine = document.querySelector(".timer-line"), resultBox = document.querySelector(".result-box"), replayBtn = document.querySelector(".replay"), quitBtn = document.querySelector(".quit"), resultTag = document.querySelector(".result-box p"), questions;
let quizCount = 0, time = 15, correctAns = 0, counter;
function fetchQuiz(amount, category, difficulty) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            questions = yield response.json();
            questions = questions === null || questions === void 0 ? void 0 : questions.results;
        }
        catch (error) {
            console.error("Fetching Error:", error);
        }
    });
}
startBtn.addEventListener("click", () => {
    rulesBox.classList.add("active");
});
backBtn.addEventListener("click", () => {
    rulesBox.classList.remove("active");
});
continueBtn.addEventListener("click", () => {
    rulesBox.classList.remove("active");
    resultBox.classList.remove("active");
    levelBox.classList.add("active");
});
levelOp.forEach((li) => {
    li.addEventListener("click", () => {
        levelOp.forEach((op) => op.classList.remove("active"));
        li.classList.add("active");
    });
});
catOp.forEach((li) => {
    li.addEventListener("click", () => {
        catOp.forEach((op) => op.classList.remove("active"));
        li.classList.add("active");
    });
});
submitBtn.addEventListener("click", () => {
    var _a, _b, _c, _d, _e;
    let amount = quizNumIn.value;
    let difficulty = (_c = (_b = (_a = document.querySelector(".level-cat .level .active")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase()) !== null && _c !== void 0 ? _c : "";
    let category = (_e = (_d = document.querySelector(".level-cat .category .active")) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : "";
    levelBox.classList.remove("active");
    quizBox.classList.add("active");
    fetchQuiz(amount, category, difficulty).then(() => {
        console.log(questions);
        getQuestions(questions, quizCount);
    });
    startTimer();
});
replayBtn.addEventListener("click", () => {
    quizCount = 0;
    correctAns = 0;
    quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`;
    clearInterval(counter);
    continueBtn.click();
    time = 15;
    clearInterval(counter);
});
quitBtn.addEventListener("click", () => {
    resultBox.classList.remove("active");
    quizCount = 0;
    correctAns = 0;
    quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`;
    clearInterval(counter);
});
timer.innerHTML = `<span>Time Left</span><span class="num">${time > 9 ? time : "0" + time}</span>`;
function startTimer() {
    var _a;
    let timerLineWidth = (_a = timerLine === null || timerLine === void 0 ? void 0 : timerLine.parentElement) === null || _a === void 0 ? void 0 : _a.offsetWidth, step;
    if (timerLineWidth !== undefined) {
        step = timerLineWidth / time;
    }
    let width = 0;
    counter = setInterval(() => {
        timer.innerHTML = `<span>Time Left</span><span class="num">${time > 9 ? time : "0" + time}</span>`;
        if (time > 0) {
            time--;
        }
        else {
            clearInterval(counter);
            nextBtn.click();
        }
        timerLine.style.width = width + "px";
        width += step;
    }, 1000);
}
nextBtn.addEventListener("click", () => {
    if (quizCount < questions.length - 1) {
        quizCount++;
        getQuestions(questions, quizCount);
        time = 15;
        clearInterval(counter);
        startTimer();
        quizCounterTag.innerHTML = `<span>${quizCount + 1}</span>of <span>${questions.length}</span> Questions`;
    }
    else {
        resultBox.classList.add("active");
        quizBox.classList.remove("active");
        if (correctAns > 3) {
            resultTag.innerHTML = `<p>You've completed the Quiz! <br> and nice <i class="fa-regular fa-face-smile"></i>, you got <span>${correctAns}</span> out of <span>${questions.length}</span></p>`;
        }
        else {
            resultTag.innerHTML = `<p>You've completed the Quiz! <br> and, you got <span>${correctAns}</span> out of <span>${questions.length}</span></p>`;
        }
    }
});
function getQuestions(questions, quizNum) {
    var _a, _b, _c, _d, _e;
    quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`;
    let questionTag = document.querySelector(".quiz-content h2");
    questionTag.textContent = `${quizNum + 1}. ${(_a = questions[quizNum]) === null || _a === void 0 ? void 0 : _a.question}`;
    let ansArr = [
        (_b = questions[quizNum]) === null || _b === void 0 ? void 0 : _b.incorrect_answers[0],
        (_c = questions[quizNum]) === null || _c === void 0 ? void 0 : _c.incorrect_answers[1],
        (_d = questions[quizNum]) === null || _d === void 0 ? void 0 : _d.incorrect_answers[2],
        (_e = questions[quizNum]) === null || _e === void 0 ? void 0 : _e.correct_answer,
    ];
    function getRandom() {
        let randomId = Math.floor(Math.random() * ansArr.length);
        let ans = ansArr[randomId];
        ansArr = ansArr.filter((_, id) => id !== randomId);
        return ans;
    }
    let optionsList = document.querySelector(".options-list");
    optionsList.innerHTML = `<div class="option">
                            <li>${getRandom()}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>
                          <div class="option">
                            <li>${getRandom()}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>
                          <div class="option">
                            <li>${getRandom()}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>
                          <div class="option">
                            <li>${getRandom()}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>`;
    let options = document.querySelectorAll(".option"), selectedAns, rightAns;
    options.forEach((op) => {
        op.addEventListener("click", (e) => {
            var _a, _b, _c;
            selectedAns = e.target.textContent;
            rightAns = (_a = questions[quizNum]) === null || _a === void 0 ? void 0 : _a.correct_answer;
            if (selectedAns.trim() == rightAns.trim()) {
                if (e.target.tagName == "LI") {
                    correctAns++;
                    (_b = e.target.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("correct");
                }
                else {
                    e.target.classList.add("correct");
                    correctAns++;
                }
            }
            else {
                if (e.target.tagName == "LI") {
                    (_c = e.target.parentElement) === null || _c === void 0 ? void 0 : _c.classList.add("wrong");
                }
                else {
                    e.target.classList.add("wrong");
                }
            }
            if (op.classList.contains("correct") ||
                op.classList.contains("wrong")) {
                options.forEach((op) => (op.style.pointerEvents = "none"));
            }
            if (op.classList.contains("wrong")) {
                options.forEach((o) => {
                    var _a;
                    if (o.children[0].textContent == ((_a = questions[quizNum]) === null || _a === void 0 ? void 0 : _a.correct_answer)) {
                        o.classList.add("correct");
                    }
                });
            }
            clearInterval(counter);
        });
    });
}
//# sourceMappingURL=main.js.map