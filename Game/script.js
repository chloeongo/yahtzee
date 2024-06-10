let throwCounter = 3;
let diceRolled = false;
const heldDices = [false, false, false, false, false];
let rolledNumbers = [0, 0, 0, 0, 0];

document.getElementById("diceBtn").addEventListener("click", throwDices);

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
  countNumbers();
  countThreeOfAKind(rolledNumbers);
  printTopScores();
}

function countNumbers(number) {
  let count = 0;

  for (let i = 0; i < rolledNumbers.length; i++) {
    if (rolledNumbers[i] === number) {
      count++;
    }
  }

  return count;
}

function printTopScores() {
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
}

function countThreeOfAKind(array) {
  for (let i = 0; i <= array.length - 3; i++) {
    if (array[i] === array[i + 1] && array[i] === array[i + 2]) {
      return array[i] * 3;
    }
  }

  return 0;
}
document.getElementById("threeOfAKindScore").innerText =
  countThreeOfAKind(rolledNumbers);

document.getElementById("threeOfAKindScore").innerText =
  countThreeOfAKind(rolledNumbers);

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
