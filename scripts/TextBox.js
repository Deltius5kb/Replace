class TextBox{
    #sprite;
    #x;
    #y;
    #innerX;
    #innerY;
    #text;
    #lineWidth;
    #lineHeight;
    #defaultBackgroundColour;
    #font;
    #textHeight;
    #drawn;

    constructor(){
        this.type = "TextBox";
        // Sprite is used to draw the background of the textbox, everything is then drawn on top of that
        this.#sprite = document.getElementById("TextBoxSprite");
        // X and Y position of the textbox so that it is centered
        this.#x = Math.round((1280 - this.#sprite.width) / 2);
        this.#y = Math.round(720 - this.#sprite.height);
        // X and Y position of where the text can be drawn
        this.#innerX = Math.round((1280 - this.#sprite.width + 20) / 2);
        this.#innerY = Math.round((720 - this.#sprite.height + 10));
        // Text that is dispayed 
        this.#text;
        // Used for wrapping text
        this.#lineWidth = Math.round((this.#sprite.width - 20));
        this.#lineHeight = this.#sprite.height - 20;
        // Used for drawing the textbox
        this.#defaultBackgroundColour = "#000000";
        // Makes it so I can change the font if I need any other text elsewhere in the game
        this.#font = "40px Determination Mono";
        this.#textHeight = 50;
        this.#drawn = false;
    }
    // Used whenever the dialogue on the textbox is changed, used in game.js
    SetText(text){
        this.#text = text;
        this.#drawn = false;
    }

    Render(){
        if (this.#drawn){return;}
        game.context.font = this.#font;
        game.context.drawImage(this.#sprite, this.#x, this.#y);
        // Shades the dialogue area in black
        game.context.fillStyle = this.#defaultBackgroundColour;
        game.context.fillRect(this.#innerX, this.#innerY, this.#lineWidth, this.#lineHeight);
        // Draws text
        game.context.fillStyle = "#ffffff";
        // Got this from https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
        // Splits text into list of words
        var words = this.#text.split(" ");
        // Makes empty line that will be used to add to linelist 
        var line = "";
        // Makes empty list that will later be used to draw text on screen
        var linesList = [];
        for (var i = 0; i < words.length; i++){
            // Tests to see if another word can fit on the line
            var testLine = line + words[i] + " ";
            var testLineWidth = game.context.measureText(testLine).width;
            // If linewidth is too large and there is at least one word
            if (testLineWidth > this.#lineWidth - 20 && i > 0){
                // Adds the line without the new word to linesList
                linesList.push(line);
                // Resets line to include the new word and a space
                line = words[i] + " ";
            }
            // If the word does fit on the line
            else{
                line = testLine;
            }
        }
        // Adds the last line to the list
        linesList.push(line);
        
        // Makes sure the max lines is less than 4
        linesList = linesList.slice(0, 3)

        // Draws the lines on the box
        // This could've been done earlier (see the link I got the method from), but I decided to do it here as I wanted the text to be centred when there are less than 4 lines
        game.context.textAlign = "center"
        // The total height for the text that is to be drawn
        var totalHeight = linesList.length * this.#textHeight;
        // Centers the new text to be drawn in the middle
        var y = this.#innerY + Math.round((this.#lineHeight - totalHeight) / 2);
        for (var i = 0; i < linesList.length; i++){
            game.context.fillText(linesList[i], this.#innerX + Math.round(this.#lineWidth / 2), y);
            y += this.#textHeight;
        }
        this.#drawn = true;
    }
}
class DialogueBox{
    #hoveringIndex;
    #sprite;
    #x;
    #y;
    #innerX;
    #innerY;
    #text;
    #options;
    #lineWidth;
    #lineHeight;
    #defaultBackgroundColour;
    #hoveringBackgroundColour;
    #font;
    
    constructor(){
        this.type = "DialogueBox";
        // Used in controls.js to determine if the player has clicked on a dialogue option, only changed in this file
        this.hovering = null;
        this.#hoveringIndex = null;
        // The option that the player clicked on, used in game.js to move it to the player's, changed in game.js once the player's choice has been recorded
        this.clickedOn = null;

        // Sprite is used to draw the background of the textbox, everything is then drawn on top of that
        this.#sprite = document.getElementById("TextBoxSprite");
        // X and Y position of the textbox so that it is centered
        this.#x = Math.round((1280 - this.#sprite.width) / 2);
        this.#y = Math.round(720 - this.#sprite.height);
        // X and Y position of where the text can be drawn
        this.#innerX = Math.round((1280 - this.#sprite.width + 20) / 2);
        this.#innerY = Math.round((720 - this.#sprite.height + 10));
        // Used for seperating dialogue and options
        this.#lineWidth = Math.round((this.#sprite.width - 20));
        this.#lineHeight = Math.round((this.#sprite.height - 20) / 4);
        
        // The text and options to be displayed
        this.#text;
        this.#options;
        
        // Used for drawing the textbox
        this.#defaultBackgroundColour = "#000000";
        this.#hoveringBackgroundColour = "#202020";
        // Makes it so I can change the font if I need any other text elsewhere in the game
        this.#font = "27px Determination Mono";
    }

    // Used by NPCs
    SetText(newText, newOptions){
        this.#text = newText;
        this.#options = newOptions;
    }
    
    // Used in game.js and is run every frame that the player is interacting with an NPC
    // Checks if the mouse is over an of the options
    FindHovering(){
        var hoveringFound = false;
        for (var i = 1; i < this.#options.length + 1; i++){
            // Checks if the mouse is hovering over the option
            if (
                mousePos[0] > this.#innerX &&
                mousePos[0] < this.#innerX + this.#lineWidth && 
                mousePos[1] > this.#innerY + this.#lineHeight * i &&
                mousePos[1] < this.#innerY + this.#lineHeight * i + this.#lineHeight
                ){
                    // Sets hovering to be the box which is hovered over, 1st 2nd or 3rd
                    this.hovering = this.#options[i-1];
                    this.#hoveringIndex = i - 1
                    hoveringFound = true;
                }
            }
        if (hoveringFound == false){
            this.hovering = null;
        }
    }              

    // Draws the box and the text in the right location
    Render(){
        game.context.font = this.#font;
        // Makes it so that the coordinates used to draw text are the top left coordinates
        game.context.textBaseline = "top";

        game.context.drawImage(this.#sprite, this.#x, this.#y);
        // Shades the dialogue area in black
        game.context.fillStyle = this.#defaultBackgroundColour;
        game.context.fillRect(this.#innerX, this.#innerY, this.#lineWidth, this.#lineHeight);
        // Draws text
        game.context.fillStyle = "#ffffff";
        game.context.fillText(this.#text, this.#innerX + 5, this.#innerY + 5, this.#lineWidth);

        // Shades the answer areas in increasing shades of black
        for (var i = 1; i < this.#options.length + 1; i++){
            // If the player is hovering over the current option
            if (this.#hoveringIndex != null && i == this.#hoveringIndex + 1){
                // Fills background as grey and makes text white
                game.context.fillStyle = this.#hoveringBackgroundColour;
                game.context.fillRect(this.#innerX, this.#lineHeight * i + this.#innerY, this.#lineWidth, this.#lineHeight);
                game.context.fillStyle = "#ffffff"; // For the text colour which is drawn after
            }
            else{
                // Fills background as black and makes text grey
                game.context.fillStyle = this.#defaultBackgroundColour;
                game.context.fillRect(this.#innerX, this.#lineHeight * i + this.#innerY, this.#lineWidth, this.#lineHeight);
                game.context.fillStyle = "#808080"; // For the text colour which is drawn after
            }

            // Displays text in correct location
            var x = this.#innerX + 5;
            var y = this.#innerY + this.#lineHeight * i + 5;
            game.context.fillText(this.#options[i - 1], x, y, this.#lineWidth);

            // Resets the fillstyle
            game.context.fillStyle = this.#defaultBackgroundColour;
        }
    }
}