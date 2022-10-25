// A game object which holds data about the game, it is used here, controls.js and TextBox.js
class Game{
    #canvas;
    #timeAtPreviousFrame;
    constructor(){
        // This is unused anywhere else
        this.#canvas = document.getElementById("gameCanvas");
        // This is used only in this file
        this.context = this.#canvas.getContext("2d");
        this.#timeAtPreviousFrame = 0;
        this.timeSincePreviousFrame = 0;
        
        // Holds the floor object, used in player.js
        this.floor;
        // Holds Terrain objects to check for collision with in player.js
        this.terrainObjects = [];
        // Holds Terrain objects which can be toggled to act as doors
        this.doors = [];
        // Holds NPC objects which are used in this file and found in mapObjects.js
        this.NPCs = [];
        // Holds the current box that is being displayed, used in controls.js and here
        this.activeBox = null;
        
        this.DefineTerrainObjects();
        this.DefineNPCs();
        
        // The current NPC that is accessible
        this.currentNPC = this.NPCs[0];
        // Array of arrays, [[Option, Response]]
        this.missedDialogue = [];
        // The text for the NPC to say and the options for it to respond with
        var text = "The trials are going to begin";
        var options = [
            "Trials?",
            "Where am I?",
            "Who are you?"
        ];
        var responses = [
            "The trials set by the ancient ones",
            "Irrelevant.",
            "A servant of Lua"
        ]
        this.currentNPC.SetDialogue(text, options, responses, 2);

        // The choices the player has made
        this.playerChoices = {
            NPCOne : [],
            NPCTwo : [],
            NPCThree : [],
            NPCFour : []
        };

        // Player object which is used in controls.js and here
        this.player = new PlayerObject();
    }

    // Called every frame that the player isn't interacting with an NPC
    Update(timeNow){
        // Gets time since last frame and then sets the time at previous frame to current time
        // Works because the function is then called by window.requestAnimationFrame(gameLoop);
        this.timeSincePreviousFrame = timeNow - this.#timeAtPreviousFrame;
        this.#timeAtPreviousFrame = timeNow;
        
        // If player isn't talking to the current NPC
        if (this.currentNPC.npcStatus == "idle"){
            // Applies gravity to player if the player isn't jumping
            if (this.player.movementKeyStates.w == false){
                this.player.ApplyGravity();
            }
            
            // Evaluates player movement and draws everything on screen
            this.player.EvaluateMovement();
            this.DrawThingsOnScreen();
        }

        // If player needs to make a choice 
        else if (this.currentNPC.npcStatus == "waiting for response"){
            this.currentNPC.dialogueBox.FindHovering();
            this.currentNPC.dialogueBox.Render();
        }

        // If player needs to confirm they have seen the response
        else if (this.currentNPC.npcStatus == "waiting for confirmation"){
            this.currentNPC.textBox.Render();
        }
        
        // When a player is talking to an NPC
        else if (this.currentNPC.npcStatus == "finished"){
            // Ends interaction
            this.OpenNextDoor();
            this.GivePlayerControl();
            
            // Removes first NPC in array and updates new curretNPC
            this.NPCs.splice(0, 1);
            this.currentNPC = this.NPCs[0];

            // Setup next NPC ready for dialogue 
            this.SetupNextDialogue();    
        }
        // Calls the next frame
        requestAnimationFrame(this.Update.bind(this));
    }
    
    SetupNextDialogue(){
        // TODO
    }

    // Function to make terrain objects array
    DefineTerrainObjects(){
        // The 2 walls on either side of the map
        var sprite = document.getElementById("wall100x1480");
        const wall1 = new Terrain(-100, 0, sprite);
        const wall2 = new Terrain(9660, 0, sprite); 
        
        // Floor and ceiling
        sprite = document.getElementById("floorSprite");
        this.floor = new Terrain(0, 720 - sprite.height, sprite);
        const ceiling = new Terrain(0, -sprite.height, sprite);
        
        // Adds them to an array
        this.terrainObjects = [ceiling, this.floor, wall1, wall2];
        // Makes 7 walls and doors that are walls seperating the rooms
        var thisWall;
        var wallSprite = document.getElementById("wall100x420");
        var thisDoor;
        var doorSprite = document.getElementById("wall100x300");
        for (var i = 1; i < 7; i++){
            var wallx = 1380 * i;
            thisWall = new Terrain(wallx, 0, wallSprite);
            thisDoor = new Terrain(wallx, 420, doorSprite);
            this.terrainObjects.push(thisWall);
            // Adds doors to both lists so that doors can be distinguished from other things
            this.terrainObjects.push(thisDoor);
            this.doors.push(thisDoor);
        }
        
        // Sort them in order of ascending y values, uses a bubble sort
        // Being sorted allows for movement.js to have an easier time detecting what object is under the player
        var sorted = false;
        while (!sorted){
            sorted = true;
            // i < terrainObjects.length - 1 to prevent index out of range
            for (var i = 0; i < this.terrainObjects.length - 1; i++){
                // Checks if current item's y is larger than next item in array
                if (this.terrainObjects[i].y > this.terrainObjects[i+1].y){
                    // Switches their objects
                    var temp = this.terrainObjects[i+1];
                    this.terrainObjects[i+1] = this.terrainObjects[i];
                    this.terrainObjects[i] = temp;
                    sorted = false;
                }
            }
        }
    }
    
    // Places NPCs in the correct locations
    DefineNPCs(){
        var npcSprite = document.getElementById("NPC");
        var thisNPC;
        for (var i = 0; i < 7; i += 2){
            thisNPC = new NPC(1380 * i + Math.round(690 - npcSprite.width / 2), 720 - this.floor.height - npcSprite.height, npcSprite);
            this.NPCs.push(thisNPC);
        }
    }
    
    // Opens next closest door by removing it from the list of things to render and check collision for
    OpenNextDoor(){
        for (var i = 0; i < this.terrainObjects.length; i++){
            if (this.terrainObjects[i] == this.doors[0]){
                this.terrainObjects.splice(i, 1);
            }
        }
        this.doors.splice(0, 1);
    }
    
    // Gives player control, used after interaction with NPC ended
    GivePlayerControl(){
        this.player.interacting = false;
    }
    
    // Function to draw things on the screen when player isn't interacting with an NPC
    DrawThingsOnScreen(){
        // Fills the canvas with white colour
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0,0,1280,720);
        
        // Finds how far past the middle the player is 
        // Moves everything to the left by however more than 690 the player has moved past, ie keeps the player centered
        var xdisplacement = 0;
        if (this.player.x > 690){
            xdisplacement = this.player.x - 690;
            // Stops the camera at the final wall
            if (xdisplacement > 9660 - 1280){
                xdisplacement = 9660 - 1280;
            }
        }
        
        // Draws NPCs on screen
        for (var i = 0; i < this.NPCs.length; i++){
            this.context.drawImage(this.NPCs[i].sprite, this.NPCs[i].x - xdisplacement, this.NPCs[i].y);
        }
        
        // Draws player on screen
        this.player.Render(); 
        
        // Draws other objects on screen
        for (var i = 0; i < this.terrainObjects.length; i++){
            this.context.drawImage(this.terrainObjects[i].sprite, this.terrainObjects[i].x - xdisplacement, this.terrainObjects[i].y);
        }
    }
    
    // This is used in the bottom of this file to start the gameloop
    Start(){
        requestAnimationFrame(this.Update.bind(this));
    }
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

const game = new Game();
game.Start();