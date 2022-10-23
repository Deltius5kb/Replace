class TextBox{
    constructor(){
        // Sprite is used to draw the background of the textbox, everything is then drawn on top of that
        this.sprite = document.getElementById("TextBoxSprite");
        // X and Y position of the textbox so that it is centered
        this.x = Math.round((1280 - this.sprite.width) / 2);
        this.y = Math.round(720 - this.sprite.height);
        // X and Y position of where the text can be drawn
        this.innerX = Math.round((1280 - this.sprite.width + 20) / 2);
        this.innerY = Math.round((720 - this.sprite.height + 10));
        // Text and options that are to be displayed
        this.text = null;
        this.options = null; // There will always be 3 options
        // Used for seperating dialogue and options
        this.lineWidth = Math.round((this.sprite.width - 20));
        this.lineHeight = Math.round((this.sprite.height - 20) / 4);
        // Used for drawing the textbox
        this.defaultBackgroundColour = "#000000";
        this.hoveringBackgroundColour = "#202020";
        // Makes it so I can change the font if I need any other text elsewhere in the game
        this.font = "27px Determination Mono";
        this.hovering = null;
    }
    // Used whenever the dialogue on the textbox is changed
    SetText(text, options){
        this.text = text;
        this.options = options;
    }
    // Draws the box and the text in the right location
    Render(){
        context.font = this.font;
        // Makes it so that the coordinates used to draw text are the top left coordinates
        context.textBaseline = "top";

        context.drawImage(this.sprite, this.x, this.y);
        // Shades the dialogue area in black
        context.fillStyle = this.defaultBackgroundColour;
        context.fillRect(this.innerX, this.innerY, this.lineWidth, this.lineHeight);
        // Draws text
        context.fillStyle = "#ffffff";
        context.fillText(this.text, this.innerX + 5, this.innerY + 5, this.lineWidth);

        var hoveringFound = false;
        // Shades the answer areas in increasing shades of black
        for (var i = 1; i < 4; i++){
            // Checks if the mouse is hovering over the option
            if (
                mousePos[0] > this.innerX &&
                mousePos[0] < this.innerX + this.lineWidth && 
                mousePos[1] > this.innerY + this.lineHeight * i &&
                mousePos[1] < this.innerY + this.lineHeight * i + this.lineHeight
            ){
                // Sets hovering to be the box which is hovered over, 1st 2nd or 3rd
                this.hovering = i - 1;
                hoveringFound = true;
                // Fills background as grey and makes text white
                context.fillStyle = this.hoveringBackgroundColour;
                context.fillRect(this.innerX, this.lineHeight * i + this.innerY, this.lineWidth, this.lineHeight);
                context.fillStyle = "#ffffff";
            }
            else{
                // Fills background as black and makes text grey
                context.fillStyle = this.defaultBackgroundColour;
                context.fillRect(this.innerX, this.lineHeight * i + this.innerY, this.lineWidth, this.lineHeight);
                context.fillStyle = "#808080";
            }

            // Displays text in correct location
            var x = this.innerX + 5;
            var y = this.innerY + this.lineHeight * i + 5;
            context.fillText(this.options[i - 1], x, y, this.lineWidth);

            // Resets the fillstyle
            context.fillStyle = this.defaultBackgroundColour;
        }
        if (hoveringFound == false){
            this.hovering = null;
        }
    }
}