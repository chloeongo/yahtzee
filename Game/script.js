let throwCounter = 3;
let diceRolled = false;
const heldDices = [false, false, false, false, false];
let rolledNumbers = [0, 0, 0, 0, 0];
let scoreHeld = false;
let allScoresHeld = true;

addEventListeners();
document.getElementById("diceBtn").addEventListener("click", throwDices);
document.getElementById("next").addEventListener("click", nextTurn);
document.getElementById("topTotalScore").addEventListener("click", checkEnd);

//voegt eventlisteners van de score input toe
function addEventListeners() {
  const scoreElements = document.getElementsByClassName("scoreInput");

  for (let i = 0; i < scoreElements.length; i++) {
    scoreElements[i].addEventListener("click", holdScores);
  }
}

function removeScoreEventListeners() {
  const scoreElements = document.getElementsByClassName("scoreInput");
  for (let i = 0; i < scoreElements.length; i++) {
    scoreElements[i].removeEventListener("click", holdScores);
  }
}

function throwDices() {
  if (throwCounter > 0) {
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
  } else if (throwCounter === 0) {
    window.alert("You must select next round!");
  }
}

function countNumbers(diceNumber, rolledNumbers) {
  let count = 0;

  for (let i = 0; i < rolledNumbers.length; i++) {
    if (rolledNumbers[i] === diceNumber) {
      count++;
    }
  }

  return count;
}

function findCombinations(rolledNumbers) {
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

  // telt hoevaak een getal is gerolt
  for (let i = 0; i < rolledNumbers.length; i++) {
    const diceNumber = rolledNumbers[i];
    if (counts[diceNumber]) {
      counts[diceNumber]++;
    } else {
      counts[diceNumber] = 1;
    }
  }

  for (let i = 0; i < rolledNumbers.length; i++) {
    chance += rolledNumbers[i];
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
    if (
      combination.every(function (diceNumber) {
        return rolledNumbers.includes(diceNumber);
      })
    ) {
      smallStraight = 30;
    }
  }

  for (const combination of largeStraightCombinations) {
    if (
      combination.every(function (diceNumber) {
        return rolledNumbers.includes(diceNumber);
      })
    ) {
      largeStraight = 40;
    }
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
    }
    if (scoreHeld) {
      document
        .getElementById("diceBtn")
        .removeEventListener("click", throwDices);
      document.getElementById("amountOfThrows").innerText = "Throws left: 0";
      removeScoreEventListeners();
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
    //score input van single punten zoals 1
    "scoreInputAces",
    "scoreInputTwos",
    "scoreInputThrees",
    "scoreInputFours",
    "scoreInputFives",
    "scoreInputSixes",
  ];

  const scoreElementsLow = [
    //score input van combinerende punten zoals fullhouse
    "scoreInputToak",
    "scoreInputFoak",
    "scoreInputFullHouse",
    "scoreInputSs",
    "scoreInputLs",
    "scoreInputYahtzee",
    "scoreInputChance",
  ];
  //telt de punten van de single punten op
  for (const scoreInputs of scoreElementsTop) {
    const scoreInput = document.getElementById(scoreInputs);
    if (scoreInput.classList.contains("heldScore")) {
      scoreTop += parseInt(scoreInput.innerText);
    }
  }
  //berekent de bonusscore bij toepassing
  if (scoreTop >= 63) {
    document.getElementById("bonusScore").innerText = "35";
    scoreTop += 35;
  }

  for (const scoreInputs of scoreElementsLow) {
    const scoreInput = document.getElementById(scoreInputs);
    if (scoreInput.classList.contains("heldScore")) {
      scoreLow += parseInt(scoreInput.innerText);
    }
  }

  totalScore += scoreTop + scoreLow;

  document.getElementById("topTotalScore").innerText = scoreTop;
  document.getElementById("totalScore").innerText = totalScore;
  return totalScore;
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

function updateScoreIfNotHeld(scoreInputId, score) {
  const scoreElement = document.getElementById(scoreInputId);
  if (!scoreElement.classList.contains("heldScore")) {
    scoreElement.innerText = score;
  }
}

function checkEnd() {
  const scoreInputs = document.getElementsByClassName("scoreInput");

  for (let i = 0; i < scoreInputs.length; i++) {
    if (!scoreInputs[i].classList.contains("heldScore")) {
      allScoresHeld = false;
    }
  }
}

function nextTurn() {
  checkEnd();

  if (allScoresHeld) {
    window.alert("Game Over!");
    throwCounter = 0;
  }
  if (throwCounter === 0 && scoreHeld) {
    throwCounter = 3;
    diceRolled = false;
    scoreHeld = false;

    rolledNumbers.fill(0);
    heldDices.fill(false);
    addEventListeners();

    const defaultDiceImage = "../images/1.png";
    for (let i = 0; i < 5; i++) {
      const diceImgElement = document.getElementById("diceImg" + (i + 1));
      diceImgElement.style.border = "none";
      diceImgElement.src = defaultDiceImage; // Reset alle dice images
    }

    document.getElementById("amountOfThrows").innerText =
      "Throws left: " + throwCounter;
    document.getElementById("diceBtn").addEventListener("click", throwDices);
  } else if (throwCounter !== 0) {
    window.alert("You still have throws left!");
  } else if (!scoreHeld) {
    window.alert("You must select a score!");
  }
}

function countThrows() {
  throwCounter--;
  document.getElementById("amountOfThrows").innerText =
    "Throws left: " + throwCounter;
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
