// Class for NPCs, holds dialogue and allows them to be drawn on screen
// Used in game.js and controls.js
class NPC{
    #text;
    #options;
    #responses;
    #listOfOptions;
    #listOfResponses;
    #numQuestionsPlayerCanAsk;

    // Dialogues is a list of strings [string, string1, string2]
    // Options is a list of lists for each dialogue [[options], [options1], [options2]]
    constructor(x, y, sprite){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        
        // Used for collision detection
        this.width = sprite.width;
        this.height = sprite.height;

        // Makes new dialogue and textbox
        this.dialogueBox = new DialogueBox();
        this.textBox = new TextBox();
        
        // The status of the NPC, can be idle, waiting for response, waiting for confirmation or finished
        this.npcStatus = "idle";

        // Current texts
        this.#text = "";
        this.#options = [];
        this.#responses = [];
        this.#numQuestionsPlayerCanAsk;
    }
    
    // Called when the dialogue for the previous NPC has finished and determined this NPC's dialogue
    SetDialogue(text, options, responses, numPlayerCanAsk = 1){
        this.#text = text;
        this.#options = options;
        this.#responses = responses;
        this.#numQuestionsPlayerCanAsk = numPlayerCanAsk;

        this.dialogueBox.SetText(this.#text, this.#options);
    }
    
    // Called from controls.js when the player interacts with the NPC
    Interact(){
        this.npcStatus = "waiting for response";
    }

    // Called from controls.js
    PlayerMadeChoice(){
        console.log(`Player made a choice: ${this.dialogueBox.hovering}`);
        var playerChoice = this.dialogueBox.hovering;
        game.playerChoices.NPCOne.push(playerChoice);
        this.#numQuestionsPlayerCanAsk -= 1;
        // Finds NPC response to question player asked
        var chosenOptionIndex = this.#options.indexOf(playerChoice);
        var NPCResponse = this.#responses[chosenOptionIndex];

        // Removes used interactions from arrays
        this.#options.splice(chosenOptionIndex, 1);
        this.#responses.splice(chosenOptionIndex, 1);
        
        // If player can ask more questions
        if (this.#numQuestionsPlayerCanAsk > 0){
            // Remove used option from arrays
            this.dialogueBox.SetText(NPCResponse, this.#options);
        }

        // If player cannot ask more questions
        else{
            this.textBox.SetText(NPCResponse);
            this.npcStatus = "waiting for confirmation";
            for (var i = 0; i < this.#options.length; i++){
                game.missedDialogue.push([this.#options.splice(0, 1)[0], this.#responses.splice(0, 1)[0]]);
            }
        }
    }

    // Called from controls.js
    PlayerConfirmedOnResponse(){
        this.npcStatus = "finished";
    }
}