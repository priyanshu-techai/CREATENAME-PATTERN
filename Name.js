// isStar function remains the same as before
function isStar(letter, i, j, n) {
    const mid = Math.ceil(n / 2);
    if (letter === "A") { return (j === 1 || j === n) && i > 1 || i === mid || (i === 1 && j > 1 && j < n); }
    else if (letter === "B") { return j === 1 || (j === n && i > 1 && i < n && i !== mid) || ((i === 1 || i === n || i === mid) && j < n); }
    else if (letter === "C") { return (j === 1 && i > 1 && i < n) || ((i === 1 || i === n) && j > 1); }
    else if (letter === "D") { return j === 1 || (j === n && i > 1 && i < n) || ((i === 1 || i === n) && j < n); }
    else if (letter === "E") { return j === 1 || i === 1 || i === n || i === mid; }
    else if (letter === "F") { return j === 1 || i === 1 || i === mid; }
    else if (letter === "G") { return (j === 1 && i > 1 && i < n) || (i === 1 && j > 1) || (i === n && j > 1 && j < n) || (j === n && i >= mid) || (i === mid && j >= mid); }
    else if (letter === "H") { return j === 1 || j === n || i === mid; }
    else if (letter === "I") { return i === 1 || i === n || j === mid; }
    else if (letter === "J") { return i === 1 || j === mid || (i === n && j < mid); }
    else if (letter === "K") { return j === 1 || (i + j === mid + 1 && i <= mid) || (i - j === mid - 1 && i >= mid); }
    else if (letter === "L") { return j === 1 || i === n; }
    else if (letter === "M") { return j === 1 || j === n || (i === j && i <= mid) || (i + j === n + 1 && i <= mid); }
    else if (letter === "N") { return j === 1 || j === n || i === j; }
    else if (letter === "O") { return ((j === 1 || j === n) && i > 1 && i < n) || ((i === 1 || i === n) && j > 1 && j < n); }
    else if (letter === "P") { return j === 1 || ((i === 1 || i === mid) && j < n) || (j === n && i > 1 && i < mid); }
    else if (letter === "Q") { return (((j === 1 || j === n) && i > 1 && i < n) || ((i === 1 || i === n) && j > 1 && j < n) || (i >= mid && i === j)); }
    else if (letter === "R") { return j === 1 || ((i === 1 || i === mid) && j < n) || (j === n && i > 1 && i < mid) || (i > mid && i === j); }
    else if (letter === "S") { return (((i === 1 || i === mid || i === n) && j > 1 && j < n) || (j === 1 && i > 1 && i < mid) || (j === n && i > mid && i < n)); }
    else if (letter === "T") { return i === 1 || j === mid; }
    else if (letter === "U") { return ((j === 1 || j === n) && i < n) || (i === n && j > 1 && j < n); }
    else if (letter === "V") {  return (j === Math.ceil(i / 2)) || (j === n - Math.ceil(i / 2) + 1); }
    else if (letter === "W") { return j === 1 || j === n || (i + j === n + 1 && i >= mid) || (i === j && i >= mid); }
    else if (letter === "X") { return i === j || i + j === n + 1; }
    else if (letter === "Y") { return ((i === j || i + j === n + 1) && i <= mid) || (j === mid && i > mid); }
    else if (letter === "Z") { return i === 1 || i === n || i + j === n + 1; }
    return false;
}

// --- DOM Manipulation & Animation Logic ---

const nameInput = document.querySelector('input[type="text"]');
const submitButton = document.querySelector('button');
const displayDiv = document.querySelector('.dis');
const resetButton = document.querySelector('#resetBtn');

// ⭐ New variable to keep track of the animation interval
let animationInterval = null;

// This function now creates an empty grid and a list of where stars should go
function setupGridAndGetStarQueue(name, n) {
    if (n % 2 === 0) n++;

    let starQueue = []; // This will be our list of stars to draw
    let gridHTML = "";  // This will be the initial empty grid

    for (let i = 1; i <= n; i++) {
        let line = "";
        let letterIndex = 0;
        for (const letter of name.toUpperCase()) {
            if (letter === ' ') {
                line += '    '; // Handle spaces
                continue;
            }
            for (let j = 1; j <= n; j++) {
                // The unique ID for each character cell
                const cellId = `cell-${i}-${letterIndex}-${j}`;
                line += `<span id="${cellId}"> </span>`; // Create an empty span

                // If a star belongs here, add its ID to our queue
                if (isStar(letter, i, j, n)) {
                    starQueue.push(cellId);
                }
            }
            line += "   "; // Gap between letters
            letterIndex++;
        }
        gridHTML += line + "\n";
    }

    // Set the empty grid on the page
    displayDiv.innerHTML = `<pre>${gridHTML}</pre>`;
    
    // Return the list of star locations
    return starQueue;
}

submitButton.addEventListener('click', () => {
    // ⭐ Stop any previous animation that might be running
    if (animationInterval) {
        clearInterval(animationInterval);
    }
    
    let name = nameInput.value;
    if (name.trim() === "") {
        displayDiv.innerHTML = "<p>Please enter a name first.</p>";
        return;
    }

    if (name.trim().toUpperCase() === 'DHRUVA') {
        name = name + ' SIR';
    }

    // Disable buttons during animation
    submitButton.disabled = true;
    resetButton.disabled = true;

    // Get the list of star locations and set up the empty grid
    const starQueue = setupGridAndGetStarQueue(name, 7);
    let starIndex = 0;

    // ⭐ Start the animation timer (1000ms = 1 second)
    animationInterval = setInterval(() => {
        // If we've drawn all the stars, stop the timer
        if (starIndex >= starQueue.length) {
            clearInterval(animationInterval);
            animationInterval = null;
            // Re-enable buttons
            submitButton.disabled = false;
            resetButton.disabled = false;
            return;
        }

        // Get the ID of the next star's cell
        const cellId = starQueue[starIndex];
        const cell = document.getElementById(cellId);

        // Put a star in that cell
        if (cell) {
            cell.textContent = '*';
        }

        // Move to the next star in our list
        starIndex++;

    }, 50); // Print one star every 1000 milliseconds
});

resetButton.addEventListener('click', () => {
    // ⭐ Stop the animation if it's running
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }

    // Clear the input and display
    nameInput.value = '';
    displayDiv.innerHTML = '';

    // Make sure buttons are usable again
    submitButton.disabled = false;
    resetButton.disabled = false;
});
