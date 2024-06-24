let throwCounter = 3;
let diceRolled = false;
const heldDices = [false, false, false, false, false];
let rolledNumbers = [0, 0, 0, 0, 0];
let scoreHeld = false;
let bonus = false;

document.getElementById("diceBtn").addEventListener("click", throwDices);
document.getElementById("next").addEventListener("click", nextTurn);
document.getElementById("scoreInputAces").addEventListener("click", holdScores);
document.getElementById("scoreInputTwos").addEventListener("click", holdScores);
document
  .getElementById("scoreInputThrees")
  .addEventListener("click", holdScores);
document
  .getElementById("scoreInputFours")
  .addEventListener("click", holdScores);
document
  .getElementById("scoreInputFives")
  .addEventListener("click", holdScores);
document
  .getElementById("scoreInputSixes")
  .addEventListener("click", holdScores);
document.getElementById("scoreInputToak").addEventListener("click", holdScores);
document.getElementById("scoreInputFoak").addEventListener("click", holdScores);
document
  .getElementById("scoreInputFullHouse")
  .addEventListener("click", holdScores);
document.getElementById("scoreInputSs").addEventListener("click", holdScores);
document.getElementById("scoreInputLs").addEventListener("click", holdScores);
document
  .getElementById("scoreInputYahtzee")
  .addEventListener("click", holdScores);
document
  .getElementById("scoreInputChance")
  .addEventListener("click", holdScores);

function addEventListeners() {
  const scoreElements = document.querySelectorAll(".scoreInput");
  scoreElements.forEach((element) => {
    if (!element.classList.contains("heldScore")) {
      element.addEventListener("click", holdScores);
    }
  });
}

function removeScoreEventListeners() {
  const scoreElements = document.querySelectorAll(".scoreInput");
  scoreElements.forEach((element) => {
    element.removeEventListener("click", holdScores);
  });
}

function throwDices() {
  diceRolled = true;

  const dices = [
    { number: 1, image: "../images/1.png" },
    { number: 2, image: "../images/2.png" },
    { number: 3, image: "../images/3.png" },
    { number: 4, image: "../images/4.png" },
    { number: 5, image: "../images/5.png" },
    { number: 6, image: "../images/6.png" },
  ];

  for (let i = 0; i < 5; i++) {
    if (!heldDices[i]) {
      const randomIndex = Math.floor(Math.random() * dices.length);
      const diceImgElement = document.getElementById("diceImg" + (i + 1));
      diceImgElement.src = dices[randomIndex].image;
      rolledNumbers[i] = dices[randomIndex].number;
    }
  }
  countThrows();
  printScores();
}

function countNumbers(number, array) {
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === number) {
      count++;
    }
  }

  return count;
}

function findCombinations(array) {
  const counts = {};
  const smallStraightCombinations = [
    //alle combinaties van small straight
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
  ];
  const largeStraightCombinations = [
    //alle combinaties van long straight
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
  ];
  let threeOfAKind = 0;
  let fourOfAKind = 0;
  let fullHouse = 0;
  let smallStraight = 0;
  let largeStraight = 0;
  let yahtzee = 0;
  let chance = 0;
  let three = false;
  let two = false;

  for (let i = 0; i < array.length; i++) {
    chance += array[i];
  }

  for (let i = 0; i < array.length; i++) {
    const number = array[i];
    if (counts[number]) {
      counts[number]++;
    } else {
      counts[number] = 1;
    }
  }

  for (const number in counts) {
    const count = counts[number];
    if (count >= 3) {
      threeOfAKind = chance;
      three = true;
    }
    if (count >= 4) {
      fourOfAKind = chance;
    }
    if (count >= 5) {
      yahtzee = 50;
    }
    if (count === 2) {
      two = true;
    }
  }

  if (three && two) {
    fullHouse = 25;
  }

  for (const combination of smallStraightCombinations) {
    if (combination.every((num) => array.includes(num))) smallStraight = 30;
  }

  for (const combination of largeStraightCombinations) {
    if (combination.every((num) => array.includes(num))) largeStraight = 40;
  }

  return {
    threeOfAKind,
    fourOfAKind,
    fullHouse,
    smallStraight,
    largeStraight,
    yahtzee,
    chance,
  };
}

function holdScores() {
  if (diceRolled) {
    const diceScore = document.getElementById(this.id);

    if (!diceScore.classList.contains("heldScore")) {
      diceScore.classList.add("heldScore");
      scoreHeld = true;

      removeScoreEventListeners();
    }
    if (scoreHeld) {
      document
        .getElementById("diceBtn")
        .removeEventListener("click", throwDices);
      document.getElementById("amountOfThrows").innerText = "Throws left: 0";
      throwCounter = 0;
    }
    calcTotal();
  }
}

