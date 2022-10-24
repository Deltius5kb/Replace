// Keypress detection
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
        player.jumpHeight = 0;
    }
});

document.addEventListener("keypress", function onEvent(event){
    if (event.key == "e" || event.key == "E"){
        for (var i = 0; i < NPCs.length; i++){
            if (NPCs[i].active == true && collides(player, NPCs[i])){
                NPCs[i].Interact();
            }
        }
    }
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

function CheckIfClickWasOnDialogueOption(event) {
    // If player is interacting with an NPC and they are hovering over an option when clicking
    if (player.interacting == true && DialogueBox.hovering != null){
        PlayerClickedOnOption();
    }
}

document.addEventListener("click", CheckIfClickWasOnDialogueOption);

// Got this from https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
// Updates the value of mousePos every time the mouse is moved
var mousePos = [];
onmousemove = function(e){mousePos = [e.clientX, e.clientY]}