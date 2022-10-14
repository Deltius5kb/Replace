//This is a movement script for the player, it also handles collision
//This function (collides) is not mine, I got it from here: https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
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