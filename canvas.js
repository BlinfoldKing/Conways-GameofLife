const Xsize = 200;
const Ysize = 200;

function screenToGrid (screenX, screenY) {
    
    return  [floor(screenX / 10), floor(screenY / 10)]
}


let Grid;


let simulationRun = false;


function setup() {
    createCanvas(Xsize, Ysize);
    background('#333');

    Grid = new Array(floor(screenX / 10));
    for (let i = 0; i < Grid.length; i++) {
        Grid[i] = new Array(floor(screenY / 10));
        for (let j = 0; j < Grid[i].length; j++) {
            Grid[i][j] = false;
        }
    }


    let button = createButton('toogle simulation');
    button.mousePressed(() => simulationRun != simulationRun);

}

function countNeighbour (x, y) {
    let sum = 0;

    if (x > 0 && Grid[x - 1][y])
        sum += 1;
    if (y > 0 && Grid[x][y - 1])
        sum += 1;
    if (x < Grid.length && Grid[x + 1][y])
        sum += 1;
    if (y > Grid[x].length && Grid[x][y + 1])
        sum += 1;
    
}


function draw() {
    
    
    if (simulationRun) {
        for (let i = 0; i < Grid.length; i++) {
            for (let j = 0; j < Grid[i].length; j++) {
                let n = countNeighbour(i, j);
                if (n == 3 && !Grid[i][j]) {
                    Grid[i][j] = true;
                } else if (n < 2 || n > 3) {
                    Grid[i][j] = false;
                }
            }
        }
    }


    stroke(100);
    for (let i = 0; i < Xsize; i+= 10) {
        for (let j = 0; j < Ysize; j+=10) {
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

function mouseClicked() {
    //console.log(mouseX, mouseY);
    let pos = screenToGrid(mouseX, mouseY)
    Grid[pos[0]][pos[1]] = !Grid[pos[0]][pos[1]];
    //console.log(Grid)
  }