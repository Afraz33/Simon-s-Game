var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level =0;

function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
   $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
   audio.play();
    level++;
    $("#level-title").text("Level " + level);
  return randomChosenColor;
  
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
$(".btn").click(function()   {
  let ucerChosenColor = $(this).attr("id");
  userClickedPattern.push(ucerChosenColor);
  playSound(ucerChosenColor);
  animatePress(ucerChosenColor);
  checkAnswer(userClickedPattern.length-1);
 
})

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

var toggle = true; 

$(document).keypress(function() {
  if (toggle) {
   
    
    
      
    $("#level-title").text("Level " + level);
  nextSequence();
  toggle = false;
    
  }
 
});


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
       
       
      }, 1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  toggle = true;
}