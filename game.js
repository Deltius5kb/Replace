
//This is a good gameloop implementation as I learned from here: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
function gameLoop() {
    player.Render();

    window.requestAnimationFrame(gameLoop);
}

var player = new PlayerObject(); //Creates new global player object, see player.js for info
window.requestAnimationFrame(gameLoop);