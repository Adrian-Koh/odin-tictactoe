function createPlayer(name) {
    return {name};
}

function createBoard() {
    let grid = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    return {grid};
}

const gameController = function(board) {
    let moveCount = 0;
    function promptMove(isPlayer1Turn) {
        const playerTurn = isPlayer1Turn ? 'Player 1' : 'Player 2';
        let row = parseInt(prompt(playerTurn + ' enter row: 0-2'));
        let col = parseInt(prompt(playerTurn + ' enter column: 0-2'));

        registerMove(row, col);
    }
    function nextMove() {
        promptMove(moveCount % 2 === 0);
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
        }
    }

    return {nextMove};
}

let board = createBoard();
const game = gameController(board);
while (true) {
    console.table(board.grid);
    game.nextMove();
}

