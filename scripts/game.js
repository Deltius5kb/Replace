// TODO debug applygravitytoplayer() as it doesnt work properly(?)
// TODO for some reason timesinceprevious frame is coming out as nothing 


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
    
    player.Render(); // Draws player on screen
    context.drawImage(floorObject.sprite, floorObject.x, floorObject.y); // Draws the floor on screen
    
    // Draws other objects on screen
    for (var i = 0; i < terrainObjects.length; i++){
        context.drawImage(terrainObjects[i].sprite, terrainObjects[i].x, terrainObjects[i].y);
    }
}

// Function to make terrain objects array without making tons of global variables
function DefineTerrainObjects(){
    const wall1 = new Terrain(300, 620, document.getElementById("wall200x50").width, document.getElementById("wall200x50").height, document.getElementById("wall200x50"));
    const wall2 = new Terrain(600, 620, document.getElementById("wall200x50").width, document.getElementById("wall200x50").height, document.getElementById("wall200x50"));
    const terrainObjects = [wall1, wall2];
    return terrainObjects;
}

var canvas = document.getElementById("gameCanvas"); // Gets context object which is used to draw things on the canvas
var context = canvas.getContext("2d");

const player = new PlayerObject(); // Creates new global player object, see player.js for info
const floorObject = new Terrain(0, 670, document.getElementById("floorSprite").width, document.getElementById("floorSprite").height, document.getElementById("floorSprite"));
const terrainObjects = DefineTerrainObjects();


var timeAtPreviousFrame = 0;
var timeSincePreviousFrame;
window.requestAnimationFrame(gameLoop);