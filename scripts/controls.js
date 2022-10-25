// This file contains the event listeners and what happens when keys are pressed

// Keypress detection
// movementKeyStates is a global array from game.js that is used in movement.js
document.addEventListener("keydown",  function onEvent(event){
    // Go right
    if (event.key == "d" || event.key == "D"){
        movementKeyStates.d = true;
   }
    // Go left
    else if (event.key == "a" || event.key == "A"){
        movementKeyStates.a = true;
    }
    // Go up
    else if ((event.key == "w" || event.key == "W" || event.key == " ") && player.canJump == true){
        movementKeyStates.w = true;
    }
});

// Key release detection
document.addEventListener("keyup",  function onEvent(event){
    // Stop right
    if (event.key == "d" || event.key == "D"){
        movementKeyStates.d = false;
    }
    // Stop left
    else if (event.key == "a" || event.key == "A"){
        movementKeyStates.a = false;
    }
    // Go up
    else if (event.key == "w" || event.key == "W" || event.key == " "){
        movementKeyStates.w = false;
        // Player is a global variable from game.js
        // Player.jumpHeight is an attribute that determines when the player should stop going upwards, it is used in movement.js
        player.jumpHeight = 0;
    }
});

// Single keypresses are bad for holding
document.addEventListener("keypress", function onEvent(event){
    if (event.key == "e" || event.key == "E"){
        // Checks if the player pressed E while colliding with any NPCs
        for (var i = 0; i < NPCs.length; i++){
            if (collides(player, NPCs[i])){
                player.interacting = true;
            }
        }
    }

    // Below are debug tools
    // Increases player speed when the button 0 is pressed
    else if (event.key == "0"){
        if (player.strafeSpeed == 500){
            player.strafeSpeed = 2000;
        }
        else{
            player.strafeSpeed = 500;
        }
    }
    // Opens next door when the button 9 is pressed
    else if (event.key == "9" && doors != []){
        OpenNextDoor();
    }
});

// When player clicks
document.addEventListener("click", function CheckIfClickWasOnDialogueOption(event){
    // If player is interacting with an NPC and they are hovering over an option when clicking
    if (player.interacting == true && dialogueBox.hovering != null){
        var playerChoice = dialogueBox.hovering + 1;
        // dialogueBox is a TextBox object from TextBox.js
        // Clicked on holds the value for what choice the player clicked on, it is used in game.js
        dialogueBox.clickedOn = playerChoice;
    }
});

// Holds x and y coordinates for use in TextBox.js to check if the player is hovering over anything
var mousePos = [];
// Got this from https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
// Updates the value of mousePos every time the mouse is moved
onmousemove = function(e){mousePos = [e.clientX, e.clientY]}