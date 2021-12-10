// global variables
let canvas;
let ctx;
let timerThen = null;
let TILESIZE = 64;
let WIDTH = TILESIZE * 31;
let HEIGHT = TILESIZE * 12;
let allSprites = [];
let walls = [];
let enemies = [];
let powerups = [];
let allProjectiles = [];
let playerImage = new Image();
playerImage.src = "../cs_principles/images/bell.png"
let blockImage = new Image();
blockImage.src = "../cs_principles/images/block.png"
let pewImage = new Image();
pewImage.src = "../cs_principles/images/bullet.png"
let enemyImage = new Image();
enemyImage.src = "../cs_principles/images/spaceinvader_32x32.png"
let backgroundImage = new Image();
backgroundImage.src = "../cs_principles/images/background.jpg"


let gamePlan1 = `
.#.........................#...
.#.......@.................#...
.#.........................#...
.#................#####....#...
.#.........................#...
.#........#####............#...
.#.........................#...
.#..!.............#####....#...
.#####.....................#...
.....#.....................#...
.....#######################...
...............................`;


// get user input from keyboard for each ley so mutliple can be held at the same time
let keysaDown = {};
let keysaUp = {};

let keyswDown = {};
let keyswUp = {};

let keysdDown = {};
let keysdUp = {};

let keys_Down = {};
let keys_Up = {};


addEventListener("keydown", function (event) {
    // keysDown = {};
    keysaDown[event.key] = true;
    // console.log(event);
}, false);

addEventListener("keyup", function (event) {
    keysaUp[event.key] = true;
    delete keysaDown[event.key];
    // console.log(event);
}, false);


addEventListener("keydown", function (event) {
    // keysDown = {};
    keyswDown[event.key] = true;
    // console.log(event);
}, false);

addEventListener("keyup", function (event) {
    keysaUp[event.key] = true;
    delete keyswDown[event.key];
    // console.log(event);
}, false);


addEventListener("keydown", function (event) {
    // keysDown = {};
    keysdDown[event.key] = true;
    // console.log(event);
}, false);

addEventListener("keyup", function (event) {
    keysdUp[event.key] = true;
    delete keysdDown[event.key];
    // console.log(event);
}, false);

addEventListener("keydown", function (event) {
    // keysDown = {};
    keys_Down[event.key] = true;
    // console.log(event);
}, false);

addEventListener("keyup", function (event) {
    keysaUp[event.key] = true;
    delete keys_Down[event.key];
    // console.log(event);
}, false);

function drawText(r, g, b, a, font, align, base, text, x, y) {
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = base;
    ctx.fillText(text, x, y);
}

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

class Sprite {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.spliced = false;
        allSprites.push(this);
    }
    get cx() {
        return this.x + this.w * 0.5;
    }
    get cy() {
        return this.y + this.h * 0.5;
    }
    get left() {
        return this.x
    }
    get right() {
        return this.x + this.w
    }
    get top() {
        return this.y
    }
    get midtop() {
        return this.y + this.w * 0.5;
    }
    get bottom() {
        return this.y + this.h
    }
    get midbottom() {
        return (this.y + this.h) + this.w * 0.5
    }
    get type() {
        return "sprite";
    }
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    collideWith(obj, buffer) {
        if (this.right >= obj.left + buffer &&
            this.left <= obj.right - buffer &&
            this.bottom >= obj.top + buffer && 
            this.top <= obj.bottom - buffer
        ) {
            return true;
        }
    }
    // modified from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/rectangle-collision/rectangle-collision.html
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}


