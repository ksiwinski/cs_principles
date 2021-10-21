// Prints in the console
console.log("This is coming from a seperate file...");
// Defines Variables
let myVar = 10;
// Variables for the shapes on the canvas
let posx1 = 10;
let posy1 = 10;
let posx2 = 30;
let posy2 = 30;
// Prints on the console
console.log("My first console message");
console.log(myVar);
// Sets an array for the values of the shapes
let shape1 = [posx1, posy1, 50, 50]
let shape2 = [posx2, posy2, 50, 50]
// Prints the shape 3 times on the canvas 
for (let i = 0; i < 3; i++) {
    // Calls the draw function
    draw();
    // Spaces each of the pairs of shapes 100 pixels apart
    shape1[0]+=100;
    shape2[0]+=100;
  }

  // Defines the draw function
  function draw() {
    // Variable that allows the code to look for an element in the html document with and ID of 'canvas'
    var canvas = document.getElementById('canvas');
    // Id this works, then run the function
    if (canvas.getContext) {
      // sets the a variable for canvas.getContext
      var ctx = canvas.getContext('2d');
      // Defines the color of the shape
      ctx.fillStyle = 'rgb(200, 0, 0)';
      // Draws the shape with the values from the array shape1
      ctx.fillRect(shape1[0], shape1[1], shape1[2], shape1[3]);
      // Defines the color and transparency of the shape
      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      // Draws the shape with the values from the array shape2
      ctx.fillRect(shape2[0], shape2[1], shape2[2], shape2[3]);
    }
  }