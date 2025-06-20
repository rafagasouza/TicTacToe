/* /Vamos pegar os campos e dar função a eles
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
});

let currentPlayer = "O"; //aqui temos o elemento atual
playerTurn.innerText = currentPlayer; //ja colocamos no campo do jogador atual o "O"

fields.forEach((item) => {
  item.addEventListener("click", (ev) => {
    const field = ev.currentTarget; //esta capturando o span que foi clicado 

    // Só marca se o campo estiver vazio
    if (field.innerText === "") {
      field.innerText = currentPlayer; //colocamos no elemento que gerou o evento o texto 
      field.style.backgroundColor = "red";

      // Alterna o jogador
      currentPlayer = currentPlayer === "O" ? "X" : "O";
      playerTurn.innerText = currentPlayer;
    }
  });
});

*/

const fields = document.querySelectorAll(".field"); //selecionei o nodelist com os spans
const playerTurn = document.getElementById("playerTurn"); //selecionei o jogador que atual
 const player1Name = document.getElementById("player1Name"); //selecionei o primeiro jogador
  const player2Name = document.getElementById("player2Name"); //selecionei o segundo jogador


//vamos criar uma variavel com os nomes associados aos simbolos X e O.

//vamos criar um array para marcar onde o jogador clicou.
let board = ["", "", "", "", "", "", "", "", ""];
//o array tem 9 campos vazios mas ja determinando as posições disponiveis.

//temos um array com as combinações possiveis para vitoria

const winCombinations = [
  [0, 1, 2], // Linha de cima
  [3, 4, 5], // Linha do meio
  [6, 7, 8], // Linha de baixo
  [0, 3, 6], // Primeira coluna
  [1, 4, 7], // Segunda coluna
  [2, 5, 8], // Terceira coluna
  [0, 4, 8], // Diagonal principal
  [2, 4, 6], // Diagonal secundária
];

//vamos criar a função que verifica o vencedor. Estamos fazendo ela antes pois chamaremos ela
//para verificar o tempo todo durante a partida se alguem ganhou.

function checkWinner() {

 

  const playerNames = {
    O: player1Name.value,
    X: player2Name.value,
  };

  for (let combinations of winCombinations) {
    const [a, b, c] = combinations;
    //para cada cobintaions eu vou atribuir ao valor das variaveis a, b, e c.
    //ex: se o cobinations atual for 0,1,2 a, vai ser 0, b vai ser 1 e c vai ser 2.
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const winnerSybol = board[a];
      const winnerName = playerNames[winnerSybol];

       fields.forEach((f) => (f.style.backgroundColor = ""));

      // Destaca a linha vencedora de verde
      [a, b, c].forEach((index) => {
        fields[index].classList.add("winner")
      });


      alert(`O jogador ${winnerName} venceu!`);
      return true; //finaliza o jogo
    }

    if (!board.includes("")) {
      alert("Empate!");
      return true; //finaliza o jogo
    }

  }

  return false; //significa que ainda tem casas pra preencher
}

// vamos criar uma variavel que vai auxiliar durante a partida a determinar o jogador atual
let currentPlayer = "O";
playerTurn.innerText = currentPlayer;

//agora vamos preencher o tabuleiro

fields.forEach((item, index) => {
  item.addEventListener("click", (ev) => {
    const field = ev.currentTarget;

    // Só deixa jogar se o campo estiver vazio
    if (field.innerText === "") {
      field.innerText = currentPlayer;
      field.style.backgroundColor = "red";
      board[index] = currentPlayer; // Salva no array board

      if (checkWinner()) {
        // Se alguém ganhou ou empatou, bloqueia o tabuleiro
        fields.forEach(f => f.style.pointerEvents = "none");
        return;
      }

      // Troca o jogador
      currentPlayer = currentPlayer === "O" ? "X" : "O";
      playerTurn.innerText = currentPlayer;
    }
  });
});


const restartButton = document.getElementById("restart");

restartButton.addEventListener("click", () => {
  // 1. Limpar o array board
  board = ["", "", "", "", "", "", "", "", ""];

  // 2. Limpar os campos visuais (os spans)
  fields.forEach((field) => {
    field.innerText = "";
    field.classList.remove('winner'); // Remove a cor de fundo
    field.style.pointerEvents = "auto"; // Permite clicar de novo
  });

  // 3. Resetar o jogador atual
  currentPlayer = "O";
  playerTurn.innerText = currentPlayer;

  // limpando o valor dos nomes
  player1Name.value = ''
  player2Name.value = ''
});