class Player extends Sprite {
    constructor(x, y, speed, w, h, color, hitpoints, shootspeed) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.dx = 0;
        this.dy = 0;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.canJump;
        this.timesJumped = 0;
        this.canShoot = true;
        this.gravity = 0.98;
        this.coFriction = 0.5;
        this.jumpPower = 20;
        this.damaged = false;
        this.color = color;
        this.hitpoints = hitpoints;
        this.shootspeed = 500;
    }

    jump() {
        this.vy = -this.jumpPower;
        this.canJump = false;
    }
    pewpew() {
        let p = new PewPew(this.x + this.w * 0.333, this.y, TILESIZE / 4, TILESIZE / 4);
    }


    get type() {
        return "player";
    }
    input() {
        // checks for user input
        if ("a" in keysaDown) { // Player holding left
            this.vx = -this.speed;
        } else if ("d" in keysdDown) { // Player holding right
            this.vx = this.speed;
        } else if (" " in keys_Down && this.canJump) { // Player holding jump
            this.jump();
        }
        else if ("w" in keyswDown) {
            if (this.canShoot) {
                this.pewpew();
                this.canShoot = false;
                setTimeout(() => this.canShoot = true, this.shootspeed);

            }
        }
        // else if ("t" in keysDown) {
        //     timerThen = performance.now();
        //     timerStarted = true;
        // }



    }
    frictionX() {
        if (this.vx > 0.5) {
            this.vx -= this.coFriction;
        } else if (this.vx < -0.5) {
            this.vx += this.coFriction;
        }
        else {
            this.vx = 0;
        }
    }

    update() {
        this.vy += this.gravity;
        this.input();
        this.frictionX();
        this.x += this.vx;
        this.y += this.vy;
        for (i of allSprites) {
            if (i.type == "rapid"){
                if (this.collideWith(i, 0)) {
                    this.shootspeed = 300;
                    i.spliced = true;
                }
            }
            if (i.type == "wall") {
                if (this.collideWith(i, 0)) {
                    this.canJump = true;
                    let diff = Math.abs(this.cx - i.cx);
                    if (diff <= TILESIZE) {
                        if (this.y > i.cy) {
                            this.y = i.bottom;
                            this.vx = 0;
                            this.vy = 0;
                            this.vy += this.gravity;
                        }
                        else{
                            this.y = i.top - this.h;
                            // this.canJump = true;
                            this.vy = 0
                        }

                    }
                    if (this.cy > i.cy) {
                        if (this.vx > 0) {
                            this.x = i.left - this.w ;
                        }
                        else if (this.vx < 0) { this.x = i.right }
                    }

                }
            }
            // if (this.bottom == i.top) {
            //     this.canJump = true;
            // }
        }

        if (this.x + this.w > WIDTH) {
            this.x = WIDTH - this.w;
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y + this.h > HEIGHT) {
            this.y = HEIGHT - this.h;
        }
        if (this.y <= 0) {
            this.y = 0;
        }

    }
        draw(){
            ctx.drawImage(playerImage, 0, 0, TILESIZE/2, TILESIZE/2, this.x, this.y, TILESIZE, TILESIZE);
    }

}

class Enemy extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.vx = 1;
        this.vy - 0;
        this.w = w;
        this.h = h;
        this.speed = 6;
        this.alive = true;
        this.color = "blue";
        enemies.push(this);

    }
    create(x, y, w, h) {
        return new Enemy(x, y, w, h);
    }
    get type() {
        return "enemy";
    }
    // if you want to get crazy...do this
    // rotate() {
    //     ctx.save();
    //     ctx.translate(this.x, this.y);
    //     ctx.rotate(127);
    //     ctx.translate(-this.x, -this.y);
    //     ctx.restore();
    // }

    update() {

        this.x += this.vx * this.speed;
     // this.rotate();
        for (i of allSprites) {
            if (i.type == "wall") {
                if (this.collideWith(i, 1)) {
                    if (this.cx < i.cx) {
                        this.speed = -6;
                    }
                    else {
                        this.speed = 6;
                    }

                }

            }
        }
    }
    draw(){
        ctx.drawImage(enemyImage, 0, 0, TILESIZE/2, TILESIZE/2, this.x, this.y, TILESIZE, TILESIZE);
    }
}


class Wall extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = 0;
        this.color = "red";
        walls.push(this);
    }
    get type() {
        return "wall";
    }
    create(x, y, w, h) {
        return new Wall(x, y, w, h);
    }
    // update(obj) {
    //     this.vx = -obj.vx;
    //     this.x += this.vx;
        // console.log('updating...')
    
    draw() {
        ctx.drawImage(blockImage, 0, 0, TILESIZE / 2, TILESIZE / 2, this.x, this.y, TILESIZE, TILESIZE);
        
    }
}
class PewPew extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
        allProjectiles.push(this);
        // console.log('a pewpew was created...');
        // console.log(allProjectiles);
    }

    update() {
        this.y -= 10;
    }
    draw() {
        ctx.drawImage(pewImage, 0, 0, TILESIZE / 2, TILESIZE / 2, this.x, this.y, TILESIZE, TILESIZE);
    }
}
class Block extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
    }
    get type() {
        return "wall";
    }
    create(x, y, w, h) {
        return new Block(x, y, w, h);
    }

}
class PowerUp1 extends Sprite{
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "green";
        powerups.push(this);
    }
    
    create(x, y, w, h) {
        return new PowerUp1(x, y, w, h);
    }
    get type() {
        return "rapid";
    }
    update(){
        for (i of allSprites) {
            if (i.type == "player"){
                if (this.collideWith(i, 0)) {
                    this.spliced = true;
                    console.log("yo");
                }
            }
    }
    }
}

