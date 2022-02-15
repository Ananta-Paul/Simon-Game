
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var score=-1;
var highscore=0;
var t="";

$(".start").click(function() {
    started = true; 
    level = 0;
    gamePattern = [];
    score=0;
    nextSequence();
    $("#level-title").text("Level " + level+'\xa0\xa0'+" Score= 0");
 
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Correct");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
        currentLevel++;
        if(currentLevel==5||currentLevel==3||currentLevel==7||currentLevel==10||currentLevel==12||currentLevel==13||currentLevel==15)
        remark(currentLevel);
        score+=level;
      }
    } else {
      playSound("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
        if(score>0)
        alert("Your Current Score="+ score+"\nyour highest score="+highscore);
        score=0;
      }, 100);
        $("#level-title").text("Game Over,click restart to play again");
        started=false;
        level=0;
        if(highscore<score){
        highscore=score;
        }
        gamePattern = [];
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level+'\xa0\xa0\xa0\xa0'+"Score="+ score);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  //score+=level;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function remark(l){
  if(l==5){
    t="Nice Going!";
  }
    if(l==3)
    t="Good Job!";
    if(l==7)
    t="Well Played!";
    if(l==10)
    t="Excellent!";
    if(l==12)
    t="Fantastic!";
    if(l==14)
    t="Superb!";
    if(l==16)
    t="Marvelous!";
    if(l==18)
    t="Sensational!";
    $("#level-title").text(t);
    setTimeout(function(){
      $("#level-title").text("Level " + level+'\xa0\xa0\xa0\xa0'+"Score="+ score);
    },1000);
  
}