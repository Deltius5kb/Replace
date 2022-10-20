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
    // Increases player speed when the button 0 is pressed
    if (event.key == "0"){
        if (player.strafeSpeed == 500){
            player.strafeSpeed = 2000;
        }
        else{
            player.strafeSpeed = 500;
        }
    }
    // Opens next door when the button 9 is pressed
    else if (event.key == "9" && doors != []){
        for (var i = 0; i < terrainObjects.length; i++){
            if (terrainObjects[i] == doors[0]){
                terrainObjects.splice(i,1);
            }
        }
        doors.splice(0, 1);
    }
});