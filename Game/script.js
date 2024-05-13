function throwDices() {
  const dices = [
    { number: 1, image: "../images/1.png" },
    { number: 2, image: "../images/2.png" },
    { number: 3, image: "../images/3.png" },
    { number: 4, image: "../images/4.png" },
    { number: 5, image: "../images/5.png" },
    { number: 6, image: "../images/6.png" },
  ];

  const diceRolled = [];
  for (let i = 0; i < 5; i++) {
    const randomDices = Math.floor(Math.random() * dices.length);
    diceRolled.push(dices[randomDices]);
  }

  for (let i = 0; i < diceRolled.length; i++) {
    const diceImgElement = document.getElementById("diceImg" + (i + 1));
    diceImgElement.src = diceRolled[i].image;
  }
}

function throwCount() {
  document.getElementById("amountOfThrows").innerHTML;
}
