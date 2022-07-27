const playerFactory = (playerName, marker) => {
    return {name: playerName, marker};
};

let playerOne;
let playerTwo;
let activePlayer;

const gameSettings = (() => {
    let playerOneMarker;
    let playerTwoMarker;
    let playerOneName;
    let playerTwoName;
    const restart = document.querySelector('#restart');
    const playerOneO = document.querySelector('.Oone');
    const playerOneX = document.querySelector('.Xone');
    const playerTwoO = document.querySelector('.Otwo');
    const playerTwoX = document.querySelector('.Xtwo');
    const playerBtn = document.querySelector('.player');
    const aiBtn = document.querySelector('.ai');
    const submitBtn = document.querySelector('#submit');
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
    restart.addEventListener('click', () => {
        if (activePlayer === playerTwo) {
            changeActivePlayer();
        }
        gameBoard.clearBoard();
    });
    const toggleMarker = (event) => {
        if (event.target.classList.contains('Xone')) {
            playerOneX.classList.add('selected-marker');
            playerOneO.classList.remove('selected-marker');
            playerTwoO.classList.add('selected-marker');
            playerTwoX.classList.remove('selected-marker');
        } else {
            playerOneX.classList.remove('selected-marker');
            playerOneO.classList.add('selected-marker');
            playerTwoO.classList.remove('selected-marker');
            playerTwoX.classList.add('selected-marker');
        }
    };
    playerOneO.addEventListener('click', toggleMarker);
    playerOneX.addEventListener('click', toggleMarker);
    document.addEventListener('submit', (event) => {
        event.preventDefault();
        const overlay = document.querySelector('#overlay');
        const restart = document.querySelector('#restart');
        playerOneName = document.querySelector('[name="playerOneName"]').value;
        playerTwoName = document.querySelector('[name="playerTwoName"]').value;
        if (playerOneX.classList.contains('selected-marker')) {
            playerOneMarker = 'X';
            playerTwoMarker = 'O';
        } else {
            playerOneMarker = 'O';
            playerTwoMarker = 'X';
        }
        overlay.style.display = 'none';
        restart.style.display = 'inline-block';
        playerOne = playerFactory(playerOneName, playerOneMarker);
        playerTwo = playerFactory(playerTwoName, playerTwoMarker);
        createPlayerBoxes();
    });
    const createPlayerBoxes = () => {
        let playerOneBox = document.querySelector('.player-one');
        let oneBoxFirst = document.createElement('p');
        oneBoxFirst.textContent = `${playerOneName}`;
        playerOneBox.appendChild(oneBoxFirst);
        let oneBoxSecond = document.createElement('p');
        oneBoxSecond.style.fontFamily = "'Knewave', cursive";
        oneBoxSecond.textContent = `${playerOneMarker}`;
        playerOneBox.appendChild(oneBoxSecond);
        let playerTwoBox = document.querySelector('.player-two');
        let twoBoxFirst = document.createElement('p');
        twoBoxFirst.textContent = `${playerTwoName}`;
        playerTwoBox.appendChild(twoBoxFirst);
        let twoBoxSecond = document.createElement('p');
        twoBoxSecond.style.fontFamily = "'Knewave', cursive";
        twoBoxSecond.textContent = `${playerTwoMarker}`;
        playerTwoBox.appendChild(twoBoxSecond);
    };
    return {};
})();

const gameFlow = (() => {
    let endTurnEarly;
    let firstTurn = true;
    const addToDOM = (event) => {
        (event.target.textContent === '') ? event.target.textContent = activePlayer.marker : endTurnEarly = true;
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
        if (firstTurn === true) {
            activePlayer = playerOne;
            firstTurn = false;
        }
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
    const clearBoard = () => {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = undefined;
        }
        boardSquares.forEach((square) => {
            square.textContent = arr[0];
        });
        let winMsg = document.querySelector('#display-winner');
        if (winMsg.textContent !== '') {
            boardSquares.forEach((square) => {
                square.addEventListener('click', gameFlow.turn);
            });
            winMsg.textContent = '';
        }
    };
    return {arr, deactivateBoard, clearBoard};
})();