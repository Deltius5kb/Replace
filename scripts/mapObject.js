// A class for map objects (used for collision)
class Terrain{
    constructor(x, y, width, height, sprite){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.active = true;
    }
}