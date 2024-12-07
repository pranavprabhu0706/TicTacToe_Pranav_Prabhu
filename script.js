// Log a welcome message to the console
console.log("Welcome to Tic Tac Toe");

// Initialize the game variables
let turn = "X"; // Current player's turn (either "X" or "O")
let isgameover = false; // Tracks whether the game is over

// Function to change the turn between players
const changeTurn = () => {
    return turn === "X" ? "0" : "X"; // If it's X's turn, change to O; otherwise, change to X
};

// Function to check if a player has won
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext'); // Get all the box text elements
    let wins = [
        // Winning combinations and line transformations
        [0, 1, 2, 5, 5, 0],   // Top row
        [3, 4, 5, 5, 15, 0],  // Middle row
        [6, 7, 8, 5, 25, 0],  // Bottom row
        [0, 3, 6, -5, 15, 90],// Left column
        [1, 4, 7, 5, 15, 90], // Middle column
        [2, 5, 8, 15, 15, 90],// Right column
        [0, 4, 8, 5, 15, 45], // Diagonal from top-left to bottom-right
        [2, 4, 6, 5, 15, 135] // Diagonal from top-right to bottom-left
    ];

    // Check each winning combination
    wins.forEach(e => {
        // Check if the same symbol is in all three winning positions
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !== "")) {

            // Display the winning message
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";

            // Mark the game as over
            isgameover = true;

            // Show the winning animation
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });
};

// Game logic: Add event listeners to each grid cell
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext'); // Get the text inside the clicked cell

    // Add a click listener to the cell
    element.addEventListener('click', () => {
        // Ensure the cell is empty before placing a symbol
        if (boxtext.innerText === '') {
            boxtext.innerText = turn; // Place the current player's symbol in the cell
            turn = changeTurn(); // Switch the turn to the other player
            checkWin(); // Check if the current move resulted in a win

            // Update the turn information if the game is not over
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add an event listener to the reset button
reset.addEventListener('click', () => {
    // Clear all cells
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""; // Reset the text in each cell
    });

    // Reset game variables
    turn = "X"; // Reset to X's turn
    isgameover = false; // Mark the game as not over

    // Reset the winning line and other visual elements
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});
