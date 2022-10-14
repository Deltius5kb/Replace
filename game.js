// TODO debug applygravitytoplayer() as it doesnt work properly(?)
// TODO for some reason timesinceprevious frame is coming out as nothing 


// This is a good gameloop implementation as I learned from here: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
function gameLoop(timeNow) {
    // Gets time since last frame and then sets the time at previous frame to current time
    // Works because the function is then called by window.requestAnimationFrame(gameLoop);
    timeSincePreviousFrame = timeNow - timeAtPreviousFrame;
    timeAtPreviousFrame = timeNow;
   
    ApplyGravityToPlayer();
    DrawThingsOnScreen();

    window.requestAnimationFrame(gameLoop); // Calls the next frame
}

function DrawThingsOnScreen(){
    // Fills the canvas with white colour
    canvasContext.fillStyle = "#ffffff";
    canvasContext.fillRect(0,0,1280,720);
    
    player.Render(); //Draws player on screen
    context.drawImage(floorObject.sprite, floorObject.x, floorObject.y); // Draws the floor on screen
}

function ApplyGravityToPlayer(){
    // Checks if the player is colliding with any floor images
    if (collides(player, floorObject)){
        return;
    }
    // If not collided then it will move the player down a set amount per second passed
    var spaceRequired = Math.round(gravity * timeSincePreviousFrame / 1000);

    // Makes object to pass into collides(), sort of an "imaginary" player
    const imaginaryPlayer = {
        x: player.x,
        y: player.y + spaceRequired,
        height: player.height,
        width: player.width
    }
    // If there is space below the player, moves them to the new position
    if (!(collides(imaginaryPlayer, floorObject))){
        player.SetLocation(player.x, player.y + spaceRequired);
    }
    // Otherwise moves the player to the floor
    else{
        player.SetLocation(player.x, floorObject.y - player.height);
    }
}

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var floor = document.getElementById("floorSprite");
const floorObject = {
    x: 0,
    y: 670,
    width: floor.width,
    height: floor.height,
    sprite: floor
}

var player = new PlayerObject(); // Creates new global player object, see player.js for info

var timeAtPreviousFrame = 0;
var timeSincePreviousFrame;
const gravity = 400;
window.requestAnimationFrame(gameLoop);