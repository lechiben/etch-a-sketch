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
        square.setAttribute('data-darken', '0'); // Initial darkening level (0 means no darkening)

        // Add hover effect to change color when mouse enters the square
        square.addEventListener('mouseenter', () => {
            let currentDarkenLevel = parseInt(square.getAttribute('data-darken'));
            if (currentDarkenLevel === 0) {
                // Set a random color on the first interaction
                const randomRGB = getRandomRGB();
                square.style.backgroundColor = `rgb(${randomRGB.r}, ${randomRGB.g}, ${randomRGB.b})`;
            }
            
            // Darken progressively on each interaction
            darkenSquare(square, currentDarkenLevel);
        });

        container.appendChild(square);
    }
}

// Function to generate a random RGB color
function getRandomRGB() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

// Function to progressively darken the square by 10% on each interaction
function darkenSquare(square, currentDarkenLevel) {
    if (currentDarkenLevel < 10) {
        currentDarkenLevel++;
        square.setAttribute('data-darken', currentDarkenLevel);
        
        // Extract current background color
        const currentColor = square.style.backgroundColor;
        const rgbValues = currentColor.match(/\d+/g).map(Number);

        // Apply darkening (reduce each RGB value by 10% of its original)
        const darkenedColor = rgbValues.map(value => Math.floor(value * (1 - 0.1 * currentDarkenLevel)));
        square.style.backgroundColor = `rgb(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]})`;
    }
}

// Create an initial 16x16 grid on page load
createGrid(16);