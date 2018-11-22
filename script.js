window.onload = function () {
    document.getElementById("start-button").onclick = function () {
        startGame();
    };


    var jQueryCanvas = $('<canvas width="800" height="600"></canvas>');
    var canvas = jQueryCanvas[0];
    var ctx = canvas.getContext('2d');
    $('#mainCanvas').append(canvas);

    //variable defining start position of userFish
    var userFishYPosition = 300;

    //fishSchoan coming into frame randomly from right side
    var fishSchoanArr = [];
    var fishSchoanImages = [
        "images/fisch1.png",
        "images/fisch 01.png",
        "images/fisch 02.png",
        "images/fisch 03.png",
        "images/fisch 04.png",
        "images/fisch 05.png",
        "images/fisch 06.png",
        "images/fisch 07.png",
    ]


    var startImage = new Image();
    startImage.src = "images/coralBackground_dark.jpg";
    startImage.onload = function() {
        ctx.drawImage(startImage, 0, 0, 800, 600)
    }

    var backgroundImage = {
        img: startImage,   
        x: 0,
        speed: -1,

        move: function () {
            this.x += this.speed;
            this.x %= 800;
        },

        draw: function () {
            ctx.drawImage(this.img, this.x, 0);
            if (this.speed < 0) {
                ctx.drawImage(this.img, this.x + 800, 0);
            } else {
                ctx.drawImage(this.img, this.x - this.img.width, 0, 800);
            }
        },
    };

    //User fish at the left side of the frame
    var imgUserFish = new Image();
    imgUserFish.src = "images/UserFishRed.png";
    imgUserFish.onload = function () {
        ctx.drawImage(imgUserFish, 0, userFishYPosition - 16, 64, 64)
    }

    //variable that is used to count frames
    var frame = 0;

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

    var gameOver = false;

    //function that undates my main-Canvas constantly
    function updateCanvas() {
        //random type, YPosition, size of new fish
        frame++;
        for (i = 0; i < fishSchoanArr.length; i++) {
            fishSchoanArr[i].x -= 3; //rapidity of fishSchoan moving from right to left
            //collision
            if (
                intersect({
                    x: 0,
                    y: userFishYPosition,
                    width: 64,
                    height: 64,
                }, {
                    x: fishSchoanArr[i].x,
                    y: fishSchoanArr[i].y,
                    width: 84,
                    height: 57,
                })
            ) {
                alert("game over");
                gameOver = true;
            }
        }
        if (frame % 80 == 0) {
            var randomIndex = Math.floor(fishSchoanImages.length * Math.random()); //random fish from Schoan Array
            var randomY = Math.floor(Math.random() * 600); //random Y Position of new fish
            fishSchoanArr.push(new Fish(fishSchoanImages[randomIndex], 800, randomY, 84, 57, 50));
        }

        //clear old frame and draw every new frame again with modified objects
        ctx.clearRect(0, 0, 800, 600);
        backgroundImage.draw();
        backgroundImage.move();
        ctx.drawImage(imgUserFish, 0, userFishYPosition - 16, 64, 64);
        for (i = 0; i < fishSchoanArr.length; i++) {
            ctx.drawImage(fishSchoanArr[i].img, fishSchoanArr[i].x, fishSchoanArr[i].y, 84, 57)
        }
        if (!gameOver) window.requestAnimationFrame(updateCanvas);
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