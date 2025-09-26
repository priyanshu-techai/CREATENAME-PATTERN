/**
 * Helper function to determine if a star should be printed for a specific
 * coordinate (i, j) of a given letter's grid.
 */
function isStar(letter, i, j, n) {
    const mid = Math.ceil(n / 2);

    // A
    if (letter === "A") {
        return (j === 1 || j === n) && i > 1 || i === mid || (i === 1 && j > 1 && j < n);
    }
    // B
    else if (letter === "B") {
        return j === 1 || (j === n && i > 1 && i < n && i !== mid) || ((i === 1 || i === n || i === mid) && j < n);
    }
    // C
    else if (letter === "C") {
        return (j === 1 && i > 1 && i < n) || ((i === 1 || i === n) && j > 1);
    }
    // D
    else if (letter === "D") {
        return j === 1 || (j === n && i > 1 && i < n) || ((i === 1 || i === n) && j < n);
    }
    // E
    else if (letter === "E") {
        return j === 1 || i === 1 || i === n || i === mid;
    }
    // F
    else if (letter === "F") {
        return j === 1 || i === 1 || i === mid;
    }
    // G
    else if (letter === "G") {
        return (j === 1 && i > 1 && i < n) || (i === 1 && j > 1) || (i === n && j > 1 && j < n) || (j === n && i >= mid) || (i === mid && j >= mid);
    }
    // H
    else if (letter === "H") {
        return j === 1 || j === n || i === mid;
    }
    // I
    else if (letter === "I") {
        return i === 1 || i === n || j === mid;
    }
    // J
    else if (letter === "J") {
        return i === 1 || j === mid || (i === n && j < mid);
    }
    // K
    else if (letter === "K") {
        return j === 1 || (i + j === mid + 1 && i <= mid) || (i - j === mid - 1 && i >= mid);
    }
    // L
    else if (letter === "L") {
        return j === 1 || i === n;
    }
    // M
    else if (letter === "M") {
        return j === 1 || j === n || (i === j && i <= mid) || (i + j === n + 1 && i <= mid);
    }
    // N
    else if (letter === "N") {
        return j === 1 || j === n || i === j;
    }
    // O
    else if (letter === "O") {
        return ((j === 1 || j === n) && i > 1 && i < n) || ((i === 1 || i === n) && j > 1 && j < n);
    }
    // P
    else if (letter === "P") {
        return j === 1 || ((i === 1 || i === mid) && j < n) || (j === n && i > 1 && i < mid);
    }
    // Q
    else if (letter === "Q") {
        return (((j === 1 || j === n) && i > 1 && i < n) || ((i === 1 || i === n) && j > 1 && j < n) || (i >= mid && i === j));
    }
    // R
    else if (letter === "R") {
        return j === 1 || ((i === 1 || i === mid) && j < n) || (j === n && i > 1 && i < mid) || (i > mid && i === j);
    }
    // S
    else if (letter === "S") {
        return (((i === 1 || i === mid || i === n) && j > 1 && j < n) || (j === 1 && i > 1 && i < mid) || (j === n && i > mid && i < n));
    }
    // T
    else if (letter === "T") {
        return i === 1 || j === mid;
    }
    // U
    else if (letter === "U") {
        return ((j === 1 || j === n) && i < n) || (i === n && j > 1 && j < n);
    }
    // V
      else if (letter === "V") {

    return (j === Math.ceil(i / 2)) || (j === n - Math.ceil(i / 2) + 1);

}
    // W
    else if (letter === "W") {
        return j === 1 || j === n || (i + j === n + 1 && i >= mid) || (i === j && i >= mid);
    }
    // X
    else if (letter === "X") {
        return i === j || i + j === n + 1;
    }
    // Y
    else if (letter === "Y") {
        return ((i === j || i + j === n + 1) && i <= mid) || (j === mid && i > mid);
    }
    // Z
    else if (letter === "Z") {
        return i === 1 || i === n || i + j === n + 1;
    }

    return false; // Default case
}

/**
 * Generates and returns a string for the name in a star pattern.
 */
function printNamePattern(name, n) {
    if (n % 2 === 0) {
        n++;
    }

    let finalOutput = "";
    for (let i = 1; i <= n; i++) {
        let line = "";
        for (const letter of name.toUpperCase()) {
            
            if (letter === ' ') {
                line += '    '; // Add a few spaces for a gap
                continue;      // Skip the rest of the loop for this character
            }
            for (let j = 1; j <= n; j++) {
                if (isStar(letter, i, j, n)) {
                    line += "*";
                } else {
                    line += " ";
                }
            }
            line += "   ";
        }
        finalOutput += line + "\n";
    }
    return finalOutput;
}


// --- DOM Manipulation ---

const nameInput = document.querySelector('input[type="text"]');
const submitButton = document.querySelector('button');
const displayDiv = document.querySelector('.dis');
const resetButton = document.querySelector('#resetBtn');

submitButton.addEventListener('click', () => {
    
    let name = nameInput.value;

    if (name.trim() === "") {
        displayDiv.innerHTML = "<p>Please enter a name first.</p>";
        return;
    }

    if (name.trim().toUpperCase() === 'DHRUVA') {
        name = name + ' SIR';
    }

    const pattern = printNamePattern(name, 7);
    displayDiv.innerHTML = `<pre>${pattern}</pre>`;
});

resetButton.addEventListener('click', () => {
    nameInput.value = '';
    displayDiv.innerHTML = '';
});