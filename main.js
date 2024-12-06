const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newBtn = document.querySelector("#new-game");
const msg = document.querySelector(".msg");
const wins = document.querySelector("#message");

let turn0 = true;
const winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turn0 = true;
    enablebox();
    msg.classList.add("hide");
    wins.innerText = "";
};

const disableBox = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enablebox = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (win) => {
    wins.innerText = `Congratulations! The winner is ${win}`;
    msg.classList.remove("hide");
};

const checkWinner = () => {
    let draw = true; // Flag to check for draw

    winner.forEach((pattern) => {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            disableBox();
            showWinner(pos1);
            draw = false; // Not a draw if someone wins
        }
    });

    // Check for draw (if no empty boxes and no winner)
    if (draw && Array.from(boxes).every((box) => box.innerText !== "")) {
        wins.innerText = "It's a draw!";
        msg.classList.remove("hide");
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
