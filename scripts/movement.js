// This is a movement script for the player, it also handles collision
const gravity = 600;
const playerJumpSpeed = 400;

// State of movement keys, gets evaluated every frame to smoothen out movement
const movementKeyStates = {
    a: false,
    w: false,
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
    // Makes object to pass into collides(), sort of an "imaginary" player
    var imaginaryPlayer = {
        x: player.x,
        y: player.y + 1,
        height: player.height,
        width: player.width
    }
    // Checks if the player is colliding with any floor images
    for (var i = 0; i < terrainObjects.length; i++){
        if (collides(imaginaryPlayer, terrainObjects[i])){
            player.canJump = true;
            return;
        }
    }
    player.canJump = false;
    // If not collided then it will move the player down a set amount per second passed
    var spaceRequired = Math.round(gravity * timeSincePreviousFrame / 1000);

    // Makes object to pass into collides(), sort of an "imaginary" player
    imaginaryPlayer = {
        x: player.x,
        y: player.y + spaceRequired,
        height: player.height,
        width: player.width
    }

    // Check each of them for collisions with imaginary player
    // If there is space below the player, moves them to the new position
    var collidingObject = null;
    for (var i = 0; i < terrainObjects.length; i++){
        if (collides(imaginaryPlayer, terrainObjects[i])){
            collidingObject = i;
        }
    }

    // Moves player down if it doesn't collide with anything in new position
    if (collidingObject == null){
        player.y += spaceRequired;
    }
    // Moves player to the object it would otherwise collide with
    else{
        player.y = terrainObjects[collidingObject].y - player.height;
    }
}

// This function is called every frame to handle player inputting movement keys
function EvaluateMovement(){
    if (movementKeyStates.d == true){
        // Check if space available to the right of player
        var spaceRequired = Math.round(player.strafeSpeed * timeSincePreviousFrame / 1000);
        const imaginaryPlayer = {
            x: player.x + spaceRequired,
            y: player.y,
            width: player.width,
            height: player.height
        }

        // Checks if player would collide with another object this frame
        var objectPlayerWouldCollideWith = null;
        for (var i = 0; i < terrainObjects.length; i++){
            if (terrainObjects[i].x >= (player.x + player.width) && collides(imaginaryPlayer, terrainObjects[i]) && terrainObjects[i].active == true){
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
        var spaceRequired = Math.round(player.strafeSpeed * timeSincePreviousFrame / 1000);
        const imaginaryPlayer = {
            x: player.x - spaceRequired,
            y: player.y,
            width: player.width,
            height: player.height
        }

        // Checks if player would collide with another object this frame
        var objectPlayerWouldCollideWith = null;
        for (var i = 0; i < terrainObjects.length; i++){
            if (terrainObjects[i].x <= player.x && collides(imaginaryPlayer, terrainObjects[i]) && terrainObjects[i].active == true){
                objectPlayerWouldCollideWith = terrainObjects[i];
            }
        }

        // If player would collide with another object (as in an object was found to collide with the new position)
        if (objectPlayerWouldCollideWith != null){
            player.x = objectPlayerWouldCollideWith.x + objectPlayerWouldCollideWith.width; // Sets player to be touching new object
        }
        // If player wouldn't collide with anything else
        else{
            player.x -= spaceRequired; // Moves player required amount of space
        }
    }

    // Jumping
    // TODO check for collision with objects above player, this isn't important yet because the player won't be able to hit anything by jumping but could be an issue later on
    if (movementKeyStates.w == true){
        // Prevents infinite jumping
        player.canJump = false;

        // If player hasn't reached the apex of their jump yet
        if (player.jumpHeight < player.maxJumpHeight){
            // Calculates jump height based on time passed since previous frame
            var jump = Math.round(playerJumpSpeed * timeSincePreviousFrame / 1000);
            
            // Ensures player doesn't jump too high if timeSincePreviousFrame is too large
            if (player.jumpHeight + jump > player.maxJumpHeight){
                jump = player.maxJumpHeight - player.jumpHeight;
                movementKeyStates.w = false;
            }
            player.y -= jump;
            player.jumpHeight += jump;
        }
    }
}