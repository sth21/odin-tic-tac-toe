const playerFactory = (playerName, marker) => {
    return {name: playerName, marker};
};

let playerOne = playerFactory('Player One', 'X');
let playerTwo = playerFactory('Player Two', 'O');

const gameFlow = (() => {
    let activePlayer = playerOne;
    let endTurnEarly;
    const addToDOM = (event) => {
        (event.target.textContent === '') ? event.target.textContent = activePlayer.marker : endTurnEarly = true;
        console.log(endTurnEarly);
    };
    const addToArray = (event) => {
        let eventClass;
        for (let i = 0; i < gameBoard.arr.length; ++i) {
            if (event.target.classList.contains(`sq${i}`)) {
                eventClass = i;
            }
        }
        gameBoard.arr[eventClass] = activePlayer.marker;
    };
    const changeActivePlayer = () => {
        let playerOneBox = document.querySelector('.player-one');
        let playerTwoBox = document.querySelector('.player-two');
        if (activePlayer === playerOne) {
            playerOneBox.style.backgroundColor = 'white';
            playerTwoBox.style.backgroundColor = 'var(--lightgreen)';
            activePlayer = playerTwo;
        } else {
            playerOneBox.style.backgroundColor = 'var(--lightgreen)';
            playerTwoBox.style.backgroundColor = 'white';
            activePlayer = playerOne;
        }
    };
    const turn = (event) => {
        endTurnEarly = false;
        addToDOM(event);
        if (endTurnEarly) return;
        addToArray(event);
        let winStatus = checkForWinner();
        if (winStatus) return;
        changeActivePlayer();
    };
    const checkForWinner = () => {
        let winner;
        let arr = gameBoard.arr;
        if (arr[0] === arr[1] && arr[0] === arr[2] && arr[0] !== undefined) {
            winner = true;
        } else if (arr[3] === arr[4] && arr[3] === arr[5] && arr[3] !== undefined) {
            console.log(arr[3]);
            winner = true;
        } else if (arr[6] === arr[7] && arr[6] === arr[8] && arr[6] !== undefined) {
            winner = true;
        } else if (arr[0] === arr[3] && arr[0] === arr[6] && arr[0] !== undefined) {
            winner = true;
        } else if (arr[1] === arr[4] && arr[1] === arr[7] && arr[1] !== undefined) {
            winner = true;
        } else if (arr[2] === arr[5] && arr[2] === arr[8] && arr[2] !== undefined) {
            winner = true;
        } else if (arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== undefined) {
            winner = true;
        } else if (arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== undefined) {
            winner = true;
        } else if (arrFull()) {
            winner = 'tie';
        } else {
            winner = false;
        }
        if (winner === true) {
            gameBoard.deactivateBoard();
            let winMessage = document.querySelector('#display-winner');
            winMessage.textContent = `${activePlayer.name} Wins!`;
            return true;
        } else if (winner === 'tie') {
            gameBoard.deactivateBoard();
            let winMessage = document.querySelector('#display-winner');
            winMessage.textContent = 'Tied! No Winner!';
            return true;
        } else {
            return false;
        }
    };
    const arrFull = () => {
        let arr = gameBoard.arr;
        for (let i = 0; i < arr.length; i++) {
            if (gameBoard.arr[i] === undefined) return false;
        }
        return true;
    }
    return {turn};
})();

const gameBoard = (() => {
    let arr = Array.apply('', Array(9));
    let boardSquares = document.querySelectorAll('.square');
    boardSquares.forEach((square) => {
        square.addEventListener('click', gameFlow.turn);
    });
    const deactivateBoard = () => {
        boardSquares.forEach((square) => {
            square.removeEventListener('click', gameFlow.turn);
            });
    };
    return {arr, deactivateBoard};
})();