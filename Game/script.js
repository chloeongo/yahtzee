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
document
  .getElementById("threeOfAKindScore")
  .addEventListener("click", holdScores);
document
  .getElementById("fourOfAKindScore")
  .addEventListener("click", holdScores);
document.getElementById("fullHouseScore").addEventListener("click", holdScores);
document
  .getElementById("smallStraightScore")
  .addEventListener("click", holdScores);
document
  .getElementById("largeStraightScore")
  .addEventListener("click", holdScores);
document.getElementById("yahtzeeScore").addEventListener("click", holdScores);
document.getElementById("chanceScore").addEventListener("click", holdScores);

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
      document
        .getElementById("scoreInputAces")
        .removeEventListener("click", holdScores);
      document
        .getElementById("scoreInputTwos")
        .removeEventListener("click", holdScores);
      document
        .getElementById("scoreInputThrees")
        .removeEventListener("click", holdScores);
      document
        .getElementById("scoreInputFours")
        .removeEventListener("click", holdScores);
      document
        .getElementById("scoreInputFives")
        .removeEventListener("click", holdScores);
      document
        .getElementById("scoreInputSixes")
        .removeEventListener("click", holdScores);
      document
        .getElementById("threeOfAKindScore")
        .removeEventListener("click", holdScores);
      document
        .getElementById("fourOfAKindScore")
        .removeEventListener("click", holdScores);
      document
        .getElementById("fullHouseScore")
        .removeEventListener("click", holdScores);
      document
        .getElementById("smallStraightScore")
        .removeEventListener("click", holdScores);
      document
        .getElementById("largeStraightScore")
        .removeEventListener("click", holdScores);
      document
        .getElementById("yahtzeeScore")
        .removeEventListener("click", holdScores);
      document
        .getElementById("chanceScore")
        .removeEventListener("click", holdScores);
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
    "threeOfAKindScore",
    "fourOfAKindScore",
    "fullHouseScore",
    "smallStraightScore",
    "largeStraightScore",
    "yahtzeeScore",
    "chanceScore",
  ];

  for (const scoreElementId of scoreElementsTop) {
    const scoreElement = document.getElementById(scoreElementId);
    if (scoreElement.classList.contains("heldScore")) {
      scoreTop += parseInt(scoreElement.innerText);
    }
  }

  if (scoreTop >= 3) {
    bonus = true;
  }

  for (const scoreElementId of scoreElementsLow) {
    const scoreElement = document.getElementById(scoreElementId);
    if (scoreElement.classList.contains("heldScore")) {
      scoreLow += parseInt(scoreElement.innerText);
    }
  }

  if (bonus) {
    totalScore += 35;
  }

  totalScore += scoreTop + scoreLow;

  document.getElementById("bonusScore").innerText = "35";
  document.getElementById("topTotalScore").innerText = scoreTop;
  document.getElementById("totalScore").innerText = totalScore;
  return totalScore;
}

function printScores() {
  const scores = findCombinations(rolledNumbers);

  if (
    !document.getElementById("scoreInputAces").classList.contains("heldScore")
  ) {
    document.getElementById("scoreInputAces").innerText = countNumbers(
      1,
      rolledNumbers
    );
  }
  if (
    !document.getElementById("scoreInputTwos").classList.contains("heldScore")
  ) {
    document.getElementById("scoreInputTwos").innerText =
      countNumbers(2, rolledNumbers) * 2;
  }
  if (
    !document.getElementById("scoreInputThrees").classList.contains("heldScore")
  ) {
    document.getElementById("scoreInputThrees").innerText =
      countNumbers(3, rolledNumbers) * 3;
  }
  if (
    !document.getElementById("scoreInputFours").classList.contains("heldScore")
  ) {
    document.getElementById("scoreInputFours").innerText =
      countNumbers(4, rolledNumbers) * 4;
  }
  if (
    !document.getElementById("scoreInputFives").classList.contains("heldScore")
  ) {
    document.getElementById("scoreInputFives").innerText =
      countNumbers(5, rolledNumbers) * 5;
  }
  if (
    !document.getElementById("scoreInputSixes").classList.contains("heldScore")
  ) {
    document.getElementById("scoreInputSixes").innerText =
      countNumbers(6, rolledNumbers) * 6;
  }

  if (
    !document
      .getElementById("threeOfAKindScore")
      .classList.contains("heldScore")
  ) {
    document.getElementById("threeOfAKindScore").innerText =
      scores.threeOfAKind;
  }
  if (
    !document.getElementById("fourOfAKindScore").classList.contains("heldScore")
  ) {
    document.getElementById("fourOfAKindScore").innerText = scores.fourOfAKind;
  }
  if (
    !document.getElementById("fullHouseScore").classList.contains("heldScore")
  ) {
    document.getElementById("fullHouseScore").innerText = scores.fullHouse;
  }
  if (
    !document
      .getElementById("smallStraightScore")
      .classList.contains("heldScore")
  ) {
    document.getElementById("smallStraightScore").innerText =
      scores.smallStraight;
  }
  if (
    !document
      .getElementById("largeStraightScore")
      .classList.contains("heldScore")
  ) {
    document.getElementById("largeStraightScore").innerText =
      scores.largeStraight;
  }
  if (
    !document.getElementById("yahtzeeScore").classList.contains("heldScore")
  ) {
    document.getElementById("yahtzeeScore").innerText = scores.yahtzee;
  }
  if (!document.getElementById("chanceScore").classList.contains("heldScore")) {
    document.getElementById("chanceScore").innerText = scores.chance;
  }
}

function endGame() {}

function nextTurn() {
  if (throwCounter === 0) {
    throwCounter = 3;
    diceRolled = false;
    rolledNumbers.fill(0);
    heldDices.fill(false);

    document
      .getElementById("scoreInputAces")
      .addEventListener("click", holdScores);
    document
      .getElementById("scoreInputTwos")
      .addEventListener("click", holdScores);
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
    document
      .getElementById("threeOfAKindScore")
      .addEventListener("click", holdScores);
    document
      .getElementById("fourOfAKindScore")
      .addEventListener("click", holdScores);
    document
      .getElementById("fullHouseScore")
      .addEventListener("click", holdScores);
    document
      .getElementById("smallStraightScore")
      .addEventListener("click", holdScores);
    document
      .getElementById("largeStraightScore")
      .addEventListener("click", holdScores);
    document
      .getElementById("yahtzeeScore")
      .addEventListener("click", holdScores);
    document
      .getElementById("chanceScore")
      .addEventListener("click", holdScores);

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
    window.alert("You still have throws left!");
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
