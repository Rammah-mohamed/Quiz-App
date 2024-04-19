import { questions } from "../../dist/js/questions.js";
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
	correctAns = 0,
	counter;
startBtn.addEventListener("click", () => {
	rulesBox.classList.add("active");
});
exitBtn.addEventListener("click", () => {
	rulesBox.classList.remove("active");
});
continueBtn.addEventListener("click", () => {
	rulesBox.classList.remove("active");
	resultBox.classList.remove("active");
	quizBox.classList.add("active");
	getQuestions(quizCount);
	startTimer();
});
replayBtn.addEventListener("click", () => {
	quizCount = 0;
	correctAns = 0;
	quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`;
	clearInterval(counter);
	continueBtn.click();
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
	let timerLineWidth =
			(_a = timerLine === null || timerLine === void 0 ? void 0 : timerLine.parentElement) ===
				null || _a === void 0
				? void 0
				: _a.offsetWidth,
		step;
	if (timerLineWidth !== undefined) {
		step = timerLineWidth / time;
	}
	let width = 0;
	counter = setInterval(() => {
		timer.innerHTML = `<span>Time Left</span><span class="num">${
			time > 9 ? time : "0" + time
		}</span>`;
		if (time > 0) {
			time--;
		} else {
			clearInterval(counter);
			nextBtn.click();
		}
		timerLine.style.width = width + "px";
		width += step;
	}, 1000);
}
quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`;
nextBtn.addEventListener("click", () => {
	if (quizCount < questions.length - 1) {
		quizCount++;
		getQuestions(quizCount);
		time = 10;
		clearInterval(counter);
		startTimer();
		quizCounterTag.innerHTML = `<span>${quizCount + 1}</span>of <span>${
			questions.length
		}</span> Questions`;
	} else {
		resultBox.classList.add("active");
		quizBox.classList.remove("active");
		if (correctAns > 3) {
			resultTag.innerHTML = `<p>You've completed the Quiz! <br> and nice <i class="fa-regular fa-face-smile"></i>, you got <span>${correctAns}</span> out of <span>${questions.length}</span></p>`;
		} else {
			resultTag.innerHTML = `<p>You've completed the Quiz! <br> and, you got <span>${correctAns}</span> out of <span>${questions.length}</span></p>`;
		}
	}
});
function getQuestions(quizNum) {
	let questionTag = document.querySelector(".quiz-content h2");
	questionTag.textContent = `${questions[quizNum].num}. ${questions[quizNum].quiz}`;
	let optionsList = document.querySelector(".options-list");
	optionsList.innerHTML = `<div class="option">
                            <li>${questions[quizNum].options[0]}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>
                          <div class="option">
                            <li>${questions[quizNum].options[1]}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>
                          <div class="option">
                            <li>${questions[quizNum].options[2]}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>
                          <div class="option">
                            <li>${questions[quizNum].options[3]}</li>
                            <i class="fa-regular fa-circle-check check"></i>
                            <i class="fa-regular fa-circle-xmark cross"></i>
                          </div>`;
	let options = document.querySelectorAll(".option"),
		selectedAns,
		rightAns;
	options.forEach((op) => {
		op.addEventListener("click", (e) => {
			var _a, _b;
			selectedAns = e.target.textContent;
			rightAns = questions[quizNum].answer;
			if (selectedAns.trim() == rightAns.trim()) {
				if (e.target.tagName == "LI") {
					correctAns++;
					(_a = e.target.parentElement) === null || _a === void 0
						? void 0
						: _a.classList.add("correct");
				} else {
					e.target.classList.add("correct");
					correctAns++;
				}
			} else {
				if (e.target.tagName == "LI") {
					(_b = e.target.parentElement) === null || _b === void 0
						? void 0
						: _b.classList.add("wrong");
				} else {
					e.target.classList.add("wrong");
				}
			}
			if (op.classList.contains("correct") || op.classList.contains("wrong")) {
				options.forEach((op) => (op.style.pointerEvents = "none"));
			}
			if (op.classList.contains("wrong")) {
				options.forEach((o) => {
					if (o.children[0].textContent == questions[quizNum].answer) {
						o.classList.add("correct");
					}
				});
			}
			clearInterval(counter);
		});
	});
}
//# sourceMappingURL=main.js.map