// let myOneWall = new Wall(700, HEIGHT - 100, TILESIZE, 100);

const levelChars = {
    ".": "empty",
    "#": Wall,
    "!": PowerUp1,
    "@": Enemy,
    "B": Block

};

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


// console.log("here's the grid...\n" + makeGrid(gamePlan2, 22));

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
                } else {
                    

                    /*  Here we can use the x and y values from reading the grid, 
                        then adjust them based on the tilesize
                         */
                    startActors.push(new type(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE))
                }
            }
        }
    }
    return startActors;
}


let currentLevel = readLevel(makeGrid(gamePlan1, 31));

// instantiations...
let player1 = new Player(WIDTH / 3, HEIGHT / 3, 6, TILESIZE, TILESIZE, 'rgb(100, 100, 100)', 100);

let maxEnemies = 5;
function update() {
    player1.update();
    // .update();
    if (enemies.length <= 0) {
        // gamePlan1   = `
        // ..#................#..
        // ..#.......@........#..
        // ..#................#..
        // ..#................#..
        // ..#........#####...#..
        // ..#................#..
        // ..#................#..
        // ..##################..
        // ......................`;
        
        // for (i = 0; i < maxEnemies - enemies.length; i++) {
        //     let myRange = Math.floor(Math.random() * 500) + TILESIZE * 3;
        //     let e = new Enemy(myRange, Math.floor(Math.random()*3)*TILESIZE, TILESIZE, TILESIZE);
            
        // }
        // console.log(enemies)
        // console.log(allSprites)
        // allSprites = [];
        // let currentLevel = readLevel(makeGrid(gamePlan3, 22));
        

    }
    for (e of enemies) {
        for (p of allProjectiles) {
            if (p.collideWith(e, 0)) {
                console.log('projectile collided with enemy...');
                e.alive = false;
                p.spliced = true;
                e.spliced = true;
            }
        }
        if (player1.collideWith(e, 0)) {
            if (!player1.damaged){
                player1.damaged = true; 
                setTimeout(() => {
                    player1.damaged = false; 
                 }, 2000);   
            }
            
        }
        e.update();
    }
    for (p of allProjectiles) {
        if (p.y < 0) {
            p.spliced = true;
        }
        p.update();
    }
    // for (w of walls){
    //     w.update(player1);
    // }
    for (p in allProjectiles) {
        if (allProjectiles[p].spliced) {
            allProjectiles.splice(p, 1);
            // allSprites.splice(p,1);
        }
    }
    for (e in enemies) {
        if (enemies[e].spliced) {
                enemies.splice(e, 1);
            
        }
    }
    for (u in powerups) {
        if (powerups[u].spliced) {
                powerups.splice(e, 1);
        }
    }
    for (s in allSprites) {
        if (allSprites[s].spliced) {
            allSprites.splice(s, 1);
        }
    }


}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
    }
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "FPS: " + fps, 256, 32);
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "projectiles: " + allProjectiles.length, 256, 64);
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "enemies: " + enemies.length, 256, 96);
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "Timer: " + currentTimer, 256, 128);

}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (like a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

let then = performance.now();
let now = null;
let runtime = null;
let fps = null;
console.log("enemies " + enemies);

console.log("this is perf now " + performance.now())

let currentTimer = 0;
let timerStarted = false;


function timer() {
    if (timerStarted) {
        let now = performance.now();
        let delta = Math.floor((now - timerThen) / 1000);
        currentTimer = delta;
        console.log(currentTimer);
        return delta;
    }

}


let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    now = performance.now();
    let delta = now - then;
    fps = (Math.ceil(1000 / delta));
    totaltime = now - then;
    then = now;
    if (timerStarted) {
        console.log('timer has stared...');
        timer();
    }
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}