
//array of the button colours
var buttonColours = ["red", "blue", "green", "yellow"];

//user patter & game pattern arrays
var gamePattern = [];
var userClickedPattern = [];

// started and level variables.
var started = false;
var level = 0;

//detects keypress to start game
$(document).keypress(function() {

  //makes sure game isn't already started then calls the nextSequence function to start game.
  if (!started) {
    nextSequence();
    started = true;
  }
});


//this detect for user clicks
$(".btn").click(function() {

  //assigns the id of the selected button to userChosenColour variable.
  var userChosenColour = $(this).attr("id");

  //adds the selected colour to the userClickedPattern array.
  userClickedPattern.push(userChosenColour);

  // plays sound and animates the click.
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //checks the answer
  checkAnswer(userClickedPattern.length-1);
});


//checks the answer for the current level
function checkAnswer(currentLevel) {

    //checks the gamePattern agains userClickedPattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      // checks to see if the gamePattern length is same as userClickedPattern..
      //to see if the user has clicked all of the buttons
      //if so it will go to nextSequence
      if (userClickedPattern.length === gamePattern.length){

        // goes to nextSequence after 1 second.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    // if the gamePattern and userClickedPattern don't match..
    } else {

      // plays the "wrong" sound.
      playSound("wrong");

      //adds the class to the body which makes screen red etc.
      $("body").addClass("game-over");

      // changes the text of the title.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      //removes the game over class after 0.2 seconds
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      // goes to startOver function
      startOver();
    }
}


//computer generates random button to add to gamePattern array.
function nextSequence() {

  //resets the userClickedPattern from last level.
  userClickedPattern = [];

  //increases level by 1 each time
  level++;

  // sets level heading
  $("#level-title").text("Level " + level);

  //creates random number from 0 to 3
  var randomNumber = Math.floor(Math.random() * 4);

  //assigns the colour from the buttonColours array and the randomNumber to randomChosenColour var
  var randomChosenColour = buttonColours[randomNumber];

  // adds it to the gamePattern array
  gamePattern.push(randomChosenColour);

  //targes the ID of the chosen colour to animate (flashes)
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //plays corresponding sound of the randomly generated button
  playSound(randomChosenColour);
}

// animation for the button press and de-press.
function animatePress(currentColor) {

  //adds the "pressed" class to the current button id.
  $("#" + currentColor).addClass("pressed");

  //removes the "pressed" class to the current button id after 0.1 seconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//plays the sound depending on which parameter was passed.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//resets all the variables and arrays.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