function calcTotal() {
  let totalScore = 0;
  let scoreTop = 0;
  let scoreLow = 0;

  const scoreElementsTop = [
    "scoreInputAces",
    "scoreInputTwos",
    "scoreInputThrees",
    "scoreInputFours",
    "scoreInputFives",
    "scoreInputSixes",
  ];

  const scoreElementsLow = [
    "scoreInputToak",
    "scoreInputFoak",
    "scoreInputFullHouse",
    "scoreInputSs",
    "scoreInputLs",
    "scoreInputYahtzee",
    "scoreInputChance",
  ];

  for (const scoreElementId of scoreElementsTop) {
    const scoreElement = document.getElementById(scoreElementId);
    if (scoreElement.classList.contains("heldScore")) {
      scoreTop += parseInt(scoreElement.innerText);
    }
  }

  if (scoreTop >= 63) {
    bonus = true;
    document.getElementById("bonusScore").innerText = "35";
    scoreTop += 35;
  }

  for (const scoreElementId of scoreElementsLow) {
    const scoreElement = document.getElementById(scoreElementId);
    if (scoreElement.classList.contains("heldScore")) {
      scoreLow += parseInt(scoreElement.innerText);
    }
  }

  totalScore += scoreTop + scoreLow;

  document.getElementById("topTotalScore").innerText = scoreTop;
  document.getElementById("totalScore").innerText = totalScore;
  return totalScore;
}

function updateScoreIfNotHeld(elementId, score) {
  const scoreElement = document.getElementById(elementId);
  if (!scoreElement.classList.contains("heldScore")) {
    scoreElement.innerText = score;
  }
}

function printScores() {
  const scores = findCombinations(rolledNumbers);

  updateScoreIfNotHeld("scoreInputAces", countNumbers(1, rolledNumbers));
  updateScoreIfNotHeld("scoreInputTwos", countNumbers(2, rolledNumbers) * 2);
  updateScoreIfNotHeld("scoreInputThrees", countNumbers(3, rolledNumbers) * 3);
  updateScoreIfNotHeld("scoreInputFours", countNumbers(4, rolledNumbers) * 4);
  updateScoreIfNotHeld("scoreInputFives", countNumbers(5, rolledNumbers) * 5);
  updateScoreIfNotHeld("scoreInputSixes", countNumbers(6, rolledNumbers) * 6);

  updateScoreIfNotHeld("scoreInputToak", scores.threeOfAKind);
  updateScoreIfNotHeld("scoreInputFoak", scores.fourOfAKind);
  updateScoreIfNotHeld("scoreInputFullHouse", scores.fullHouse);
  updateScoreIfNotHeld("scoreInputSs", scores.smallStraight);
  updateScoreIfNotHeld("scoreInputLs", scores.largeStraight);
  updateScoreIfNotHeld("scoreInputYahtzee", scores.yahtzee);
  updateScoreIfNotHeld("scoreInputChance", scores.chance);
}

function endGame() {
  window.alert("Game Over!");
}

function nextTurn() {
  if (throwCounter === 0) {
    throwCounter = 3;
    diceRolled = false;
    rolledNumbers.fill(0);
    heldDices.fill(false);

    addEventListeners();

    const defaultDiceImage = "../images/1.png";
    for (let i = 0; i < 5; i++) {
      const diceImgElement = document.getElementById("diceImg" + (i + 1));
      diceImgElement.style.border = "none";
      diceImgElement.src = defaultDiceImage; //zet alle dobbelsteen plaatjes weer op 1
    }

    document.getElementById("amountOfThrows").innerText =
      "Throws left: " + throwCounter;
    document.getElementById("diceBtn").addEventListener("click", throwDices);
  } else if (throwCounter !== 0) {
    window.alert("You still have throws left or still have to select a score!");
  }
}

function countThrows() {
  if (throwCounter === 0) {
    document.getElementById("diceBtn").removeEventListener("click", throwDices);
  } else {
    throwCounter--;
    document.getElementById("amountOfThrows").innerText =
      "Throws left: " + throwCounter;
  }
}

function holdDices() {
  function markDiceHeld(heldDicesNumber) {
    return function () {
      if (diceRolled) {
        if (heldDices[heldDicesNumber]) {
          this.style.border = "none";
          heldDices[heldDicesNumber] = false;
        } else {
          this.style.border = "5px solid #242038";
          heldDices[heldDicesNumber] = true;
        }
      }
    };
  }

  for (let i = 0; i < 5; i++) {
    const diceImgElement = document.getElementById("diceImg" + (i + 1));
    diceImgElement.addEventListener("click", markDiceHeld(i));
  }
}

holdDices();
