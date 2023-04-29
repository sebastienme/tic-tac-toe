//Player object that create a player and return the token to display on the board
const Player = (token) => {
   
    const getToken = () => token;

    return {getToken};
}

//factory function that has all the game logic
const gameBoard = (() => {
    //initialise function variable
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

    //function that change the marker on each player's turn 
    const updateMarker = () => {
        if (marker == player1) {
            marker = player2
        } else {
            marker = player1
        }
    }

    //function that validate each of the possible winning combination of the game
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

        //funtion that takes 1 combination as parameters and check if the board has a winning combination 
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
        
        //function that iterates on each of the winning combination
        winningCombinaison.forEach((element) => {
            const validate = isValid(element);
            if (validate == true) {
                boardWin = true;
            }
        });

        //if one of the cominantion is true, it returns true
        return boardWin;
    }

    const validateTie = () => {
        let count = 0;
        let isValid = false;
        const check = (element) => {
            count = count + 1;
            return  count === 9;
          }

        board.forEach(element => {
           if (check(element) == true) {
            isValid = true;
           }
        })

        return isValid;
    }

    //function that activate the tic-tac-toe grid and make the case clickable do the user    
    const activateBoard = () => {
        marker = player1;
        domElements.selectors('.case').forEach((element) => {
            element.addEventListener('click', () => {
                const alert = domElements.selector('.alert');

                //if the box clicked by the user has no marker on it
                if (board[element.dataset.id] == null) {

                    alert.classList.remove('visible')
                    alert.classList.add('invisible')

                    board[element.dataset.id] = marker;
                    
                    element.innerHTML = marker.getToken();

                    if (validateBoard() == true) {
                        displayController.gameDone('win', marker.getToken());

                    } else if (validateTie() == true) {
                        displayController.gameDone('tie');
                    }

                    updateMarker();

                } else {
        
                    alert.innerHTML = 'Choisis une autre case';

                    alert.classList.remove('invisible')
                }
            })
        })
    }

    //event listner on start game buttons
    const playBtn = document.querySelectorAll('#start-button');
    playBtn.forEach(element => {
        element.addEventListener('click', createPlayers);
    })

    return {createPlayers};
})();

//factory function that modify visuals on the page
const displayController = (() => {

    //function that creates the tic-tac-to grid
    const displayBoard = (number) => {
        domElements.selector('.tic-tac-grid').innerHTML = "";
        for (let i = 0; i < number; i++) {
           domElements.append('.tic-tac-grid', domElements.div("case", i))
        }
    }

    //function that display a pop up box on the screen and highlight the winner of the game
    const gameDone = (result, text) => {
        $(document).ready(function(){
            // Show the Modal on load
            $("#staticBackdrop").modal("show");
        });

        if (result == 'win') {

            document.querySelector('.modal-body').innerHTML = `Les ${text.toUpperCase()} ont gagné la partie!`;
        
        } else if (result == 'tie') {

            document.querySelector('.modal-body').innerHTML = "Partie nulle!";
            document.querySelector('#staticBackdropLabel').innerHTML = "Oops!"
        }
        
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


