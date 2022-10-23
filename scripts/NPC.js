class NPC{
    constructor(x, y, sprite){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.height = sprite.height;
        this.width = sprite.width;
        // Stores all the dialogue of the NPC
        this.dialogue = [];
        // This will be an array of arrays (each array being all 3 dialogue options after each dialogue)
        this.playerResponses = [];
    }
    AddDialogue(dialogue, responses){
        this.dialogue.push(dialogue);
        this.playerResponses.push(responses);
    }
    Interact(){
        player.interacting = true; 
        DialogueBox.SetText(this.dialogue[0], this.playerResponses[0]);
    }
}