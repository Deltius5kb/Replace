// Class for the player
class PlayerObject{
    constructor(){
        this.sprite = document.getElementById("playerSprite");
        this.x = 0;
        this.y = 0;
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        // Current jump height
        this.jumpHeight = 0;
        this.maxJumpHeight = 200;
        // If player jump is available
        this.canJump = false;
        this.strafeSpeed = 500;
        this.gravity = 600;
        // Speed at which the player is moved upwards when not jumping (per second)
        this.jumpSpeed = 400;

        // State of movement keys, gets evaluated every frame to smoothen out movement
        this.movementKeyStates = {
            a: false,
            w: false,
            d: false
        }
    }

    // This function is called every frame to handle player inputting movement keys
    EvaluateMovement(){
        if (this.movementKeyStates.d == true){
            // Check if space available to the right of player
            var spaceRequired = Math.round(this.strafeSpeed * game.timeSincePreviousFrame / 1000);
            const imaginaryPlayer = {
                x: this.x + spaceRequired,
                y: this.y,
                width: this.width,
                height: this.height
            }

            // Checks if player would collide with another object this frame
            var objectPlayerWouldCollideWith = null;
            for (var i = 0; i < game.terrainObjects.length; i++){
                if (game.terrainObjects[i].x >= (this.x + this.width) && collides(imaginaryPlayer, game.terrainObjects[i])){
                    objectPlayerWouldCollideWith = game.terrainObjects[i];
                }
            }

            // If player would collide with another object (as in an object was found to collide with the new position)
            if (objectPlayerWouldCollideWith != null){
                this.x = objectPlayerWouldCollideWith.x - this.width; // Sets player to be touching new object
            }
            // If player wouldn't collide with anything else
            else{
                this.x += spaceRequired; // Moves player required amount of space
            }
        }
        
        if (this.movementKeyStates.a == true){
            // Check if space available to the right of player
            var spaceRequired = Math.round(this.strafeSpeed * game.timeSincePreviousFrame / 1000);
            const imaginaryPlayer = {
                x: this.x - spaceRequired,
                y: this.y,
                width: this.width,
                height: this.height
            }

            // Checks if player would collide with another object this frame
            var objectPlayerWouldCollideWith = null;
            for (var i = 0; i < game.terrainObjects.length; i++){
                if (game.terrainObjects[i].x <= this.x && collides(imaginaryPlayer, game.terrainObjects[i])){
                    objectPlayerWouldCollideWith = game.terrainObjects[i];
                }
            }

            // If player would collide with another object (as in an object was found to collide with the new position)
            if (objectPlayerWouldCollideWith != null){
                this.x = objectPlayerWouldCollideWith.x + objectPlayerWouldCollideWith.width; // Sets player to be touching new object
            }
            // If player wouldn't collide with anything else
            else{
                this.x -= spaceRequired; // Moves player required amount of space
            }
        }

        // Jumping
        // TODO check for collision with objects above player, not important because of the map that I have. 
        if (this.movementKeyStates.w == true){
            // Prevents infinite jumping
            this.canJump = false;

            // If player hasn't reached the apex of their jump yet
            if (this.jumpHeight < this.maxJumpHeight){
                // Calculates jump height based on time passed since previous frame
                var jump = Math.round(this.jumpSpeed * game.timeSincePreviousFrame / 1000);
                
                // Ensures player doesn't jump too high if timeSincePreviousFrame is too large
                if (this.jumpHeight + jump > this.maxJumpHeight){
                    jump = this.maxJumpHeight - this.jumpHeight;
                    this.movementKeyStates.w = false;
                }
                this.y -= jump;
                this.jumpHeight += jump;
            }
        }
    }
    // This function pulls the player down if the player isn't touching the floor, called every frame
    ApplyGravity(){
        // Makes object to pass into collides(), sort of an "imaginary" player
        var imaginaryPlayer = {
            x: this.x,
            y: this.y + 1,
            height: this.height,
            width: this.width
        }
        // Checks if the player is colliding with any floor images
        for (var i = 0; i < game.terrainObjects.length; i++){
            if (collides(imaginaryPlayer, game.terrainObjects[i])){
                this.canJump = true;
                return;
            }
        }
        // If player is not colliding with the floor then they can no longer jump
        this.canJump = false;
        // If not collided then it will move the player down a set amount per second passed
        var spaceRequired = Math.round(this.gravity * game.timeSincePreviousFrame / 1000);

        // Makes object to pass into collides(), sort of an "imaginary" player
        imaginaryPlayer = {
            x: this.x,
            y: this.y + spaceRequired,
            height: this.height,
            width: this.width
        }

        // Check each of them for collisions with imaginary player
        // If there is space below the player, moves them to the new position
        var collidingObject = null;
        for (var i = 0; i < game.terrainObjects.length; i++){
            if (collides(imaginaryPlayer, game.terrainObjects[i])){
                collidingObject = i;
            }
        }

        // Moves player down if it doesn't collide with anything in new position
        if (collidingObject == null){
            this.y += spaceRequired;
        }
        // Moves player to the object it would otherwise collide with
        else{
            this.y = game.terrainObjects[collidingObject].y - this.height;
        }
    }
}