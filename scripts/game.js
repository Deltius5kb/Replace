// This is a good gameloop implementation as I learned from here: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
function gameLoop(timeNow) {
    // Gets time since last frame and then sets the time at previous frame to current time
    // Works because the function is then called by window.requestAnimationFrame(gameLoop);
    timeSincePreviousFrame = timeNow - timeAtPreviousFrame;
    timeAtPreviousFrame = timeNow;
   
    if (movementKeyStates.w == false){
        ApplyGravityToPlayer();
    }
    EvaluateMovement();
    DrawThingsOnScreen();

    window.requestAnimationFrame(gameLoop); // Calls the next frame
}

function DrawThingsOnScreen(){
    // Fills the canvas with white colour
    canvasContext.fillStyle = "#ffffff";
    canvasContext.fillRect(0,0,1280,720);
    
    var xdisplacement = 0;
    if (player.x > 690){
        xdisplacement = player.x - 690;
    }

    player.Render(); // Draws player on screen
    
    // Draws other objects on screen
    for (var i = 0; i < terrainObjects.length; i++){
        context.drawImage(terrainObjects[i].sprite, terrainObjects[i].x - xdisplacement, terrainObjects[i].y);
    }
}

// Function to make terrain objects array without making tons of global variables
function DefineTerrainObjects(){
    const wall1 = new Terrain(300, 620, document.getElementById("wall200x50").width, document.getElementById("wall200x50").height, document.getElementById("wall200x50"));
    const wall2 = new Terrain(600, 620, document.getElementById("wall200x50").width, document.getElementById("wall200x50").height, document.getElementById("wall200x50"));
    const floorObject = new Terrain(0, 670, document.getElementById("floorSprite").width, document.getElementById("floorSprite").height, document.getElementById("floorSprite"));
    const terrainObjects = [floorObject, wall1, wall2];

    // Sort them in order of ascending y values, uses a bubble sort
    var sorted = false;
    while (!sorted){
        sorted = true;
        // i < terrainObjects.length - 1 to not check terrainObjects.length + 1 and cause index out of range
        for (var i = 0; i < terrainObjects.length - 1; i++){
            // Checks if current item's y is larger than next item in array
            if (terrainObjects[i].y > terrainObjects[i+1].y){
                // Switches their objects
                var temp = terrainObjects[i+1];
                terrainObjects[i+1] = terrainObjects[i];
                terrainObjects[i] = temp;
                sorted = false;
            }
        }
    }

    // // Displays the y values of each item in list 
    // for (var i = 0; i < terrainObjects.length; i++){
    //     console.log(terrainObjects[i].y);
    // }

    return terrainObjects;
}

var canvas = document.getElementById("gameCanvas"); // Gets context object which is used to draw things on the canvas
var context = canvas.getContext("2d");

const player = new PlayerObject(); // Creates new global player object, see player.js for info
const terrainObjects = DefineTerrainObjects();


var timeAtPreviousFrame = 0;
var timeSincePreviousFrame;
window.requestAnimationFrame(gameLoop);