// This file contains the event listeners and what happens when keys are pressed
// Keypress detection
document.addEventListener("keydown",  function onEvent(event){
    // Go right
    if (event.key == "d" || event.key == "D"){
        game.player.movementKeyStates.d = true;
    }
    // Go left
    else if (event.key == "a" || event.key == "A"){
        game.player.movementKeyStates.a = true;
    }
    // Go up
    else if ((event.key == "w" || event.key == "W" || event.key == " ") && game.player.canJump == true){
        game.player.movementKeyStates.w = true;
    }
});

// Key release detection
document.addEventListener("keyup",  function onEvent(event){
    // Stop right
    if (event.key == "d" || event.key == "D"){
        game.player.movementKeyStates.d = false;
    }
    // Stop left
    else if (event.key == "a" || event.key == "A"){
        game.player.movementKeyStates.a = false;
    }
    // Go up
    else if (event.key == "w" || event.key == "W" || event.key == " "){
        game.player.movementKeyStates.w = false;
        // Player.jumpHeight is an attribute that determines when the player should stop going upwards, it is used in movement.js
        game.player.jumpHeight = 0;
    }
});

// Single keypresses are bad for holding
document.addEventListener("keypress", function onEvent(event){
    // If player presses E when on top of an NPC
    if ((event.key == "e" || event.key == "E") && collides(game.player, game.currentNPC) && game.currentNPC.npcStatus == "idle"){
        game.currentNPC.Interact();
    }

    // If NPC textbox is visible
    else if (game.currentNPC.npcStatus == "waiting for confirmation"){
        game.currentNPC.PlayerConfirmedOnResponse();
    }

    // Below are debug tools
    // Increases player speed when the button 0 is pressed
    else if (event.key == "0"){
        if (game.player.strafeSpeed == 500){
            game.player.strafeSpeed = 2000;
        }
        else{
            game.player.strafeSpeed = 500;
        }
    }
    // Opens next door when the button 9 is pressed
    else if (event.key == "9" && game.doors != []){
        game.OpenNextDoor();
    }
});

// When player clicks
document.addEventListener("click", function CheckIfClickWasOnDialogueOption(event){
    // If player is interacting with an NPC and they are hovering over an option when clicking
    if (game.currentNPC.npcStatus == "waiting for response" && game.currentNPC.dialogueBox.hovering != null){
        game.currentNPC.PlayerMadeChoice();
    }
    // If NPC textbox is visible
    else if (game.currentNPC.npcStatus == "waiting for confirmation"){
        game.currentNPC.PlayerConfirmedOnResponse();
    }
});

// Holds x and y coordinates for use in TextBox.js to check if the player is hovering over anything
var mousePos = [];
// Got this from https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
// Updates the value of mousePos every time the mouse is moved
onmousemove = function(e){mousePos = [e.clientX, e.clientY]}