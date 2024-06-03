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
  countTop(1, 2, 3, 4, 5, 6, rolledNumbers);
}

function countTop(number1, number2, number3, number4, number5, number6, array) {
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let count5 = 0;
  let count6 = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === number1) {
      count1++;
    } else if (array[i] === number2) {
      count2 = count2 + 2;
    } else if (array[i] === number3) {
      count3 = count3 + 3;
    } else if (array[i] === number4) {
      count4 = count4 + 4;
    } else if (array[i] === number5) {
      count5 = count5 + 5;
    } else if (array[i] === number6) {
      count6 = count6 + 6;
    }
  }
  document.getElementById("scoreInputAces1").innerText = count1;
  document.getElementById("scoreInputTwos1").innerText = count2;
  document.getElementById("scoreInputThrees1").innerText = count3;
  document.getElementById("scoreInputFours1").innerText = count4;
  document.getElementById("scoreInputFives1").innerText = count5;
  document.getElementById("scoreInputSixes1").innerText = count6;
}

function countLow() {
  let threeOfAKind = 0;
  let fourOfAKind = 0;
  let fullHouse = 0;
  let smallStraight = 0;
  let longStraight = 0;
  let yahtzee = 0;
  let chance = array.reduce((a, b) => a + b, 0);

  document.getElementById("threeOfAKindScore").innerText = threeOfAKind;
  document.getElementById("fourOfAKindScore").innerText = fourOfAKind;
  document.getElementById("fullHouseScore").innerText = fullHouse;
  document.getElementById("smallStraightScore").innerText = smallStraight;
  document.getElementById("longStraightScore").innerText = longStraight;
  document.getElementById("yahtzeeScore").innerText = yahtzee;
  document.getElementById("chanceScore").innerText = chance;
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
    return function (e) {
      if (diceRolled) {
        if (heldDices[heldDicesNumber]) {
          this.style = "border: none";
          heldDices[heldDicesNumber] = false;
        } else {
          this.style = "border: 5px solid #242038";
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
