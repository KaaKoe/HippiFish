window.onload = function() {
  var gameStarted = false;

  var score = 0;
  document.getElementById("score").innerHTML = "Kisses: " + score;

  var playerName = "";
  drawHighscore();

  //enter your name and click submit button to continue
  document.getElementById("submitButton").onclick = function() {
    playerName = $("#typeName").val();
    if (playerName != 0) {
      $(".enterNameDiv").hide();
      $(".startDiv").show();
    } else {
      alert("Please type in your name!");
    }
  };

  //click start-button --> start Game
  document.getElementById("start-button").onclick = function() {
    if (!gameStarted) {
      gameStarted = true;
      startGame();
      $("#score").show();
      $(".startDiv").hide();
    }
  };

  document.getElementById("newGame-button").onclick = function() {
    window.location.reload();
  };

  var jQueryCanvas = $('<canvas width="800" height="600"></canvas>');
  var canvas = jQueryCanvas[0];
  var ctx = canvas.getContext("2d");
  $("#mainCanvas").append(canvas);

  //User fish at the left side of the frame
  var imgUserFish = new Image();
  var userFishWidth = 42;
  var userFishHeight = 31.6;
  imgUserFish.src = "images/purpleUserFish.png";



  //variable defining start position of userFish
  var userFishYPosition = 300; /*canvas.height / 2 - userFishHeight / 2;*/
  var userFishXPosition = 16;

  //Array for fishSchoan coming into frame randomly from right side
  var fishSchoanArr = [];
  var fishSchoanImages = [
    "images/fisch 01.png",
    "images/fisch 02.png",
    "images/fisch 03.png",
    "images/fisch 04.png",
    "images/fisch 05.png",
    "images/fisch 06.png",
    "images/fisch 07.png"
  ];

  //FishSchoan coming into frame from left
  // var fishSchoanArrLeft = [];
  // var fishSchoanArrLeftImages = [
  //   "images/fish 01.left.png",
  //   "images/fish 02.left.png",
  //   "images/fish 03.left.png",
  //   "images/fish 04.left.png",
  //   "images/fish 05.left.png",
  //   "images/fish 06.left.png",
  //   "images/fish 08.left.png"
  // ];

  //array with different ratios that get multiplied by by constructor Fish width and height to randomize the size of fishes
  var ratios = [0.4, 0.5, 0.7, 1.2, 1.5, 1.7];

  //Image on vanvas before game starts
  var startImage = new Image();
  startImage.src = "images/coralBackground_dark.jpg";
  startImage.onload = function() {
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
  };

  //looping background image
  var backgroundImage = {
    img: startImage,
    x: 0,
    speed: -1,

    move: function() {
      this.x += this.speed;
      this.x %= 800;
    },

    draw: function() {
      ctx.drawImage(this.img, this.x, 0);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + 800, 0);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, 0, canvas.width);
      }
    }
  };

  //variable that is used to count frames
  var frame = 0;

  function startGame() {
    document.onkeydown = function(event) {
      switch (event.keyCode) {
        case 87:
          moveUp();
          break;
        case 83:
          moveDown();
          break;
        case 68:
          moveRight();
          break;
        case 65:
          moveLeft();
          break;
      }
    };
    window.requestAnimationFrame(updateCanvas);
  }

  var gameOver = false;

  //function that undates my main-Canvas constantly
  function updateCanvas() {
    imgUserFish.onload = function() {
      ctx.drawImage(
        imgUserFish,
        userFishXPosition,
        userFishYPosition - 16,
        userFishWidth,
        userFishHeight
      );
    };
    frame++;
    for (i = 0; i < fishSchoanArr.length; i++) {
      //rapidity of fishSchoan moving from right to left
      if (score < 22) {
        fishSchoanArr[i].x -= 2;
      } else {
        fishSchoanArr[i].x -= 3;
      }

      //collision
      if (
        intersect(
          {
            x: userFishXPosition,
            y: userFishYPosition,
            width: userFishWidth,
            height: userFishHeight
          },
          {
            x: fishSchoanArr[i].x,
            y: fishSchoanArr[i].y,
            width: fishSchoanArr[i].width,
            height: fishSchoanArr[i].height
          }
        )
      ) {
        if (fishSchoanArr[i].status == true) {
          if (
            userFishWidth > fishSchoanArr[i].width &&
            userFishHeight > fishSchoanArr[i].height
          ) {
            userFishWidth += 0.1 * fishSchoanArr[i].width;
            userFishHeight = userFishWidth * (790 / 1050);
            fishSchoanArr[i].status = false;
            score++;
            console.log(score);
          } else {
            gameOver = true;
            $(".gameOver").show();
            updateHighscore();
            drawHighscore();
          }
        }
      }
    }
    if (score < 7) {
      if (frame % 100 == 0) {
        var randomIndex = Math.floor(fishSchoanImages.length * Math.random()); //random fish from Schoan Array
        var randomY = Math.floor(Math.random() * 600); //random Y Position of new fish
        var randomRatio = Math.floor(Math.random() * ratios.length); //random size of new fish
        var fish = new Fish(
          fishSchoanImages[randomIndex],
          canvas.width,
          randomY,
          ratios[randomRatio],
          userFishWidth
        );
        fishSchoanArr.push(fish);
      }
    } else if (score >= 7 && score < 16) {
      if (frame % 90 == 0) {
        var randomIndex = Math.floor(fishSchoanImages.length * Math.random()); //random fish from Schoan Array
        var randomY = Math.floor(Math.random() * 600); //random Y Position of new fish
        var randomRatio = Math.floor(Math.random() * ratios.length); //random size of new fish
        var fish = new Fish(
          fishSchoanImages[randomIndex],
          canvas.width,
          randomY,
          ratios[randomRatio],
          userFishWidth
        );
        fishSchoanArr.push(fish);
      }
    } else if (score >= 16) {
      if (frame % 80 == 0) {
        var randomIndex = Math.floor(fishSchoanImages.length * Math.random()); //random fish from Schoan Array
        var randomY = Math.floor(Math.random() * 600); //random Y Position of new fish
        var randomRatio = Math.floor(Math.random() * ratios.length); //random size of new fish
        var fish = new Fish(
          fishSchoanImages[randomIndex],
          canvas.width,
          randomY,
          ratios[randomRatio],
          userFishWidth
        );
        fishSchoanArr.push(fish);
      }
    }

    //clear old frame and draw every new frame again with modified objects
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
    backgroundImage.move();
    ctx.drawImage(
      imgUserFish,
      userFishXPosition,
      userFishYPosition,
      userFishWidth,
      userFishHeight
    );
    for (var i = 0; i < fishSchoanArr.length; i++) {
      if (fishSchoanArr[i].status == true) {
        ctx.drawImage(
          fishSchoanArr[i].img,
          fishSchoanArr[i].x,
          fishSchoanArr[i].y,
          fishSchoanArr[i].width,
          fishSchoanArr[i].height
        );
      }

      if (fishSchoanArr[i].x < 0) fishSchoanArr.splice(i, 1);
    }

    document.getElementById("score").innerHTML = "Kisses: " + score;
    if (!gameOver) window.requestAnimationFrame(updateCanvas);
  }

  //use this function inside updateCanvas() to check if userFish and fishSchoan crash
  function intersect(rect1, rect2) {
    rect1left = rect1.x + 3;
    rect1top = rect1.y + 5;
    rect1right = rect1.x + rect1.width - 3;
    rect1bottom = rect1.y + rect1.height - 5;

    rect2left = rect2.x + 3;
    rect2top = rect2.y + 5;
    rect2right = rect2.x + rect2.width - 3;
    rect2bottom = rect2.y + rect2.height - 5;

    return !(
      rect1left > rect2right ||
      rect1right < rect2left ||
      rect1top > rect2bottom ||
      rect1bottom < rect2top
    );
  }

  //move userFish up
  function moveUp() {
    if (userFishYPosition > userFishHeight / 2) {
      userFishYPosition -= 5;
    }
  }
  //move userFish down
  function moveDown() {
    if (userFishYPosition < canvas.height - userFishHeight / 2)
      userFishYPosition += 5;
  }

  //move userFish right
  function moveRight() {
    if (userFishXPosition < canvas.width - userFishWidth / 2);
    userFishXPosition += 5;
  }

  //move userFish left
  function moveLeft() {
    if (userFishYPosition > userFishWidth / 2);
    userFishXPosition -= 5;
  }

  function updateHighscore() {
    var highscoresArray = JSON.parse(localStorage.getItem("Highscores"));
    if (!highscoresArray) highscoresArray = [];
    highscoresArray.push({
      player: playerName,
      score: score
    });
    localStorage.setItem("Highscores", JSON.stringify(highscoresArray));
  }

  function drawHighscore() {
    var highscoresArray = JSON.parse(localStorage.getItem("Highscores"));
    if (!highscoresArray) highscoresArray = [];
    highscoresArray.sort(function(a, b) {
      if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      } else {
        return 0;
      }
    });
    highscoresArray
      .filter(function(el, index) {
        return index < 3;
      })
      .forEach(function(el, index) {
        $("#score" + index).text(el.score);
        $("#player" + index).text(el.player);
      });
  }
};
