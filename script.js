// Selecting necessary elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#resetBtn");
const msgContainer = document.querySelector(".msg-container");
const msgElement = document.querySelector("#msg");
const newBtn = document.querySelector("#newBtn");

// Game state
let turnO = true; // true for player O, false for player X
let gameActive = true; // Game state to control if the game is ongoing

// Winning patterns
const winPatterns = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6]
];

// Handle box clicks
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        // Check if the game is active and the box is empty
        if (gameActive && box.innerText === "") {
            // Set the box's value based on the current player's turn
            box.innerText = turnO ? "O" : "X";
            box.disabled = true; // Disable the box

            // Check for a winner
            checkWinner();

            // Switch turns
            turnO = !turnO;
        }
    });
});

// Function to check the winner
const checkWinner = () => {
    // Iterate over all winning patterns
    for (let pattern of winPatterns) {
        // Get the values of the boxes in the pattern
        const [a, b, c] = pattern.map(i => boxes[i].innerText);

        // Check if all values are the same and not empty
        if (a !== "" && a === b && b === c) {
            // A winner is found
            announceWinner(a);
            gameActive = false; // Game ends
            return;
        }
    }
    
    // Check for a draw (all boxes filled and no winner)
    if (Array.from(boxes).every(box => box.innerText !== "")) {
        announceDraw();
        gameActive = false; // Game ends
    }
};

// Function to announce the winner
const announceWinner = (winner) => {
    // Display the winner message
    msgElement.innerText = `${winner} Wins!`;
    msgContainer.classList.remove("hide");
    // Disable all boxes
    boxes.forEach(box => box.disabled = true);
};

// Function to announce a draw
const announceDraw = () => {
    msgElement.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
};

// Reset the game
const resetGame = () => {
    // Clear all boxes and re-enable them
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });

    // Reset game state
    gameActive = true;
    turnO = true; // Start with player O

    // Hide the message container
    msgContainer.classList.add("hide");
};

// Add event listener to the reset button
resetBtn.addEventListener("click", resetGame);

// Add event listener to the new game button
newBtn.addEventListener("click", resetGame);
