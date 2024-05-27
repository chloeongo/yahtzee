let throwCounter = 3;
const heldDices = [false, false, false, false, false];

document.getElementById("diceBtn").addEventListener("click", throwDices);

document.getElementById("diceImg1").addEventListener("click", function (e) {
  console.log(this.id);
  this.style = "border: 5px solid black";
  heldDices == true;
});
document.getElementById("diceImg2").addEventListener("click", function (e) {
  console.log(this.id);
  this.style = "border: 10px solid black";
});
document.getElementById("diceImg3").addEventListener("click", function (e) {
  console.log(this.id);
  this.style = "border: 10px solid black";
});
document.getElementById("diceImg4").addEventListener("click", function (e) {
  console.log(this.id);
  this.style = "border: 10px solid black";
});
document.getElementById("diceImg5").addEventListener("click", function (e) {
  console.log(this.id);
  this.style = "border: 10px solid black";
});

function throwDices() {
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
      const randomDices = Math.floor(Math.random() * dices.length);
      const diceImgElement = document.getElementById("diceImg" + (i + 1));
      diceImgElement.src = dices[randomDices].image;
    }
  }
  countThrows();
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

function holdDices(e) {}
