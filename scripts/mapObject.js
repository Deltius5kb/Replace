// A class for map objects (used for collision)
class Terrain{
    constructor(x, y, sprite){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.width = sprite.width;
        this.height = sprite.height;
    }
}