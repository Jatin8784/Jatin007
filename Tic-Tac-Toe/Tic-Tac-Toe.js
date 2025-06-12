const boxes = document.querySelectorAll(".box");
const rstbtn = document.querySelector("#reset-btn");
const msgcontainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const newbtn = document.querySelector("#new-btn");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was cliked");
    if (turnO) {
      //playerO
      box.textContent = "O";
      turnO = false;
    } else {
      //playerX
      box.textContent = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    let pos1val = boxes[pattern[0]].textContent;
    let pos2val = boxes[pattern[1]].textContent;
    let pos3val = boxes[pattern[2]].textContent;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      }
    }
  }
};
const disablebuttons = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enablebuttons = () => {
  for (let box of boxes) {
    box.disabled = false;
  }
};

const showWinner = (winner) => {
  msg.textContent = "Congratulations, Winner!!" + winner;
  msgcontainer.classList.remove("hide");
};

const resetGame = () => {
  turnO = true;
  enablebuttons();
  msgcontainer.classList.add("hide");
  boxes.forEach((box) => {
    box.textContent = "";
  });
};

newbtn.addEventListener("click", resetGame);
rstbtn.addEventListener("click", resetGame);
