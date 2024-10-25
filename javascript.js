const container = document.getElementById('container');
const newGridButton = document.getElementById('newGridButton');

// Event listener for the "Create New Grid" button
newGridButton.addEventListener('click', () => {
    let gridSize = prompt("Enter the number of squares per side for the new grid (max 100):");

    // Validate the input to ensure it's a number between 1 and 100
    gridSize = parseInt(gridSize);
    if (gridSize > 0 && gridSize <= 100) {
        createGrid(gridSize); // Create new grid with the user-specified size
    } else {
        alert("Please enter a number between 1 and 100.");
    }
});

function createGrid(size) {
    container.innerHTML = ''; // Clear the container of any existing squares
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // Adjust the grid columns
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`; // Adjust the grid rows
    
    const totalSquares = size * size;
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');

        // Add hover effect to change color when mouse enters the square
        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = getRandomColor(); // Change to random color
        });

        container.appendChild(square);
    }
}

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Create an initial 16x16 grid on page load
createGrid(16);