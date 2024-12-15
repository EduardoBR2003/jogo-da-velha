// Seleção de elementos do DOM
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

// Variáveis de estado do jogo
let currentPlayer = 'X'; // Jogador inicial
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Tabuleiro do jogo
let gameActive = true; // Flag para controlar se o jogo está ativo

// Padrões de vitória (combinações que levam à vitória)
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
];

// Método principal para lidar com clique em uma célula
function handleCellClick(event) {
    // Obtém a célula clicada e seu índice
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    // Verifica se a célula já foi preenchida ou se o jogo não está ativo
    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    // Preenche a célula com o símbolo do jogador atual
    gameBoard[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    
    // Atualiza o aria-label para acessibilidade
    clickedCell.setAttribute('aria-label', `Célula ${parseInt(cellIndex) + 1} ocupada por ${currentPlayer}`);

    // Verifica o status do jogo após a jogada
    checkGameStatus();
}

// Método para verificar o status do jogo após cada jogada
function checkGameStatus() {
    let roundWon = false;

    // Verifica todos os padrões de vitória
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            gameBoard[a] && 
            gameBoard[a] === gameBoard[b] && 
            gameBoard[a] === gameBoard[c]
        ) {
            roundWon = true;
            break;
        }
    }

    // Tratamento de vitória
    if (roundWon) {
        statusDisplay.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        return;
    }

    // Tratamento de empate
    if (!gameBoard.includes('')) {
        statusDisplay.textContent = 'Empate!';
        gameActive = false;
        return;
    }

    // Troca de jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Vez do Jogador ${currentPlayer}`;
}

// Método para reiniciar o jogo
function resetGame() {
    // Reinicia o tabuleiro e variáveis de estado
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = 'Vez do Jogador Natureza (X)';
    
    // Limpa todas as células
    cells.forEach(cell => {
        cell.textContent = '';
        cell.setAttribute('aria-label', `Célula ${parseInt(cell.getAttribute('data-index')) + 1}`);
    });
}

// Adiciona event listeners para cada célula
cells.forEach(cell => {
    // Listener para clique do mouse
    cell.addEventListener('click', handleCellClick);
    
    // Listener para interação com teclado (acessibilidade)
    cell.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleCellClick(event);
        }
    });
});

// Adiciona event listener para o botão de reinício
resetButton.addEventListener('click', resetGame);