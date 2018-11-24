window.onload = function () {

    var gameStarted = false;

    document.getElementById("start-button").onclick = function () {
        if (!gameStarted) {
            gameStarted = true;
            startGame();
        }
    };


    var jQueryCanvas = $('<canvas width="800" height="600"></canvas>');
    var canvas = jQueryCanvas[0];
    var ctx = canvas.getContext('2d');
    $('#mainCanvas').append(canvas);

    //variable defining start position of userFish
    var userFishYPosition = 300;

    //Array for fishSchoan coming into frame randomly from right side
    var fishSchoanArr = [];
    var fishSchoanImages = [
        "images/fisch 01.png",
        "images/fisch 02.png",
        "images/fisch 03.png",
        "images/fisch 04.png",
        "images/fisch 05.png",
        "images/fisch 06.png",
        "images/fisch 07.png",
    ]


    //array with different ratios that get multiplied by by constructor Fish width and height to randomize the size of fishes
    var ratios = [0.3, 0.5, 0.7, 1.2, 1.5, 1.7];

    var startImage = new Image();
    startImage.src = "images/coralBackground_dark.jpg";
    startImage.onload = function () {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height)
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
                ctx.drawImage(this.img, this.x - this.img.width, 0, canvas.width);
            }
        },
    };

    //User fish at the left side of the frame
    var imgUserFish = new Image();
    var userFishWidth = 40;
    var userFishHeight = 75;
    imgUserFish.src = "images/purpleUserFish.png";
   

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
        imgUserFish.onload = function () {
            ctx.drawImage(imgUserFish, 0, userFishYPosition - 16, userFishWidth, userFishHeight);
        }
        frame++;
        for (i = 0; i < fishSchoanArr.length; i++) {
            if(score < 8) {
                fishSchoanArr[i].x -= 2;
            } else if(score < 15) {
                fishSchoanArr[i].x -= 3;
            } else if(score < 21) {
                fishSchoanArr[i].x -= 4;
            }
            //rapidity of fishSchoan moving from right to left
            //collision
            if (
                intersect({
                    x: 0,
                    y: userFishYPosition,
                    width: userFishWidth,
                    height: userFishHeight,
                }, {
                    x: fishSchoanArr[i].x,
                    y: fishSchoanArr[i].y,
                    width: fishSchoanArr[i].width,
                    height: fishSchoanArr[i].height,
                })
            ) {
                if (fishSchoanArr[i].status == true) {
                    if (userFishWidth > fishSchoanArr[i].width && userFishHeight > fishSchoanArr[i].height) {
                        userFishWidth += 0.1 * fishSchoanArr[i].width;
                        userFishHeight = userFishWidth * (2160 / 1296);
                        fishSchoanArr[i].status = false;
                        score ++;
                        console.log(score);
                    } else {
                        alert("game over");
                        gameOver = true;
                    }
                }
            }
        }
        if (frame % 60 == 0)
        {
            var randomIndex = Math.floor(fishSchoanImages.length * Math.random()); //random fish from Schoan Array
            var randomY = Math.floor(Math.random() * 600); //random Y Position of new fish
            var randomRatio = Math.floor(Math.random() * ratios.length); //random size of new fish
            var fish = new Fish(fishSchoanImages[randomIndex], canvas.width, randomY, ratios[randomRatio], userFishWidth)
            fishSchoanArr.push(fish);
        }

        //clear old frame and draw every new frame again with modified objects
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        backgroundImage.draw();
        backgroundImage.move();
        ctx.drawImage(imgUserFish, 0, userFishYPosition - 16, userFishWidth, userFishHeight);
        for (var i = 0; i < fishSchoanArr.length; i++) {
            if (fishSchoanArr[i].status == true) {
                ctx.drawImage(fishSchoanArr[i].img, fishSchoanArr[i].x, fishSchoanArr[i].y, fishSchoanArr[i].width, fishSchoanArr[i].height)
            }

            if (fishSchoanArr[i].x < 0) fishSchoanArr.splice(i, 1);
        }
        document.getElementById('score').innerHTML = "Your Score: " + score;
        if (!gameOver) window.requestAnimationFrame(updateCanvas);
    }

    ctx.fillText("Score", 700, 500);

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

var score = 0;
