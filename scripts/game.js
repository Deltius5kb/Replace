function DrawThingsOnScreen(){
    // Fills the canvas with white colour
    context.fillStyle = "#ffffff";
    context.fillRect(0,0,1280,720);
    
    // Finds how far past the middle the player is 
    // Moves everything to the left by however more than 690 the player has moved past
    var xdisplacement = 0;
    if (player.x > 690){
        xdisplacement = player.x - 690;
        // Stops the camera at the final wall
        if (xdisplacement > 9660 - 1280){
            xdisplacement = 9660 - 1280;
        }
    }
    
    // Draws NPCs on screen
    for (var i = 0; i < NPCs.length; i++){
        if (NPCs[i].active == true){
            context.drawImage(NPCs[i].sprite, NPCs[i].x - xdisplacement, NPCs[i].y);
        }
    }
    
    player.Render(); // Draws player on screen
    
    // Draws other objects on screen
    for (var i = 0; i < terrainObjects.length; i++){
        context.drawImage(terrainObjects[i].sprite, terrainObjects[i].x - xdisplacement, terrainObjects[i].y);
    }
}

// Function to make terrain objects array without making tons of global variables
function DefineTerrainObjects(){
    var sprite = document.getElementById("wall100x1480");
    const wall1 = new Terrain(-100, 0, sprite.width, sprite.height, sprite);
    const wall2 = new Terrain(9660, 0, sprite.width, sprite.height, sprite); 
    
    sprite = document.getElementById("floorSprite");
    floor = new Terrain(0, 720 - sprite.height, sprite.width, sprite.height, sprite);
    const ceiling = new Terrain(0, -sprite.height, sprite.width, sprite.height, sprite);
    
    terrainObjects = [ceiling, floor, wall1, wall2];
    doors = [];
    // Makes 7 walls and doors that are walls seperating the rooms
    var thisWall;
    var wallSprite = document.getElementById("wall100x420");
    var thisDoor;
    var doorSprite = document.getElementById("wall100x300");
    for (var i = 1; i < 7; i++){
        var wallx = 1380 * i;
        thisWall = new Terrain(wallx, 0, wallSprite.width, wallSprite.height, wallSprite);
        thisDoor = new Terrain(wallx, 420, doorSprite.width, doorSprite.height, doorSprite);
        terrainObjects.push(thisWall);
        // Adds doors to both lists so that doors can be distinguished from other things
        terrainObjects.push(thisDoor);
        doors.push(thisDoor);
    }
    
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
}
// Places NPCs in the correct location
function DefineNPCs(){
    var npcSprite = document.getElementById("NPC");
    var thisNPC;
    for (var i = 0; i < 7; i += 2){
        thisNPC = new NPC(1380 * i + Math.round(690 - npcSprite.width / 2), 720 - floor.height - npcSprite.height, npcSprite);
        NPCs.push(thisNPC);
        //TODO remove this when I'm done with it
        var playerResponses = [
            `NPC${i / 2} Test response 1`,
            `NPC${i / 2} Test response 2`,
            `NPC${i / 2} Test response 3`
        ]
        thisNPC.AddDialogue(`NPC${i / 2} Test dialogue`, playerResponses);
    }
}

// Opens next closest door by removing it from the list of things to render and check collision for
function OpenNextDoor(){
    for (var i = 0; i < terrainObjects.length; i++){
        if (terrainObjects[i] == doors[0]){
            terrainObjects.splice(i,1);
        }
    }
    doors.splice(0, 1);
}

// Runs when the player clicks on a dialogue option
function PlayerClickedOnOption(){
    NPCs[currentNPC].playerChoice = DialogueBox.hovering + 1;
    NPCs[currentNPC].active = false;
    currentNPC += 1;

    // Gives player controls again
    player.interacting = false;
    DialogueBox.hasBeenChanged = false;

    OpenNextDoor();
    console.log(DialogueBox.options[DialogueBox.hovering]);
}

// This is a good gameloop implementation as I learned from here: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
function gameLoop(timeNow) {
    // Gets time since last frame and then sets the time at previous frame to current time
    // Works because the function is then called by window.requestAnimationFrame(gameLoop);
    timeSincePreviousFrame = timeNow - timeAtPreviousFrame;
    timeAtPreviousFrame = timeNow;
   
    // If player is not talking to an NPC
    if (player.interacting == false){
        if (movementKeyStates.w == false){
            ApplyGravityToPlayer();
        }
        EvaluateMovement();
        DrawThingsOnScreen();
    }
    
    // When a player is talking to an NPC
    else{
        // Logic for what the textbox displays
        DialogueBox.Render();
        if (DialogueBox.hasBeenChanged == false){
            // !temp
            if (1 == 1){}
        }
    }
    window.requestAnimationFrame(gameLoop); // Calls the next frame
}

var canvas = document.getElementById("gameCanvas"); // Gets context object which is used to draw things on the canvas
var context = canvas.getContext("2d");

var floor;
var terrainObjects;
var doors;
var NPCs = [];
var currentNPC = 0;

const player = new PlayerObject();
const DialogueBox = new TextBox();

DefineTerrainObjects();
DefineNPCs();

var timeAtPreviousFrame = 0;
var timeSincePreviousFrame;
window.requestAnimationFrame(gameLoop);