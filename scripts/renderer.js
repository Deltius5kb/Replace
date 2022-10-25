// Function to draw things on the screen except the textbox, called every frame that the player is not interacting with NPCs in game.js
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
        context.drawImage(NPCs[i].sprite, NPCs[i].x - xdisplacement, NPCs[i].y);
    }
    
    player.Render(); // Draws player on screen
    
    // Draws other objects on screen
    for (var i = 0; i < terrainObjects.length; i++){
        context.drawImage(terrainObjects[i].sprite, terrainObjects[i].x - xdisplacement, terrainObjects[i].y);
    }
}
