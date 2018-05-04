const Xsize = 640;
const Ysize = 480;

function screenToGrid(screenX, screenY) {

    return [floor(screenX / 10), floor(screenY / 10)]
}


let Grid = [];
let liveCount = 0;

let simulationRun = false;


function setup() {
    createCanvas(Xsize, Ysize);
    background('#333');

    for (let i = 0; i < Number(floor(Xsize / 10)); i++) {
        Grid[i] = [];
        for (let j = 0; j < Number(floor(Ysize / 10)); j++) {
            Grid[i][j] = false;
        }
    }

    let startButton = createButton('Toogle Simulation');
    startButton.mouseClicked(() => simulationRun = !simulationRun);
    let resetButton = createButton('RESET');
    resetButton.mousePressed(() => {
        for (let i = 0; i < Number(floor(Xsize / 10)) + 1; i++) {
            Grid[i] = [];
            for (let j = 0; j < Number(floor(Ysize / 10)) + 1; j++) {
                Grid[i][j] = false;
            }
        }
        simulationRun = false;
    })
}

function countNeighbour(x, y) {
    let sum = 0;

    if (x > 0) {
        if (Grid[x - 1][y])
            sum += 1;

        if (y + 1 < floor(Ysize / 10)) {
            if (Grid[x - 1][y + 1])
                sum += 1;
        }

        if (y > 0) {
            if (Grid[x - 1][y - 1])
                sum += 1;
        }
    }


    if (y > 0) {
        if (Grid[x][y - 1])
            sum += 1;

        if (x + 1 < floor(Ysize / 10)) {
            if (Grid[x + 1][y - 1])
                sum += 1;
        }

    }


    if (x + 1 < floor(Xsize / 10) - 1) {
        if (Grid[x + 1][y])
            sum += 1;

        if (y + 1 < floor(Ysize / 10) - 1) {
            if (Grid[x + 1][y + 1])
                sum += 1;
        }
    }


    if (y + 1 < floor(Ysize / 10)) {
        if (Grid[x][y + 1])
            sum += 1;
    }

    return sum;

}


function draw() {


    if (simulationRun) {
        liveCount = 0;
        let newGrid = [];
        for (let i = 0; i < Grid.length; i++) {
            newGrid[i] = [];
            for (let j = 0; j < Grid[i].length; j++) {
                let n = countNeighbour(i, j);
                if (n == 3 && !Grid[i][j]) {
                    newGrid[i][j] = true;
                   
                } else if (n < 2 || n > 3) {
                    newGrid[i][j] = false;
                } else {
                    newGrid[i][j] = Grid[i][j];
                }
                if (newGrid[i][j]) liveCount++;
            }
        }
        Grid = newGrid;
    }

    if (liveCount < 0) 
        simulationRun = false;

    stroke(100);
    for (let i = 0; i < Xsize; i += 10) {
        for (let j = 0; j < Ysize; j += 10) {
            push()
            if (Grid[i / 10][j / 10]) {
                fill(255)
            } else {
                fill('#333')
            }
            rect(i, j, 10, 10)
            pop()
        }
    }
    
}

function mousePressed() {
    let pos = screenToGrid(mouseX, mouseY)
    if (pos[0] < floor(Xsize / 10) - 1 && floor(Ysize / 10) - 1) {
        Grid[pos[0]][pos[1]] = !Grid[pos[0]][pos[1]];
        if (Grid[pos[0]][pos[1]]) {
            liveCount++;
        } else {
            liveCount--;
        }
    }
}