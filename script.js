window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        startGame();
    };

var jQueryCanvas = $('<canvas width="900" height="600"></canvas>');
var canvas = jQueryCanvas[0];
var ctx = canvas.getContext('2d');
$('#mainCanvas').append(canvas);

//variables defining start position of userFish, fishSchoan
var userFishYPosition = 300;
var fishSchoanXPosition = 900;
var fiSchoanArr = [];


//User fish
var imgUserFish = new Image();
imgUserFish.src = "images/UserFishRed.png";
imgUserFish.onload = function() {
    ctx.drawImage(imgUserFish, 0, userFishYPosition -16, 64, 64)
}

var imgFishSchoan = new Image()
imgFishSchoan.src = "images/peixe-fish.png";
imgFishSchoan.onload = function() {
    ctx.drawImage(imgFishSchoan, 900, fishSchoanXPosition-500, 84, 57)
}

function startGame() {
    document.onkeydown = function(event) {
        switch (event.keyCode) {
            case 85: userFishYPosition -= 5; break;
            case 78: userFishYPosition += 5;
        }
    }
    window.requestAnimationFrame(updateCanvas);
}

function updateCanvas() {
    ctx.clearRect(0,0,900,600);

    ctx.drawImage(imgUserFish, 0, userFishYPosition -16, 64, 64);
    window.requestAnimationFrame(updateCanvas);
}





}