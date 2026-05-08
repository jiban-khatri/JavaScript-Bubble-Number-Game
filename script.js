const numContainer = document.querySelector(".num-container");
const startBtn = document.querySelector(".start-btn");
const quitBox = document.querySelector(".quit-box");
const yesBtn = document.querySelector(".yes")
const noBtn = document.querySelector(".no")
const confirmBtn = document.querySelector(".confirm-btn")
const timer = document.querySelector(".timer-box")
const targetNum = document.querySelector(".target-num")
const scoreBox = document.querySelector(".score-box")
const finalScoreBox = document.querySelector(".final-score-box")
const finalScore = document.querySelector(".final-score")
const scoreOkBtn = document.querySelector(".score-ok-btn")
const freeze = document.getElementById("freeze")


let numBox
// Assign Random Numbers
for (let i = 1; i <= 170; i++) {
  numBox = document.createElement("div");
  numBox.className = "num-box";

  numContainer.appendChild(numBox);

  let number = Math.floor(Math.random() * 10) + 1;
  numBox.innerHTML = number;
}




// function to display quit
function displayBtns(task) {
  if (task === "startGame") {

    startGame()

    setTimeout(() => {
      startBtn.className = "close-btn";
      startBtn.innerHTML = "Quit Game";
    }, 700);

  }

  if (task === "quitGame") {

    freeze.style.display = "block"

    yesBtn.addEventListener("click", function (e) {
      quitBox.style.display = "none";
      freeze.style.display = "none"

      window.location.reload()
    })


    noBtn.addEventListener("click", function () {
      quitBox.style.display = "none";
      freeze.style.display = "none"

    })
  }
}




// play the audio in start click
startBtn.addEventListener("click", (e) => {

  if (e.target.className === "start-btn") {
    const audio = new Audio("start.mp3");
    audio.play();

    displayBtns("startGame");
  }
  if (e.target.className === "close-btn") {
    quitBox.style.display = "flex";
    displayBtns("quitGame");
  }
});


// Play audio in number click
numContainer.addEventListener("click", (e) => {
  const audio = new Audio("click.mp3");

  if (e.target.className === "num-box") {
    audio.play();
  }
});



function startGame() {

  let i = 15;
  let interval = setInterval(() => {
    timer.innerHTML = i;

    i--;
    if (i < 0) {
      clearInterval(interval)
      stopGame()

      freeze.style.display = "block"
      finalScoreBox.style.display = "flex";
    }
  }, 1000);

  showTarget()
  checkNum()
}



function showTarget() {
  let num = Math.floor(Math.random() * 10) + 1;
  targetNum.innerHTML = num;
}


function stopGame() {
  targetNum.innerHTML = ""
}


let clickedNum;
function checkNum() {
  numContainer.addEventListener("click", function (e) {
    if (e.target.className === "num-box") {
      clickedNum = Number(e.target.innerHTML)

      if (clickedNum === Number(targetNum.innerHTML)) {
        showTarget()
        updateScore()
      }
    }
  })
}


let score
function updateScore() {
  score = Number(scoreBox.innerHTML);
  score++;

  finalScore.innerHTML = score;
  scoreBox.innerHTML = score;
}


scoreOkBtn.addEventListener("click", function () {
  finalScoreBox.style.display = "none";
  freeze.style.display = "none"

  targetNum.innerHTML = 0
  timer.innerHTML = 0
  scoreBox.innerHTML = 0
  setTimeout(() => {
    startBtn.className = "start-btn";
    startBtn.innerHTML = "Start Game";
  }, 500);

})




