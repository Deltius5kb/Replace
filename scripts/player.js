// Class for the player
class PlayerObject{
    constructor(){
        this.sprite = document.getElementById("playerSprite");
        this.x = 0;
        this.y = 0;
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.jumpHeight = 0;
        this.maxJumpHeight = 200;
        this.canJump = false;
        this.strafeSpeed = 500;
        this.interacting = false;
    }
    Render(){
        // If player is in the final room
        if (this.x > 9560 - 690){
            context.drawImage(this.sprite, this.x - (9560 - 1380), this.y);
        }
        // If the player is past the middle
        else if (this.x > 690){
            context.drawImage(this.sprite, 690, this.y);
        }
        // If the player is at the start
        else{
            context.drawImage(this.sprite, this.x, this.y);
        }
    }
}