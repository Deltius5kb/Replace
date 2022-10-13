//Class for the player
class PlayerObject{
    #x;
    #y;
    #sprite;
    #height;

    constructor(){
        this.#x = 0;
        this.#y = 0;
        this.#sprite = document.getElementById("playerSprite");
        this.#height = this.#sprite.clientHeight; 
    }
    GetLocation(){
        return [this.#x, this.#y];
    }
    SetLocation(x, y){
        this.#x = x;
        this.#y = y;
    }
    Render(){
        var canvas = document.getElementById("gameCanvas");
        var context = canvas.getContext("2d");
        context.drawImage(this.#sprite, this.#x, this.#y);
    }   
}