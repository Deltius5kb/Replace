//Class for the player
class PlayerObject{
    constructor(){
        this.sprite = document.getElementById("playerSprite");
        this.x = 0;
        this.y = 0;
        this.width = this.sprite.width;
        this.height = this.sprite.height;
    }
    SetLocation(x, y){
        this.x = x;
        this.y = y;
    }
    Render(){
        context.drawImage(this.sprite, this.x, this.y);
    }
}