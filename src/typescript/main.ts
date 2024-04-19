//import questions
import { questions } from "../../dist/js/questions.js";

// get all required element
let startBtn = <HTMLButtonElement>document.querySelector(".start-box button"),
	rulesBox = <HTMLDivElement>document.querySelector(".rules-box"),
	exitBtn = <HTMLButtonElement>document.querySelector(".exit"),
	continueBtn = <HTMLButtonElement>document.querySelector(".continue"),
	quizBox = <HTMLDivElement>document.querySelector(".quiz-box"),
	nextBtn = <HTMLButtonElement>document.querySelector(".quiz-num button"),
	quizCounterTag = <HTMLParagraphElement>document.querySelector(".quiz-num p"),
	timer = <HTMLDivElement>document.querySelector(".timer"),
	timerLine = <HTMLDivElement>document.querySelector(".timer-line"),
	resultBox = <HTMLDivElement>document.querySelector(".result-box"),
	replayBtn = <HTMLButtonElement>document.querySelector(".replay"),
	quitBtn = <HTMLButtonElement>document.querySelector(".quit"),
	resultTag = <HTMLParagraphElement>document.querySelector(".result-box p");

let quizCount: number = 0,
	time: number = 10,
	correctAns: number = 0,
	counter: number;

// when start button clicked show the rules box
startBtn.addEventListener("click", (): void => {
	rulesBox.classList.add("active");
});

// when exit button clicked hide rule box
exitBtn.addEventListener("click", (): void => {
	rulesBox.classList.remove("active");
});

continueBtn.addEventListener("click", (): void => {
	// when exit button clicked hide rule box and show the quiz box
	rulesBox.classList.remove("active");
	resultBox.classList.remove("active");
	quizBox.classList.add("active");

	//trigger getQuestions and start timer function
	getQuestions(quizCount);
	startTimer();
});

replayBtn.addEventListener("click", (): void => {
	//reset values
	quizCount = 0;
	correctAns = 0;
	quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`;
	clearInterval(counter);
	continueBtn.click();
});

quitBtn.addEventListener("click", (): void => {
	// reset all values
	resultBox.classList.remove("active");
	quizCount = 0;
	correctAns = 0;
	quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`;
	clearInterval(counter);
});

//get intial value to the timer
timer.innerHTML = `<span>Time Left</span><span class="num">${time > 9 ? time : "0" + time}</span>`;
//start timer
function startTimer(): void {
	let timerLineWidth = timerLine?.parentElement?.offsetWidth,
		step: number;
	if (timerLineWidth !== undefined) {
		step = timerLineWidth / time;
	}
	let width: number = 0;
	counter = setInterval((): void => {
		timer.innerHTML = `<span>Time Left</span><span class="num">${
			time > 9 ? time : "0" + time
		}</span>`;
		if (time > 0) {
			time--;
		} else {
			clearInterval(counter);
			nextBtn.click();
		}

		//start the timer line movement
		timerLine.style.width = width + "px";
		width += step;
	}, 1000);
}

//set intial value to the question counter
quizCounterTag.innerHTML = `<span>1</span>of <span>${questions.length}</span> Questions`;

//when next button clicked get the next question
nextBtn.addEventListener("click", (): void => {
	if (quizCount < questions.length - 1) {
		quizCount++;
		getQuestions(quizCount);

		//reset timer
		time = 10;
		clearInterval(counter);
		startTimer();
		//count the number of questions left
		quizCounterTag.innerHTML = `<span>${quizCount + 1}</span>of <span>${
			questions.length
		}</span> Questions`;
	} else {
		resultBox.classList.add("active");
		quizBox.classList.remove("active");

		//get the results
		if (correctAns > 3) {
			resultTag.innerHTML = `<p>You've completed the Quiz! <br> and nice <i class="fa-regular fa-face-smile"></i>, you got <span>${correctAns}</span> out of <span>${questions.length}</span></p>`;
		} else {
			resultTag.innerHTML = `<p>You've completed the Quiz! <br> and, you got <span>${correctAns}</span> out of <span>${questions.length}</span></p>`;
		}
	}
});

//getting questions and options
function getQuestions(quizNum): void {
	let questionTag = <HTMLHeadingElement>document.querySelector(".quiz-content h2");
	questionTag.textContent = `${questions[quizNum].num}. ${questions[quizNum].quiz}`;

	let optionsList = <HTMLDivElement>document.querySelector(".options-list");
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

	//get the selected answer
	let options = <NodeList>document.querySelectorAll(".option"),
		selectedAns,
		rightAns: string;

	options.forEach((op) => {
		op.addEventListener("click", (e): void => {
			selectedAns = (e.target as HTMLDivElement).textContent;
			rightAns = questions[quizNum].answer;
			if (selectedAns.trim() == rightAns.trim()) {
				if ((e.target as HTMLLIElement).tagName == "LI") {
					correctAns++;
					(e.target as HTMLLIElement).parentElement?.classList.add("correct");
				} else {
					(e.target as HTMLLIElement).classList.add("correct");
					correctAns++;
				}
			} else {
				if ((e.target as HTMLLIElement).tagName == "LI") {
					(e.target as HTMLLIElement).parentElement?.classList.add("wrong");
				} else {
					(e.target as HTMLLIElement).classList.add("wrong");
				}
			}
			//disabele all option once one is selected
			if (
				(op as HTMLLIElement).classList.contains("correct") ||
				(op as HTMLLIElement).classList.contains("wrong")
			) {
				options.forEach((op) => ((op as HTMLLIElement).style.pointerEvents = "none"));
			}

			//if the anwser is incorrect automatically select the correct one
			if ((op as HTMLLIElement).classList.contains("wrong")) {
				options.forEach((o) => {
					if ((o as HTMLLIElement).children[0].textContent == questions[quizNum].answer) {
						(o as HTMLLIElement).classList.add("correct");
					}
				});
			}

			//stop the timer
			clearInterval(counter);
		});
	});
}
