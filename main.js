//variables
let quizObj = [];
let quizNum = 0;
let quizCount = document.querySelector(".quiz-info .quiz-count");
let bulletsContainer = document.querySelector(".bullets");
let bulletsSpans = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let quizAreaHead = document.querySelector(".quiz-area h2");
let anwserArea = document.querySelector(".anwser-area");
let submit = document.querySelector(".submit");
let anwsers = document.getElementsByName("quiz");
let result = document.querySelector(".result");
let timer = document.querySelector(".timer");
let countDownInteval;
// initial data
let currentQuiz;
let quizArr = [];
let currentBullet = 1;
let rightAnwser = 0;
// get data from api funcion
function getQuizData() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            quizObj = JSON.parse(request.responseText);
            quizNum = quizObj[0].length;
            createBullets(quizNum);
            countDown(2);
            insertQuiz(quizObj);
            checkAnwser(quizObj);
        }
    }
    request.open("GET", "./quiz.json", true);
    request.send();
}
// trigger getQuizData function
getQuizData();
//create bullets function
function createBullets(num) {
    quizCount.innerHTML = num;
    for (let i = 1; i <= num; i++) {
        let bullet = document.createElement("span");
        bulletsSpans.appendChild(bullet);
        if (i === 1) {
            bullet.className = "on";
        }
    }
}
//randomize quiz function
function RandomizeQuiz(num) {
    if (quizArr.length === 0) {
        console.log
        for (let i = 1; i <= num; i++) {
            quizArr.push(i);
        }
    }
    let randomIndex = Math.floor(Math.random() * quizArr.length);
    currentQuiz = quizArr[randomIndex];
    console.log(quizArr);
    quizArr = quizArr.filter(e => quizArr.indexOf(e) !== randomIndex)

}
//insert quiz function
function insertQuiz(obj) {
    if (+quizCount.innerHTML > 0) {
        //add quiz
        RandomizeQuiz(quizNum);
        quizArea.innerHTML = obj[0][currentQuiz - 1].title;
        //add anwsers
        for (let i = 1; i <= 4; i++) {
            let anwserDiv = document.createElement("div");
            anwserDiv.className = "anwser";
            let input = document.createElement("input");
            input.type = "radio";
            input.name = "quiz";
            input.id = `answer_${i}`
            input.dataset.anwser = obj[0][currentQuiz - 1][`anwser_${i}`];
            i === 1 ? input.checked = true : false;
            let label = document.createElement("label");
            label.htmlFor = `answer_${i}`;
            label.innerHTML = obj[0][currentQuiz - 1][`anwser_${i}`];
            anwserDiv.appendChild(input);
            anwserDiv.appendChild(label);
            anwserArea.appendChild(anwserDiv);
        }
    }
}
// check anwser and set canvas for next quiz and show result function
function checkAnwser(obj) {
    let choosenAnwser;
    submit.onclick = () => {
        //check the right anwser;
        for (let i = 1; i <= 4; i++) {
            if (anwsers[i - 1].checked) {
                choosenAnwser = anwsers[i - 1].dataset.anwser;
            }
        }
        if (choosenAnwser === obj[0][currentQuiz - 1].rAnwser) {
            rightAnwser++;
        }
        //set the canvas;
        anwserArea.innerHTML = '';
        quizArea.innerHTML = '';
        +quizCount.innerHTML--;
        insertQuiz(quizObj);
        //bullets active
        if (+quizCount.innerHTML > 0) {
            currentBullet++;
            bulletsSpans.children[currentBullet - 1].className = "on";
        }
        //set timeer
        clearInterval(countDownInteval);
        countDown(2);
        // remove canvas after last quiz
        if (+quizCount.innerHTML === 0) {
            anwserArea.remove();
            quizArea.remove();
            timer.remove();
            submit.remove();
            bulletsContainer.remove();
            //show results
            result.style.display = "block";
            if (rightAnwser === quizNum) {
                result.innerHTML = `<span class="perfect">Perfect</span> you anwser ${rightAnwser} from 10`;
            } else if (rightAnwser >= quizNum / 2 && rightAnwser !== quizNum) {
                result.innerHTML = `<span class="good">good</span> you anwser ${rightAnwser} from 10`;
            } else {
                result.innerHTML = `<span class="bad">bad</span> you anwser ${rightAnwser} from 10`;
            }
        }
    }
}
// countDown function
function countDown(duration) {
    if (+quizCount.innerHTML > 0) {
        let min, sec;
        countDownInteval = setInterval(() => {
            min = parseInt(duration / 60);
            sec = parseInt(duration % 60);
            timer.innerHTML = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
            if (--duration < 0) {
                clearInterval(countDownInteval);
                submit.click();
            }
        }, 1000)
    }
}