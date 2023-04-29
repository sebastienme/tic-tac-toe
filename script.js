const Player = (token) => {
   
    const getToken = () => token;

    return {getToken};
}


const gameBoard = (() => {
    let player1;
    let player2;
    let marker;
    const board = new Array(9);

    //initialise the two players and starts the game
    const createPlayers = () => {
        player1 = Player('x');
        player2 = Player('o');
        
        activateBoard();
    }

    const updateMarker = () => {
        if (marker == player1) {
            marker = player2
        } else {
            marker = player1
        }
    }
        
    const activateBoard = () => {
        marker = player1;
        domElements.selectors('.case').forEach((element) => {
            element.addEventListener('click', () => {
                element.innerHTML = marker.getToken();
                
                updateMarker();
                console.log('hello')
            })
        })
    }

    // Event listeners 
    const playBtn = document.getElementById('start-button');
    playBtn.addEventListener('click', createPlayers);

    return {createPlayers};
})();


const displayController = (() => {

    const displayBoard = (number) => {
        for (let i = 0; i < number; i++) {
           domElements.append('.tic-tac-grid', domElements.div("case", i))
        }
    }

    return {displayBoard}
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


displayController.displayBoard(9);
