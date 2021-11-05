// global variables
let canvas;
let ctx;
let WIDTH = 600;
let HEIGHT = 400;
let TILESIZE = 32;

// get user input from keyboard
let keysDown = {};
let keysUp = {};

let gamePlan = `
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;



function makeGrid(plan, width) {
    let newGrid = [];
    let newRow = [];
    for (i of plan) {
        if (i != "\n") {
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            newGrid.push(newRow);
            newRow = [];
        }
    }
    return newGrid;
}




addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    console.log("key down is " + keysDown[event.key]);
    console.log(keysDown);
}, false);

addEventListener("keyup", function (event) {
    // keysUp[event.key] = true;
    delete keysDown[event.key];
    console.log(keysDown);
    console.log(keysUp);
}, false);

// here we use init (short for initialize) to setup the canvas and context
// this function will be called in the HTML document in body onload = ""
// we also append the body with a new canvas element
function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}

class Square {
    constructor(id, x, y, speed, w, h, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    create(x, y, speed, w, h, color) {
        return new Square(x, y, speed, w, h, color);
    }
    update() {
        if (this.x >= WIDTH - this.w || this.x < 0) {
            // console.log("I fell off the side!!!!")
            this.speed = -this.speed;
        }
        this.x += this.speed;
        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
    };
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}

class Player extends Square {
    constructor(id, x, y, speed, w, h, color, hitpoints) {
        super(id, x, y, speed, w, h, color);
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }
    update() {
        if ('w' in keysDown) {
            this.y -= this.speed;
        }
        if ('a' in keysDown) {
            this.x -= this.speed;
        }
        if ('s' in keysDown) {
            this.y += this.speed;
        }
        if ('d' in keysDown) {
            this.x += this.speed;
        }

        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
    };
}

const levelChars = {
    ".": "empty",
    "#": Square,
};

function readLevel(grid) {
    let startActors = [];
    // note the change from i to x and y
    for (y in grid) {
        for (x in grid[y]) {
            /*              crate a variable based on the current
            item in the two dimensional array being read
             */
            let ch = grid[y][x];
            /* if the character is not a new line character
            create a variable from the value attached to the 
            key in the object, e.g. 

            const levelChars = {
                ".": "empty",
                "#": Square,
            };

            where "." is the key and the value is "empty"
            In the case of "#", the key is "#" and the value
            is the Square class.
            
            */
            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                }
                else {
                    let t = new type;
                /*  Here we can use the x and y values from reading the grid, 
                    then adjust them based on the tilesize
                     */
                    startActors.push(t.create(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE, 'red'))
                }
            }
        }
    }
    return startActors;
}


readLevel(makeGrid(gamePlan, 22));


// instantiations...
let player1 = new Player("Me", WIDTH / 2, HEIGHT / 2, 1, 40, 40, 'rgb(100, 100, 100)', 100);
let oneSquare = new Square("Bob", 10, 10, 1, 50, 50, 'rgb(200, 100, 200)');
let twoSquare = new Square("Chuck", 60, 60, 5, 100, 100, 'rgb(200, 200, 0)');
let threeSquare = new Square("Bill", 70, 70, 3, 25, 25, 'rgb(100, 100, 222)');

let allSprites = [oneSquare, twoSquare, threeSquare, player1];


function update() {
    for (i of allSprites) {
        // console.log(i);
        i.update();
    }

    // oneSquare.update();
    // twoSquare.update();
}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
    }
}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}