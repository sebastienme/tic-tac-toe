const gameBoard = (() => {
    
    const board = new Array(9);

    const boardLenght = () => board.length;

    return {boardLenght};
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

    const div = (classe, id) => {
        const newDiv = document.createElement("div");
        newDiv.setAttribute('class', classe)
        newDiv.dataset.id = id;
        return newDiv;
    }

    const append = (selector, toAppend) => {
        const element = document.querySelector(selector);
        element.appendChild(toAppend);
    }

    return {div, append};
})();

displayController.displayBoard(gameBoard.boardLenght());
