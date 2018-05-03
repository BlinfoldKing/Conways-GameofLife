const Xsize = 200;
const Ysize = 200;

function screenToGrid(screenX, screenY) {

    return [floor(screenX / 10), floor(screenY / 10)]
}


let Grid = [];
let liveCount = 0;

let simulationRun = false;


function setup() {
    createCanvas(Xsize, Ysize);
    background('#333');

    //Grid = new Array();
    for (let i = 0; i < Number(floor(Xsize / 10)) + 1; i++) {
        Grid[i] = [];
        for (let j = 0; j < Number(floor(Ysize / 10)) + 1; j++) {
            Grid[i][j] = false;
        }
    }

    console.log(Grid)

    let startButton = createButton('START');
    startButton.mousePressed(() => simulationRun = true);
    let stopButton = createButton('STOP');
    stopButton.mousePressed(() => simulationRun = false);
    let resetButton = createButton('RESET');
    resetButton.mousePressed(() => {
        for (let i = 0; i < Number(floor(Xsize / 10)) + 1; i++) {
            Grid[i] = [];
            for (let j = 0; j < Number(floor(Ysize / 10)) + 1; j++) {
                Grid[i][j] = false;
            }
        } 
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


    if (x + 1 < floor(Xsize / 10)) {
        if (Grid[x + 1][y])
            sum += 1;

        if (y + 1 < floor(Ysize / 10)) {
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

    //console.log(simulationRun);
    //console.log(liveCount)

    if (simulationRun) {
        console.log('simulation is running')
        liveCount = 0;
        let newGrid = [];
        for (let i = 0; i < Grid.length; i++) {
            newGrid[i] = [];
            for (let j = 0; j < Grid[i].length; j++) {
                let n = countNeighbour(i, j);
                //console.log(n)
                if (n == 3 && !Grid[i][j]) {
                    newGrid[i][j] = true;
                    liveCount++;
                } else if (n < 2 || n > 3) {
                    newGrid[i][j] = false;
                } else {
                    newGrid[i][j] = Grid[i][j];
                }
            }
        }
        //console.log(newGrid)
        Grid = newGrid;
    }

    if (liveCount == 0) simulationRun = false;


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
    //console.log(mouseX, mouseY);
    let pos = screenToGrid(mouseX, mouseY)
    if (pos[0] < Xsize && pos[1] < Ysize){
        Grid[pos[0]][pos[1]] = !Grid[pos[0]][pos[1]];
    }
    if (Grid[pos[0]][pos[1]]) {
        liveCount++;
    } else {
        liveCount--;
    }
}