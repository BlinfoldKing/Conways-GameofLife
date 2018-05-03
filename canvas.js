const Xsize = 1280;
const Ysize = 960;


function setup() {
    createCanvas(Xsize, Ysize);
    background('#333');
}

function draw() {
    
    stroke(100);
    noFill();
    for (let i = 0; i < Xsize; i++) {
        for (let j = 0; j < Ysize; j+=10) {
            if (i % 10 == 0)
                rect(i, j, 10, 10);
        }
    }
}