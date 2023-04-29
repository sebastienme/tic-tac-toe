const Player = (token) => {
   
    const getToken = () => token;

    return {getToken};
}


const gameBoard = (() => {
    let player1;
    let player2;
    let marker;
    let board;

    //initialise the two players and starts the game
    const createPlayers = () => {
        board = new Array(9);
        player1 = Player('x');
        player2 = Player('o');
        
        displayController.displayBoard(9);

        activateBoard();
    }

    const updateMarker = () => {
        if (marker == player1) {
            marker = player2
        } else {
            marker = player1
        }
    }

    const validateBoard = () => {
        let boardWin = false;

        const winningCombinaison = [
            [0, 1, 2],
            [0, 4, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [3, 4, 5],
            [6, 7, 8],
            [2, 4, 6]
        ];

        const isValid = (combinaison) => {

            if (board[combinaison[0]] == board[combinaison[0]]
                && board[combinaison[1]] == board[combinaison[0]]
                && board[combinaison[2]] == board[combinaison[0]]
                && board[combinaison[0]] != null) {
                return true;
            } else {
                return false;
            }
        }
        
        winningCombinaison.forEach((element) => {
            const validate = isValid(element);
            if (validate == true) {
                boardWin = true;
            }
        });

        return boardWin;
    }
        
    const activateBoard = () => {
        marker = player1;
        domElements.selectors('.case').forEach((element) => {
            element.addEventListener('click', () => {
                const alert = domElements.selector('.alert');

                if (board[element.dataset.id] == null) {

                    alert.classList.remove('visible')
                    alert.classList.add('invisible')

                    board[element.dataset.id] = marker;
                    
                    element.innerHTML = marker.getToken();

                    if (validateBoard() == true) {
                        displayController.gameDone(marker);
                    }

                    updateMarker();

                } else {
        
                    alert.innerHTML = 'Choisis une autre case';

                    alert.classList.remove('invisible')
                }
            })
        })
    }

    // Event listeners 
    const playBtn = document.querySelectorAll('#start-button');
    playBtn.forEach(element => {
        element.addEventListener('click', createPlayers);
    })

    return {createPlayers};
})();


const displayController = (() => {

    const displayBoard = (number) => {
        domElements.selector('.tic-tac-grid').innerHTML = "";
        for (let i = 0; i < number; i++) {
           domElements.append('.tic-tac-grid', domElements.div("case", i))
        }
    }

    const gameDone = (winner) => {
        $(document).ready(function(){
            // Show the Modal on load
            $("#staticBackdrop").modal("show");
        });

        document.querySelector('.modal-body').innerHTML = `Les ${winner.getToken().toUpperCase()} ont gagné la partie!`;
    }

    return {displayBoard, gameDone}
})();


const domElements = (() => {
    
    //create a div element
    const div = (classe, id) => {
        const newDiv = document.createElement("div");
        newDiv.setAttribute('class', classe)
        newDiv.dataset.id = id;
        return newDiv;
    }

    //append an element
    const append = (selector, toAppend) => {
        const element = document.querySelector(selector);
        element.appendChild(toAppend);
    }

    //select an element
    const selector = (element) => document.querySelector(element);

    //select elements
    const selectors = (element) => document.querySelectorAll(element);



    return {div, append, selector, selectors};
})();


