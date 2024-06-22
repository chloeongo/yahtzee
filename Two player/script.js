let throwCounter = 3;
let diceRolled = false;
const heldDices = [false, false, false, false, false];
let rolledNumbers = [0, 0, 0, 0, 0];
let pointsTop = [0, 0, 0, 0, 0, 0];
let pointsBottom = [0, 0, 0, 0, 0, 0, 0];

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
    if (counts[number] >= 3) {
      threeOfAKind = chance; //chance telt alles op line 97
      three = true;
    }
    if (counts[number] >= 4) {
      fourOfAKind = chance;
    }
    if (counts[number] >= 5) {
      yahtzee = 50;
    }
    if (three && counts[number] >= 2) {
      fullHouse = 25;
    }
  }

  for (const number of smallStraightCombinations) {
    if (number.every((num) => array.includes(num))) smallStraight = 30;
  }
  for (const number of largeStraightCombinations) {
    if (number.every((num) => array.includes(num))) largeStraight = 40;
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
      storeHeldScores(this.id);
    } else {
      diceScore.classList.remove("heldScore");
    }
  }
}

function storeHeldScores() {
  const scores = findCombinations(rolledNumbers);

  if (document.querySelector(".heldScore")) {
    pointsTop[0] = countNumbers(1, rolledNumbers);
    pointsTop[1] = countNumbers(2, rolledNumbers) * 2;
    pointsTop[2] = countNumbers(3, rolledNumbers) * 3;
    pointsTop[3] = countNumbers(4, rolledNumbers) * 4;
    pointsTop[4] = countNumbers(5, rolledNumbers) * 5;
    pointsTop[5] = countNumbers(6, rolledNumbers) * 6;
    console.log(pointsTop);
    pointsBottom[0] = scores.threeOfAKind;
    pointsBottom[1] = scores.fourOfAKind;
    pointsBottom[2] = scores.fullHouse;
    pointsBottom[3] = scores.smallStraight;
    pointsBottom[4] = scores.largeStraight;
    pointsBottom[5] = scores.yahtzee;
    pointsBottom[6] = scores.chance;
    console.log(pointsBottom);
  }
}

function printScores() {
  const scores = findCombinations(rolledNumbers);

  document.getElementById("scoreInputAces").innerText = countNumbers(
    1,
    rolledNumbers
  );
  document.getElementById("scoreInputTwos").innerText =
    countNumbers(2, rolledNumbers) * 2;
  document.getElementById("scoreInputThrees").innerText =
    countNumbers(3, rolledNumbers) * 3;
  document.getElementById("scoreInputFours").innerText =
    countNumbers(4, rolledNumbers) * 4;
  document.getElementById("scoreInputFives").innerText =
    countNumbers(5, rolledNumbers) * 5;
  document.getElementById("scoreInputSixes").innerText =
    countNumbers(6, rolledNumbers) * 6;

  document.getElementById("threeOfAKindScore").innerText = scores.threeOfAKind;
  document.getElementById("fourOfAKindScore").innerText = scores.fourOfAKind;
  document.getElementById("fullHouseScore").innerText = scores.fullHouse;
  document.getElementById("smallStraightScore").innerText =
    scores.smallStraight;
  document.getElementById("largeStraightScore").innerText =
    scores.largeStraight;
  document.getElementById("yahtzeeScore").innerText = scores.yahtzee;
  document.getElementById("chanceScore").innerText = scores.chance;
}

function nextTurn() {
  if (throwCounter === 0) {
    throwCounter = 3;
    diceRolled = false;
    rolledNumbers.fill(0);
    heldDices.fill(false);

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
  if (throwCounter > 0) {
    throwCounter--;
    document.getElementById("amountOfThrows").innerText =
      "Throws left: " + throwCounter;
  }
  if (throwCounter === 0) {
    document.getElementById("diceBtn").removeEventListener("click", throwDices);
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
