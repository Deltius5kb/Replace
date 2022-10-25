// Opens next closest door by removing it from the list of things to render and check collision for
function OpenNextDoor(){
    for (var i = 0; i < terrainObjects.length; i++){
        if (terrainObjects[i] == doors[0]){
            terrainObjects.splice(i,1);
        }
    }
    doors.splice(0, 1);
}

function GivePlayerControl(){
    player.interacting = false;
}

function AddChoiceToList(choiceList){
    // Appends player's choice to the choices made for the 
    choiceList.push(dialogueBox.clickedOn);
}

function NPC1(){
    // Checks for player choice
    if (dialogueBox.clickedOn != null){
        // Adds choice to the list of choices made
        AddChoiceToList(choicesMade.npcOne);
        // Resets it so that it doesn't add it to the list every frame
        dialogueBox.clickedOn = null;
    }

    // If no choices are made so far
    if (choicesMade.npcOne.length == 0){
        let displayText = "The trials are about to begin";
        let options = [
            "Trials?",
            "Where am I?",
            "Who are you?"
        ];
        dialogueBox.SetText(displayText, options);
        activeBox = dialogueBox;
    }

    else if (choicesMade.npcOne[0] == 1){
        let displayText = "The trials that you must pass to meet the ancient ones";
        textBox.SetText(displayText);
        activeBox = textBox;
    }

    // If any choice has been made
    else {
        // Removes this NPC from list of NPCs to show on screen, also disables player from interacting with same NPC twice
        NPCs.splice(0, 1);
        OpenNextDoor();
        GivePlayerControl();
        // Sets up for NPC2 to be called
        currentNPC = 2;
    }
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
    else {
        if (currentNPC == 1){NPC1();}
        dialogueBox.FindHovering();
        activeBox.Render();
    }
    window.requestAnimationFrame(gameLoop); // Calls the next frame
}

var canvas = document.getElementById("gameCanvas"); // Gets context object which is used to draw things on the canvas
var context = canvas.getContext("2d");

var floor;
var terrainObjects;
var doors;
var NPCs = [];
var choicesMade = {
    npcOne: [],
    npcTwo: [],
    npcThree: [],
    npcFour: []
};
var currentNPC = 1;

const player = new PlayerObject();
const dialogueBox = new DialogueBox();
const textBox = new TextBox();
var activeBox = dialogueBox;

DefineTerrainObjects();
DefineNPCs();

var timeAtPreviousFrame = 0;
var timeSincePreviousFrame;
window.requestAnimationFrame(gameLoop);