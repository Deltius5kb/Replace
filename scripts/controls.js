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