window.onload = function () {
    document.getElementById("start-button").onclick = function () {
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
    var fishSchoanImages = [
        "images/molumen_Fish.png",
        "images/peixe-fish.png",
        "images/pescetto.png",
        "images/Swordfish.png",
    ]


    //User fish at the left side of the frame
    var imgUserFish = new Image();
    imgUserFish.src = "images/UserFishRed.png";
    imgUserFish.onload = function () {
        ctx.drawImage(imgUserFish, 0, userFishYPosition - 16, 64, 64)
    }

    //FishSchoan coming into frame from right side
    var imgFishSchoan = new Image()
    imgFishSchoan.src = "images/peixe-fish.png";
    imgFishSchoan.onload = function () {
        ctx.drawImage(imgFishSchoan, fishSchoanXPosition, 400, 84, 57)
    }

    function startGame() {
        document.onkeydown = function (event) {
            switch (event.keyCode) {
                case 85:
                    moveUp();
                    break;
                case 78:
                    moveDown();
                    break;
            }
        }
        window.requestAnimationFrame(updateCanvas);
    }

    //function that undates my main-Canvas constantly
    function updateCanvas() {
        if (
            intersect({
                x: 0,
                y: userFishYPosition,
                width: 64,
                height: 64
            }, {
                x: fishSchoanXPosition,
                y: 400,
                width: 84,
                height: 57,
            })
        ) {
            alert("game over");
        }
        ctx.clearRect(0, 0, 900, 600);
        fishSchoanXPosition -= 4;
        ctx.drawImage(imgFishSchoan, fishSchoanXPosition, 400, 84, 57)
        ctx.drawImage(imgUserFish, 0, userFishYPosition - 16, 64, 64);
        window.requestAnimationFrame(updateCanvas);
    }

    //use this function inside updateCanvas() to check if car and obstacle crash
    function intersect(rect1, rect2) {
        rect1left = rect1.x
        rect1top = rect1.y
        rect1right = rect1.x + rect1.width
        rect1bottom = rect1.y + rect1.height

        rect2left = rect2.x
        rect2top = rect2.y
        rect2right = rect2.x + rect2.width
        rect2bottom = rect2.y + rect2.height

        return !(rect1left > rect2right ||
            rect1right < rect2left ||
            rect1top > rect2bottom ||
            rect1bottom < rect2top)
    }

    function moveUp() {
        if (userFishYPosition > 16) {
            userFishYPosition -= 5;
        }
    }

    function moveDown() {
        if (
            userFishYPosition < 584
        ) userFishYPosition += 5;
    }

}