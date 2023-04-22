const Player = (token) => {
   
    const getToken = () => token;

    return {getToken};
}


const gameBoard = (() => {
    
    const board = new Array(9);

    //initialise the two players and starts the game
    const createPlayers = () => {
        const player1 = Player('x');
        const player2 = Player('o');
    }

    // Event listeners 
    const playBtn = document.getElementById('start-button');
    playBtn.addEventListener('click', createPlayers);

    return {};
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
