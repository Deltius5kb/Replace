// Function to make terrain objects array without making tons of global variables
function DefineTerrainObjects(){
    // The 2 walls on either side of the map
    var sprite = document.getElementById("wall100x1480");
    const wall1 = new Terrain(-100, 0, sprite);
    const wall2 = new Terrain(9660, 0, sprite); 
    
    // Floor and ceiling
    sprite = document.getElementById("floorSprite");
    floor = new Terrain(0, 720 - sprite.height, sprite);
    const ceiling = new Terrain(0, -sprite.height, sprite);
    
    terrainObjects = [ceiling, floor, wall1, wall2];
    doors = [];
    // Makes 7 walls and doors that are walls seperating the rooms
    var thisWall;
    var wallSprite = document.getElementById("wall100x420");
    var thisDoor;
    var doorSprite = document.getElementById("wall100x300");
    for (var i = 1; i < 7; i++){
        var wallx = 1380 * i;
        thisWall = new Terrain(wallx, 0, wallSprite);
        thisDoor = new Terrain(wallx, 420, doorSprite);
        terrainObjects.push(thisWall);
        // Adds doors to both lists so that doors can be distinguished from other things
        terrainObjects.push(thisDoor);
        doors.push(thisDoor);
    }
    
    // Sort them in order of ascending y values, uses a bubble sort
    // Being sorted allows for movement.js to have an easier time detecting what object is under the player
    var sorted = false;
    while (!sorted){
        sorted = true;
        // i < terrainObjects.length - 1 to not check terrainObjects.length + 1 and cause index out of range
        for (var i = 0; i < terrainObjects.length - 1; i++){
            // Checks if current item's y is larger than next item in array
            if (terrainObjects[i].y > terrainObjects[i+1].y){
                // Switches their objects
                var temp = terrainObjects[i+1];
                terrainObjects[i+1] = terrainObjects[i];
                terrainObjects[i] = temp;
                sorted = false;
            }
        }
    }
}
// Places NPCs in the correct locations
function DefineNPCs(){
    var npcSprite = document.getElementById("NPC");
    var thisNPC;
    for (var i = 0; i < 7; i += 2){
        thisNPC = new Terrain(1380 * i + Math.round(690 - npcSprite.width / 2), 720 - floor.height - npcSprite.height, npcSprite);
        NPCs.push(thisNPC);
    }
}