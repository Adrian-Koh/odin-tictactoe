function createPlayer(name) {
    return {name};
}

function createBoard() {
    let grid = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    return {grid};
}

const gameController = function(board) {
    let moveCount = 0;
    let hasWon = false;

    function promptMove() {
        const playerTurn = moveCount % 2 === 0 ? 'Player 1' : 'Player 2';
        let row = parseInt(prompt(playerTurn + ' enter row: 0-2'));
        let col = parseInt(prompt(playerTurn + ' enter column: 0-2'));

        registerMove(row, col);
    }

    function nextMove() {
        promptMove();
        checkWinner();
        moveCount++;
    }

    function registerMove(row, col) {
        if (board.grid[row][col] === '-') {
            if (moveCount % 2 === 0) // player 1 turn (O)
                board.grid[row][col] = 'O';
            else                     // player 2 turn (X)
                board.grid[row][col] = 'X';
        }
        else {
            alert('This square has already been chosen!');
            promptMove();
        }
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
                    alert('Player 1 has won!');
                }
                else {
                    alert('Player 2 has won!');
                }
                hasWon = true;
            }
    }

    function isGameOver() {
        return hasWon;
    }

    return {nextMove, isGameOver};
}

let board = createBoard();
const game = gameController(board);
while (!game.isGameOver()) {
    console.table(board.grid);
    game.nextMove();
}

