// This is a movement script for the player, it also handles collision
const gravity = 600;
const strafeSpeed = 500;
// State of movement keys, gets evaluated every frame to smoothen out movement
const movementKeyStates = {
    a: false,
    space: false,
    d: false
}

// This function (collides) is not mine, I got it from here: https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
// Checks if two images collides (not necessarily images, just needs to have x,y,width and height attributes)
function collides(a, b)
{
    if (a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y) return true;
    else{
        return false;
    }
}

// This function pulls the player down if the player isn't touching the floor, called every frame
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
        player.y += spaceRequired;
    }
    // Otherwise moves the player to the floor
    else{
        player.y = floorObject.y - player.height;
    }
}

// This function is called every frame to handle player inputting movement keys
function EvaluateMovement(){
    if (movementKeyStates.d == true){
        // Check if space available to the right of player
        var spaceRequired = Math.round(strafeSpeed * timeSincePreviousFrame / 1000);
        const imaginaryPlayer = {
            x: player.x + spaceRequired,
            y: player.y,
            width: player.width,
            height: player.height
        }

        // Checks if player would collide with another object this frame
        var objectPlayerWouldCollideWith = null;
        for (var i; i <= terrainObjects.length; i++){
            if (terrainObjects[i].x >= (player.x + player.width) && collides(imaginaryPlayer, terrainObjects[i])){
                objectPlayerWouldCollideWith = terrainObjects[i];
            }
        }

        // If player would collide with another object (as in an object was found to collide with the new position)
        if (objectPlayerWouldCollideWith != null){
            player.x = objectPlayerWouldCollideWith.x - player.width; // Sets player to be touching new object
        }
        // If player wouldn't collide with anything else
        else{
            player.x += spaceRequired; // Moves player required amount of space
        }
    }
    
    if (movementKeyStates.a == true){
        // Check if space available to the right of player
        var spaceRequired = Math.round(strafeSpeed * timeSincePreviousFrame / 1000);
        const imaginaryPlayer = {
            x: player.x - spaceRequired,
            y: player.y,
            width: player.width,
            height: player.height
        }

        // Checks if player would collide with another object this frame
        var objectPlayerWouldCollideWith = null;
        for (var i; i <= terrainObjects.length; i++){
            if (terrainObjects[i].x <= player.x && collides(imaginaryPlayer, terrainObjects[i])){
                objectPlayerWouldCollideWith = terrainObjects[i];
            }
        }

        // If player would collide with another object (as in an object was found to collide with the new position)
        if (objectPlayerWouldCollideWith != null){
            player.x = objectPlayerWouldCollideWith.x; // Sets player to be touching new object
        }
        // If player wouldn't collide with anything else
        else{
            player.x -= spaceRequired; // Moves player required amount of space
        }
    }
}

// Learned this from here: https://stackoverflow.com/questions/16089421/how-do-i-detect-keypresses-in-javascript
document.addEventListener("keydown",  function onEvent(event){
    // Go right
    if (event.key == "d" || event.key == "D"){
        movementKeyStates.d = true;
   }
    
    // Go left
    else if (event.key == "a" || event.key == "A"){
        movementKeyStates.a = true;
    }
});


// Learned this from here: https://stackoverflow.com/questions/16089421/how-do-i-detect-keypresses-in-javascript
document.addEventListener("keyup",  function onEvent(event){
    // Stop right
    if (event.key == "d" || event.key == "D"){
        movementKeyStates.d = false;
    }
    // Stop left
    else if (event.key == "a" || event.key == "A"){
        movementKeyStates.a = false;
    }
});