//Vamos pegar os campos e dar função a eles
const fields = document.querySelectorAll(".field");
const playerTurn = document.getElementById("playerTurn");

/*fields.forEach((item) => {
  playerTurn.innerText = "O";
  item.addEventListener("click", (ev) => {
    if (ev.currentTarget.innerText === "" && playerTurn.innerHTML == 'O') {
      item.style.backgroundColor = "red";
      ev.currentTarget.innerText = "O";
      playerTurn.innerText = "X";
    } else {
      if (ev.currentTarget.innerText === "" && playerTurn.innerText === "X") {
        item.style.backgroundColor = "red";
        ev.currentTarget.innerText = "X";
        playerTurn.innerText = "O";
      } else {
        item.style.backgroundColor = "red";
        ev.currentTarget.innerText = "O";
        playerTurn.innerText = "X";
      }
    }
  });
});*/

let currentPlayer = "O";
playerTurn.innerText = currentPlayer;

fields.forEach((item) => {
  item.addEventListener("click", (ev) => {
    const field = ev.currentTarget;

    // Só marca se o campo estiver vazio
    if (field.innerText === "") {
      field.innerText = currentPlayer;
      field.style.backgroundColor = "red";

      // Alterna o jogador
      currentPlayer = currentPlayer === "O" ? "X" : "O";
      playerTurn.innerText = currentPlayer;
    }
  });
});

