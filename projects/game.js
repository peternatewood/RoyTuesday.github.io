// Design Basic Game Solo Challenge

// This is a solo challenge

// Your mission description:
// Overall mission: Bomb defusal game
// Goals: Totally mouse-driven, countdown timer
// Characters: player ( implied presence ), the bomb
// Objects: big red button, colored wires, number passcode, timer
// Functions: Handle input, check solution, count down

// Pseudocode
/*

CREATE boolean 'bombExploded' which equals 'false'

CREATE object 'bigRedButton'
	PASS string 'alertMsg'
	PASS string 'correctAnswer'

CREATE object 'coloredWires'
	PASS string 'alertMsg'
	PASS string 'correctAnswer'

CREATE object 'numPasscode'
	PASS string 'alertMsg'
	PASS string 'correctAnswer'

CREATE object 'password'
	PASS string 'alertMsg'
	PASS string 'correctAnswer'

CREATE function 'gameOver' which accepts 1 parameter: 'endMsg'
	PASS 'endMsg' to body element in html

CREATE function 'alertUser' which accepts 1 parameter: 'defuseStep'
	CREATE 'userAnswer'
	DISPLAY 'alertMsg' string of 'defuseStep'
	PROMPT user input
		PASS result to 'userAnswer'
	COMPARE 'userAnswer' to 'correctAnswer' of 'defuseStep'
		IF not equal
			PASS 'true' to 'bombExploded'
			CALL 'gameOver' with parameter "Boom!"

IF 'bombExploded' is false
	CALL 'alertUser' with parameter 'bigRedButton'

IF 'bombExploded' is false
	CALL 'alertUser' with parameter 'coloredWires'

IF 'bombExploded' is false
	CALL 'alertUser' with parameter 'numPasscode'

IF 'bombExploded' is false
	CALL 'alertUser' with parameter 'password'

IF 'bombExploded' is false
	CALL 'gameOver' with parameter "Victory!"

*/

// Initial Code

// var bombExploded = false;

// function defuseStep( msgIn, answerIn )
// {
// 	this.alertMsg = msgIn,
// 	this.correctAnswer = answerIn
// }

// function gameOver( endMsg )
// {
// 	document.getElementById( "end-message" ).innerHTML = endMsg;
// }

// var bigRedButton = new defuseStep( "You have 20 seconds to defuse the bomb!\n'Push' the big red button!", 'Push' );
// var coloredWires = new defuseStep( "There are four wires: black, brown, yellow, and red.\nCut the 'Red' wire!", 'Red' );
// var numPasscode = new defuseStep( "Now it's a numeric passcode.\nThe passcode is '0451', quickly!", '0451' );
// var password = new defuseStep( "Almost there!\nNow an alphanumeric password: 'Copper and Iron'!", 'Copper and Iron' );

// var userInput = "";

// if( bombExploded == false )
// {
// 	userInput = prompt( bigRedButton.alertMsg );
// 	if( userInput != bigRedButton.correctAnswer )
// 	{
// 		bombExploded = true;
// 	}
// 	else
// 	{
// 		bombExploded = false;
// 	}
// }
// if( bombExploded == false )
// {
// 	userInput = prompt( coloredWires.alertMsg );
// 	if( userInput != coloredWires.correctAnswer )
// 	{
// 		bombExploded = true;
// 	}
// 	else
// 	{
// 		bombExploded = false;
// 	}
// }
// if( bombExploded == false )
// {
// 	userInput = prompt( numPasscode.alertMsg );
// 	if( userInput != numPasscode.correctAnswer )
// 	{
// 		bombExploded = true;
// 	}
// 	else
// 	{
// 		bombExploded = false;
// 	}
// }
// if( bombExploded == false )
// {
// 	userInput = prompt( password.alertMsg );
// 	if( userInput != password.correctAnswer )
// 	{
// 		bombExploded = true;
// 	}
// 	else
// 	{
// 		bombExploded = false;
// 	}
// }
// if( bombExploded == false )
// {
// 	gameOver( "Victory!" );
// }
// else
// {
// 	gameOver( "Boom!" );
// }

// Refactored Code

var bombExploded = false;

function defuseStep( msgIn, answerIn )
{
	this.alertMsg = msgIn,
	this.correctAnswer = answerIn
}

function gameOver( endMsg )
{
	document.getElementById( "end-message" ).innerHTML = endMsg;
}

var bigRedButton = new defuseStep( "You have 20 seconds to defuse the bomb!\n'Push' the big red button!", 'Push' );
var coloredWires = new defuseStep( "There are four wires: black, brown, yellow, and red.\nCut the 'Red' wire!", 'Red' );
var numPasscode = new defuseStep( "Now it's a numeric passcode.\nThe passcode is '0451', quickly!", '0451' );
var password = new defuseStep( "Almost there!\nNow an alphanumeric password: 'Copper and Iron'!", 'Copper and Iron' );

var allDefuseSteps = [ bigRedButton, coloredWires, numPasscode, password ];

var userInput = "";

for ( var i = 0; i < 4; i++ )
{
	if( bombExploded == false )
	{
		userInput = prompt( allDefuseSteps[ i ].alertMsg );
	}
	if( userInput.toUpperCase() != allDefuseSteps[ i ].correctAnswer.toUpperCase() )
	{
		bombExploded = true;
	}
}
if( bombExploded == false )
{
	gameOver( "Victory!" );
}
else
{
	gameOver( "Boom!" );
}

// Reflection
/*

What was the most difficult part of this challenge?

	I had trouble scaling back my ideas for a game to something I could complete in a reasonable amount of time. Manipulating DOM elements was very difficult, but I found that "Eloquent JavaScript" and Mozilla's JS documentation really helped. It seems like the easiest way to access html elements multiple times in the script is to pass the whole "document.getElementBy..." expression to a variable and work from there. I didn't have much trouble with objects and functions, since the other challenges prepared me to use them.

What did you learn about creating objects and functions that interact with one another?

	Creating your own type of object with a constructor is a great way to save time when you need multiple objects to have the same methods and properties. A constructor works much like a class in other languages; by passing a "new" instance of your constructor to a variable, you assign that variable the properties and methods defined by its constructor. JavaScript's built-in objects work like this too: every new array variable has the same set of methods, like 'toString' and 'reverse' ( technically, this deals with 'prototypes' but it works in much the same way ).

Did you learn about any new built-in methods you could use in your refactored solution? If so, what were they and how do they work?

	I learned about 'getElementById()' and 'innerHTML' while doing this challenge. 'getElementById()' is one way to access html elements through JavaScript: it takes a string as an argument and will return the element that is assigned the named id. JavaScript has several unique methods for html elements, and I used 'innerHTML'; this method accesses the text within the named element ( my call to innerHTML on line 154 allows me to change the element's starting text "Bomb fellow" ). For refactoring, I added the 'toUpperCase()' method, which works just like the Ruby method 'upcase': all characters in the string are changed to captial letters. Doing this in the comparisons means that the user's responses are no longer case-sensitive, and the game isn't so harsh.

How can you access and manipulate properties of objects?

	Accessing the properties of objects in JS works much the same way as in Ruby; each property can be accessed by typing the name of the object followed by a dot and the name of the property to access. Properties are readable and writable by default.

*/