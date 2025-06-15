function createPlayer(name) {
    return {name};
}

function createBoard() {
    let grid = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    return {grid};
}

const gameController = function(player1, player2, board) {
    let moveCount = 0;
    let gameEnd = false;

    function registerMove(row, col) {
        if (board.grid[row][col] === '-') {
            if (moveCount % 2 === 0) // player 1 turn (O)
                board.grid[row][col] = 'O';
            else                     // player 2 turn (X)
                board.grid[row][col] = 'X';
        }
        else {
            alert('This square has already been chosen!');
            return;
        }

        checkWinner();

        if (moveCount === 8) {
            updateResult('The game ends in a draw.');
            gameEnd = true;
            return;
        }

        moveCount++;
    }

    function checkWinner() {
        if (((board.grid[0][0] === board.grid[0][1]) && (board.grid[0][1] === board.grid[0][2]) && (board.grid[0][0] !== '-')) ||
            ((board.grid[1][0] === board.grid[1][1]) && (board.grid[1][1] === board.grid[1][2]) && (board.grid[1][0] !== '-')) ||
            ((board.grid[2][0] === board.grid[2][1]) && (board.grid[2][1] === board.grid[2][2]) && (board.grid[2][0] !== '-')) ||
            ((board.grid[0][0] === board.grid[1][0]) && (board.grid[1][0] === board.grid[2][0]) && (board.grid[0][0] !== '-')) ||
            ((board.grid[0][1] === board.grid[1][1]) && (board.grid[1][1] === board.grid[2][1]) && (board.grid[0][1] !== '-')) ||
            ((board.grid[0][2] === board.grid[1][2]) && (board.grid[1][2] === board.grid[2][2]) && (board.grid[0][2] !== '-')) ||
            ((board.grid[0][0] === board.grid[1][1]) && (board.grid[1][1] === board.grid[2][2]) && (board.grid[0][0] !== '-')) ||
            ((board.grid[0][2] === board.grid[1][1]) && (board.grid[1][1] === board.grid[2][0]) && (board.grid[0][2] !== '-'))) {
                if (moveCount % 2 === 0) { 
                    updateResult(`${player1.name} has won!`);
                }
                else {
                    updateResult(`${player2.name} has won!`);
                }
                gameEnd = true;
            }
    }

    function isGameOver() {
        return gameEnd;
    }

    function currentPlayerSymbol() {
        const isPlayer1 = moveCount % 2 === 0;
        return isPlayer1 ? 'O' : 'X';
    }

    return {registerMove, isGameOver, currentPlayerSymbol};
}

const grid = document.querySelector('#grid');
grid.addEventListener('click', (event) => {
    if (game.isGameOver())
        return;

    const cellId = parseInt(event.target.id) - 1;
    const row = parseInt(cellId / 3);
    const col = parseInt(cellId % 3);
    
    const symbol = game.currentPlayerSymbol();
    game.registerMove(row, col);
    event.target.innerText = symbol;
    console.table(board.grid);
});

const start = document.querySelector('#start');
start.addEventListener('click', () => {
    startGame();
    updateResult();
    start.innerText = 'Restart';
})


function startGame() {
    const player1Name = document.querySelector('#player1').value;
    const player2Name = document.querySelector('#player2').value;
    const player1 = createPlayer(player1Name);
    const player2 = createPlayer(player2Name);
    board = createBoard();
    game = gameController(player1, player2, board);
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        cell.innerText = '';
    }
}

function updateResult(message = ''){
    const result = document.querySelector('#result');
    result.innerText = message;
}

let board;
let game;