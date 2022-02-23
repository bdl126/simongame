

var green_sound = new Audio("sounds/green.mp3")
var yellow_sound = new Audio("sounds/yellow.mp3")
var blue_sound = new Audio("sounds/blue.mp3")
var red_sound = new Audio("sounds/red.mp3")
var wrong_sound = new Audio("sounds/wrong.mp3")

var buttonsColours = ["red","blue","green","yellow"];
var randomChoosenColor;
var gamePattern = [];
var userClickPattern = [];

var game_started = false
var level = 0
var newNumber;
var is_valid = false;

$(".btn").click(nextSequence)
function nextSequence(e)
{

  var userChoosenColour = this.id

  if (game_started) {

    playSound(userChoosenColour)
    userClickPattern.push(userChoosenColour)

    console.log(userClickPattern)
    is_valid = checkAnswer()
    if (!is_valid) {
        startOver();
    } else {
      if (gamePattern.length === userClickPattern.length) {
        // next level
        level += 1
        $("h1").text("Level " + level )
        userClickPattern= []


        setTimeout(function() {
          //your code to be executed after 1 second
          newNumber = Math.floor(Math.random() * 4 + 1)
          gamePattern.push(buttonsColours[newNumber - 1])
          playSound(buttonsColours[newNumber - 1])
          $("." + gamePattern[gamePattern.length - 1]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        },1000);
      }
    }


  } else {
    wrong_sound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
  }

  console.log(gamePattern)
}

//sound
function playSound(name) {
  switch (name) {
    case "green":
      green_sound.play();
      break;
    case "yellow":
      yellow_sound.play();
      break;
    case "blue":
      blue_sound.play();
      break;
    case "red":
      red_sound.play();
      break;
    default:
  }
}


function animatePress(currentColor) {
  $("."+currentColor).addClass("pressed")
  setTimeout(function() {
    $("."+currentColor).removeClass("pressed")
  }, 200)
}

function checkAnswer() {
  var valid = true;
  for (var i = 0; i < (userClickPattern.length); i ++)
  {
    if (userClickPattern[i] != gamePattern[i]) {
      $("h1").text("You made a mistake! You lost!" )
      valid = false;
      break;
    }
  }

  return valid
}

$(document).on("keypress", function ()
{
  game_started = true
  level = 1
  newNumber = Math.floor(Math.random() * 4 + 1)
  $("h1").text("Level " + level )
  gamePattern.push(buttonsColours[newNumber - 1])
  playSound(buttonsColours[newNumber - 1])
  $("." + gamePattern[gamePattern.length - 1]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
})

function startOver() {
  $("h1").text("LOOSAR, Press Any key to start" )
  userClickPattern= []
  gamePattern= []
  game_started = false
  wrong_sound.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200)
}
