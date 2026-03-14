const container = document.getElementById("container");
const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medium");
const hardButton = document.getElementById("hard");
const levelSelectionContainer = document.querySelector(
  ".level-selection-container",
);
const difficultyLabel = document.getElementById("difficulty-label");
const healthLabel = document.getElementById("health");
const hint = document.getElementById("hint");
let inputGuess = document.getElementById("input-guess");
const decreaseHandler = document.getElementById("decrease-handler");
const increaseHandler = document.getElementById("increase-handler");

document.querySelector(".level-selection-container").classList.remove("active");
document.getElementById("container").classList.add("active");

const resetButton = document.createElement("button");
resetButton.innerText = "Reset";
resetButton.classList.add("handler");
resetButton.addEventListener("click", resetGame);

container.style.display = "none";

let maxNumber;

easyButton.addEventListener("click", () => {
  const config = setDifficulty("easy");
  container.classList.add("container");
  container.style.display = "block";
  difficultyLabel.innerText = "Difficulty: Easy";
  startGame(config);
  return (maxNumber = config.maxNumber);
});

mediumButton.addEventListener("click", () => {
  const config = setDifficulty("medium");
  container.classList.add("container");
  difficultyLabel.innerText = "Difficulty: Medium";
  startGame(config);
  return (maxNumber = config.maxNumber);
});

hardButton.addEventListener("click", () => {
  const config = setDifficulty("hard");
  container.classList.add("container");
  difficultyLabel.innerText = "Difficulty: Hard";
  startGame(config);
  return (maxNumber = config.maxNumber);
});

const setDifficulty = (difficulty) => {
  let maxNumber, health;
  if (difficulty.toLocaleLowerCase().trim() === "easy") {
    console.log("kamu memilih kesulitan: mudah");
    maxNumber = 10;
    health = 7;
    healthLabel.innerText = `Health: ${health}`;
    difficultyLabel.innerText = "Easy";
  } else if (difficulty.toLocaleLowerCase().trim() === "medium") {
    console.log("kamu memilih kesulitan: sedang");
    maxNumber = 15;
    health = 5;
    healthLabel.innerText = `Health: ${health}`;
  } else if (difficulty.toLocaleLowerCase().trim() === "hard") {
    console.log("kamu memilih kesulitan: sulit");
    maxNumber = 20;
    health = 3;
    healthLabel.innerText = `Health: ${health}`;
  }

  let computerNum = Math.floor(Math.random() * maxNumber) + 1;
  return { maxNumber, health, computerNum };
};

const validateInput = (input, max) => {
  if (!input || Number(input) <= 0 || Number(input) > max || isNaN(input)) {
    alert(`Masukkan angka antara 1-${max}!`);
    return false;
  }
  return true;
};

const checkSameNum = (num, arr) => {
  if (arr.includes(num)) {
    console.log("=== kamu menjawab dengan jawaban yang sama ===");
    return false;
  }
};

const checkGuess = (comp, user) => {
  if (Number(user) === Number(comp)) {
    return true;
  } else {
    console.log(`${user} salah, coba lagi dan`);
    if (Number(user) - comp > 0) {
      console.log("kurangi angkanya!");
      hint.innerText = "To High!";
    } else {
      console.log("naikkan angkanya!!");
      hint.innerText = "To Small";
    }
    return false;
  }
};

let currentGame = null;

const decreaseGuess = () => {
  let current = Number(inputGuess.value) || 1;
  if (current > 1) {
    inputGuess.value = current - 1;
  }
};

decreaseHandler.addEventListener("click", decreaseGuess);

const increaseGuess = () => {
  let current = Number(inputGuess.value) || 1;
  if (current < maxNumber) {
    inputGuess.value = current + 1;
  }
  console.log("clicked");
};

increaseHandler.addEventListener("click", increaseGuess);

function startGame(config) {
  levelSelectionContainer.style.display = "none";
  container.style.display = "block";

  let gameState = {
    userHealth: config.health,
    score: 0,
    guesses: [],
    isCorrect: false,
    computerNum: config.computerNum,
    maxNumber: config.maxNumber,
  };

  currentGame = gameState;

  inputGuess.min = 1;
  inputGuess.max = gameState.maxNumber;
  inputGuess.value = 1;

  const buttonSubmit = document.createElement("button");
  buttonSubmit.innerText = "Submit!";
  buttonSubmit.classList.add("handler");
  container.querySelector(".handler-container").append(buttonSubmit);

  buttonSubmit.addEventListener("click", () => {
    const userValue = parseInt(inputGuess.value);
    if (!validateInput(userValue, gameState.maxNumber)) return;

    if (checkSameNum(userValue, gameState.guesses) === false) return;
    gameState.guesses.push(userValue);

    gameState.isCorrect = checkGuess(gameState.computerNum, userValue);

    if (!gameState.isCorrect) {
      gameState.userHealth--;
      console.log(`health: ${gameState.userHealth}`);
      healthLabel.innerText = `Health: ${gameState.userHealth}`;
      if (gameState.userHealth === 0) {
        console.log(
          `kamu kehabisan kesempatan! \n jawabannya: ${gameState.computerNum}`,
        );
        container.querySelector(".handler-container").append(resetButton);
        buttonSubmit.remove();
        increaseHandler.remove();
        decreaseHandler.remove();
      }
    } else {
      alert(`kamu berhasil nebak, jawabannya: ${gameState.computerNum}`);
      container.querySelector(".handler-container").append(resetButton);
      buttonSubmit.remove();
      console.log("kamu menang nih, mau main lagi ga?");
      document.getElementById("announcement").innerText =
        "kamu menang nih, mau main lagi ga?";
      increaseHandler.disabled = true;
      decreaseHandler.disabled = true;
    }
  });
}

function resetGame() {
  resetButton.remove();
  container.style.display = "none";
  container.classList.remove("container");
  levelSelectionContainer.style.display = "flex";
  document.getElementById("announcement").innerText = "";
  hint.innerText = "";
  currentGame = null;
  increaseHandler.disabled = false;
  decreaseHandler.disabled = false;
  increaseHandler.removeEventListener;
  decreaseHandler.removeEventListener;
}
