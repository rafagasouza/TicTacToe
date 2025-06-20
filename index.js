
const fields = document.querySelectorAll(".field"); //selecionei o nodelist com os spans
const playerTurn = document.getElementById("playerTurn"); //selecionei o jogador que atual
 const player1Name = document.getElementById("player1Name"); //selecionei o primeiro jogador
  const player2Name = document.getElementById("player2Name"); //selecionei o segundo jogador

  function useToast(text){

  Toastify({
        text: text,
        duration: 3000,                 // Tempo em milissegundos (3 segundos)
        gravity: "top",                 // top ou bottom
        position: "right",              // left, center ou right
        backgroundColor: "green",        // Cor de fundo
      }).showToast();

}

function validatePlayers() {
   if (player1Name.value === "" || player2Name.value === "") {
      Toastify({
        text: "Por favor, preencha o nome dos dois jogadores!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "red",
      }).showToast();
      return false;  // Bloqueia a continuação
    }

    return true;  // Se está tudo preenchido
  }

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


       useToast(`O vencedor é o jogador ${winnerName}`)
      return true; //finaliza o jogo
    }

  }

  if (!board.includes("")) {
      useToast('Empatou!')
      fields.forEach((f) => (f.style.backgroundColor = ""));
      return true; //finaliza o jogo
    }

  return false; //significa que ainda tem casas pra preencher
}

// vamos criar uma variavel que vai auxiliar durante a partida a determinar o jogador atual
let currentPlayer = "O";
playerTurn.innerText = currentPlayer;

//agora vamos preencher o tabuleiro

fields.forEach((item, index) => {
  item.addEventListener("click", (ev) => {

    // PRIMEIRO: validar os jogadores antes de jogar
    if (!validatePlayers()) {
      return;  // Se não tiver os dois nomes, para o jogo
    }

    const field = ev.currentTarget;

    if (field.innerText === "") {
      field.innerText = currentPlayer;
      field.style.backgroundColor = "red";
      board[index] = currentPlayer;

      if (checkWinner()) {
        fields.forEach(f => f.style.pointerEvents = "none");
        return;
      }

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
    field.style.backgroundColor = '#FFD700'; // Remove a cor de fundo
    field.style.pointerEvents = "auto"; // Permite clicar de novo
  });

  // 3. Resetar o jogador atual
  currentPlayer = "O";
  playerTurn.innerText = currentPlayer;

  // limpando o valor dos nomes
  player1Name.value = ''
  player2Name.value = ''
});
