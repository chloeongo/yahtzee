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
  countThreeOfAKind();
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
  document.getElementById("scoreInputAces").innerText = count1;
  document.getElementById("scoreInputTwos").innerText = count2;
  document.getElementById("scoreInputThrees").innerText = count3;
  document.getElementById("scoreInputFours").innerText = count4;
  document.getElementById("scoreInputFives").innerText = count5;
  document.getElementById("scoreInputSixes").innerText = count6;
}

function countThreeOfAKind(array) {
  array.sort((a, b) => a - b);

  for (let i = 0; i <= array.length - 3; i++) {
    if (array[i] === array[i + 1] && array[i] === array[i + 2]) {
      return array[i] * 3;
    }
  }

  return 0;
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
