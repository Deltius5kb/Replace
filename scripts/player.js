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
        this.strafeSpeed = 1000; // Usually 500 but set to 1000 for debug reasons
    }
    Render(){
        if (this.x > 690){
            context.drawImage(this.sprite, 690, this.y);
        }
        else{
            context.drawImage(this.sprite, this.x, this.y);
        }
    }
}