// Pseudocode
/*

CREATE array 'roomNames'
	PASS 18 strings each naming a different room on the station

CREATE array 'roomDescrip'
	PASS strings describing each room

CREATE array 'possibleInputs'
	PASS strings for each possible player input

CREATE array 'helpDescrips'
	PASS one string to describe each possible player input

CREATE array 'storyMessages'
	PASS one string for each story-related message

CREATE object 'inventory'
	
CREATE array 'messageLog'
	PASS first element of 'storyMessages'

CREATE integer 'actionNum' which equals 0

DEFINE function 'storeName' which accepts 1 parameter: 'userName'
	CREATE array 'names'
		ITERATE over 'userName'
			IF first character is a space, move to next element
			ELSE pass character to current element of 'names's

DEFINE class 'actor' which accepts 1 parameter: 'startRoom'
	CREATE string 'currentRoom'
		PASS 'startRoom'
	DEFINE function 'move' which accepts 1 parameter: 'newRoom'
		IF 'newRoom' is null
			PASS 'roomNames' at random index from 0 - 13
		ELSE pass 'roomNames' at index 'newRoom' to 'currentRoom'

DEFINE class 'room' which accepts 2 parameters: 'startDescrip', 'hasItems'
	CREATE string 'description'
		PASS 'startDescrip'
	CREATE array 'items'
		PASS 'hasItems'

DEFINE function 'response' which accepts 1 parameter: 'userCommand'
	ITERATE over 'possibleInputs'
		IF 'userCommand' equals "look"
			RETURN 'description' string from player's 'currentRoom'
		ELSE IF 'userCommand' begins with "go to"
			CREATE string 'room'
				PASS part of 'userCommand' starting after "go to "
			ITERATE over 'adjacentRooms' of player's 'currentRoom'
			IF 'adjacentRooms' does not contain 'room'
				RETURN "You cannot reach that room from here."
			ELSE
				PASS 'room' to player's 'currentRoom'
				PASS current room's 'description' to 'lastMessage'
		IF 'userCommand' equals "use"
			CREATE string 'object'
			ITERATE over player's 'inventory'

DEFINE function 'handleInput' which accepts no parameters
	DISPLAY string 'lastMessage'
	CREATE string 'userIn'
		PASS user input
	ITERATE over 'possibleInputs'
		IF 'userIn' doesn't equal any element
			PASS "I don't understand." to 'lastMessage'
		ELSE
			CALL 'response' with the argument 'userIn'
				PASS result to 'lastMessage'

*/
var actionCount = 0;

function countDown( startNum )
{
	clearPicture();
	if( startNum > 0 )
	{
		passMessage( startNum.toString() + " seconds remaining." );
		setTimeout( function() { countDown( startNum - 10 ) }, 10000 );
	}
	else
	{
		passMessage( "0 seconds remaining." );
	}
}
function Room( descrip, sounds, level, isLocked )
{
	this.descrip = descrip;
	this.sounds = sounds;
	this.level = level;
	this.isLocked = isLocked;
	this.adjRoom = [];
	this.roomObject = [];
}

var roomDescrip = {
	"hibernation": "Hibernation: A bright, white room with six hibernation chambers in the center of the room. The airlock to the fore leads in to the main hall. There is a control panel opposite the airlock.",
	"main hall": "Main Hall: A dark-grey room with air-locks leading to Port and Starboard Docking, the Port and Starboard Halls, Hibernation, and Ladder Access, which leads to the lower level. There is always some sound coming from the computer or station's systems, but it feels eerily quiet here.",
	"port hall": "Port Hall: Hallway connecting the Main Hall and the Mess.",
	"starboard hall": "Starboard Hall: Hallway connecting the Main Hall and the Rec Room",
	"mess": "Mess: A well-lit, off-white room with cupboards along one wall and a table in the center. In the counter beneath the cupboards, there is a sink, freezer, and an oven. One air-lock leads to the Port Hall, and the one opposite leads to Cockpit Access.",
	"rec room": "Rec Room: A bright room with various exercize equipment lining the walls: a few treadmills, and several free weights. One air-lock leads to the Starboard Hall, the other to Cockpit Access.",
	"cockpit": "Cockpit: The control-center for the station's propulsion and the shuttle. There are few lights apart from the displays and illuminated controls. The only air-lock leads back to Cockpit Access.",
	"cockpit access": "Cockpit Access: An empty hallway connecting the Rec Room, the Mess, and the Cockpit.",
	"ladder access": "Ladder Access: A small hallway with the ladder leading down to the second level in the center. One air-lock leads to the Main Hall, the other to the Computer Room.",
	"computer room": "Computer Room: A bright, white room with nine displays in the wall opposite the airlock. There is a high-backed chair in the center of the room. The only air-lock leads back to Ladder Access.",
	"port docking": "Port Docking: The outer air-lock is stained with Allen's blood. The interior air-lock leads back to the Main Hall.",
	"starboard docking": "Starboard Docking: One of the chambers used when docking with a vessel or another station. Each air-lock can only open if the other is closed. One air-lock leads to the vaccuum of space, the other back to the Main Hall.",
	"cargo access": "Cargo Access: A dark room with the ladder to Ladder Access on one side of the room, a control panel in the middle, and several cargo containers in clusters in the corners. There is an air-lock leading to each of the cargo holds: Fore, Starboard, Aft, and Port.",
	"port cargo": "Port Cargo: Every surface of the room is covered in a thick, black, webbing. The one air-lock leads back to Cargo Access.",
	"aft cargo": "Aft Cargo: The most crowded cargo hold. The containers are stacked high and close together, making it hard to navigate the space. The one air-lock leads back to Cargo Access.",
	"starboard cargo": "Starboard Cargo: Several containers have been moved away from the air-lock, framing a long-blue container sitting on top of a few brown ones in the middle of the room. The one air-lock leads back to Cargo Access.",
	"fore cargo": "Fore Cargo: According to company regulations, there must be a clear path in Fore Cargo from the Cargo Access air-lock to the Shuttle air-lock. We never needed the shuttle, so we filled Fore Cargo up just as much as the other cargo holds.",
	"shuttle": "Shuttle: A small vessel used in emergencies. The interior is pristine: the shuttle has never been used during the entire contract. The air-lock leads back to the Fore Cargo hold.",
}
var stationRoom = {
	"hibernation": new Room( roomDescrip[ "hibernation" ],"You hear " , 1, false ),
	"main hall": new Room( roomDescrip[ "main hall" ],"You hear " , 1, false ),
	"port hall": new Room( roomDescrip[ "port hall" ],"You hear " , 1, false ),
	"starboard hall": new Room( roomDescrip[ "starboard hall" ],"You hear " , 1, false ),
	"mess": new Room( roomDescrip[ "mess" ],"You hear " , 1, false ),
	"rec room": new Room( roomDescrip[ "rec room" ],"You hear " , 1, false ),
	"cockpit": new Room( roomDescrip[ "cockpit" ],"You hear " , 1, false ),
	"cockpit access": new Room( roomDescrip[ "cockpit access" ],"You hear " , 1, false ),
	"ladder access": new Room( roomDescrip[ "ladder access" ],"You hear " , 1, false ),
	"computer room": new Room( roomDescrip[ "computer room" ],"You hear " , 1, false ),
	"port docking": new Room( roomDescrip[ "port docking" ],"You hear " , 1, true ),
	"starboard docking": new Room( roomDescrip[ "starboard docking" ],"You hear " , 1, false ),
	"cargo access": new Room( roomDescrip[ "cargo access" ],"You hear " , 2, false ),
	"port cargo": new Room( roomDescrip[ "port cargo" ],"You hear " , 2, true ),
	"aft cargo": new Room( roomDescrip[ "aft cargo" ],"You hear " , 2, true ),
	"starboard cargo": new Room( roomDescrip[ "starboard cargo" ],"You hear " , 2, true ),
	"fore cargo": new Room( roomDescrip[ "fore cargo" ],"You hear " , 2, true ),
	"shuttle": new Room( roomDescrip[ "shuttle" ],"You hear " , 2, true ),
};
stationRoom[ "hibernation" ].adjRoom = [ stationRoom[ "main hall" ] ];
stationRoom[ "main hall" ].adjRoom = [ stationRoom[ "hibernation" ], stationRoom[ "port hall" ], stationRoom[ "starboard hall" ], stationRoom[ "ladder access" ], stationRoom[ "port docking" ], stationRoom[ "starboard docking" ] ];
stationRoom[ "port hall" ].adjRoom = [ stationRoom[ "main hall" ], stationRoom[ "mess" ] ];
stationRoom[ "starboard hall" ].adjRoom = [ stationRoom[ "main hall" ], stationRoom[ "rec room" ] ];
stationRoom[ "mess" ].adjRoom = [ stationRoom[ "port hall" ], stationRoom[ "cockpit access" ] ];
stationRoom[ "rec room" ].adjRoom = [ stationRoom[ "starboard hall" ], stationRoom[ "cockpit access" ] ];
stationRoom[ "cockpit" ].adjRoom = [ stationRoom[ "cockpit access" ] ];
stationRoom[ "cockpit access" ].adjRoom = [ stationRoom[ "rec room" ], stationRoom[ "mess" ], stationRoom[ "cockpit" ] ];
stationRoom[ "ladder access" ].adjRoom = [ stationRoom[ "main hall" ], stationRoom[ "computer room" ], stationRoom[ "cargo access" ] ];
stationRoom[ "computer room" ].adjRoom = [ stationRoom[ "ladder access" ] ];
stationRoom[ "port docking" ].adjRoom = [ stationRoom[ "main hall" ] ];
stationRoom[ "starboard docking" ].adjRoom = [ stationRoom[ "main hall" ] ];
stationRoom[ "cargo access" ].adjRoom = [ stationRoom[ "ladder access" ], stationRoom[ "port cargo" ], stationRoom[ "aft cargo" ], stationRoom[ "starboard cargo" ], stationRoom[ "fore cargo" ] ];
stationRoom[ "port cargo" ].adjRoom = [ stationRoom[ "cargo access" ] ];
stationRoom[ "aft cargo" ].adjRoom = [ stationRoom[ "cargo access" ] ];
stationRoom[ "starboard cargo" ].adjRoom = [ stationRoom[ "cargo access" ] ];
stationRoom[ "fore cargo" ].adjRoom = [ stationRoom[ "cargo access" ], stationRoom[ "shuttle" ] ];
stationRoom[ "shuttle" ].adjRoom = [ stationRoom[ "fore cargo" ] ];

stationRoom[ "hibernation" ].roomObject = {
	"hibernation chamber": { descrip: "Hibernation Chamber: ", isItem: false },
	"hibernation chambers": { descrip: "Hibernation Chamber: ", isItem: false },
	"control panel": { descrip: "Control Panel: ", isItem: false },
};

function checkAdjacent ( room )
{
	for( var i = 0; i < player.room.adjRoom.length; i++ )
	{
		if( player.room.adjRoom[ i ] == room )
		{
			return true;
		}
	}
}
function Actor( startRoom )
{
	this.room = startRoom;
	this.level = startRoom.level;
}
var player = new Actor( stationRoom[ "hibernation" ] );
var creature = new Actor( stationRoom[ "port cargo" ] );

var storyStage = "title";

var picture = {
	title: [ "+------------------------------------------------------------------+",
		"|   ________    _________      ______       _______    ___________ |",
		"| /          \\ |          \\  /        \\   /         \\ |            |",
		"| \\__________  |__________/ |__________| |            |______      |",
		"|            | |            |          | |            |            |",
		"| \\__________/ |            |          |  \\_________/ |___________ |",
		"|       ___________   ___________     ______      _________        |",
		"|      |             |              /        \\   |          \\      |",
		"|      |______       |______       |__________|  |__________/      |",
		"|      |             |             |          |  |        \\        |",
		"|      |             |___________  |          |  |          \\      |",
		"|                                                                  |",
		"|                       Type \"start\" to play                       |",
		"|                                                                  |",
		"+------------------------------------------------------------------+" ],

	map1: [ "            /------------------------------------------------------\\",
		"     Level 1|                                                      |",
		"/-----------|      ----------\\       /---------\\               P   |",
		"|0:Air-lock |      0A::::::::|-------|:::::::::|             A-+-F |",
		"|           |      ------\\-@-/:|:::::|:::::::::|               S   |",
		"|@:Locked   |        /:::|:::::0:::::0:::::::::0-----------\\       |",
		"|           |      /:::::|:::::|-----+-------/:::::|:::::::::\\     |",
		"|P:Control  |     |P::S::0:::::0:H:::0:::::P:|:::::0:::::::::P|    |",
		"|  Panel    |      \\:::::|:::::|-----+-------\\:::::|:::::::::/     |",
		"|           |        \\:::|:::::0:::::0:::::::::0-----------/       |",
		"|H:Ladder   |      ------/-0-\\:|:::::|:::::::::|                   |",
		"|           |      0:::::::::|-------|:::::::::|                   |",
		"|#:Webbing  |      ----------/       \\---------/                   |",
		"\\-----------|                                                      |",
		"            \\------------------------------------------------------/", ],

	map2: [ "            /------------------------------------------------------\\",
		"     Level 2|                                                      |",
		"/-----------|                                                  P   |",
		"|0:Air-lock |                        /-------\\               A-+-F |",
		"|           |                        |#######B#\\               S   |",
		"|@:Locked   |            /-------------@---------\\                 |",
		"|           |            |:::::|:::::C:::|:::::::::\\-------\\       |",
		"|P:Control  |            |:::::@:H:::P:::@::::::E:::0::::::P|      |",
		"|  Panel    |            |:::::|:::::::::|:::::::::/-------/       |",
		"|           |            \\-------------@---------/                 |",
		"|H:Ladder   |                        |:::::D:::/                   |",
		"|           |                        \\-------/                     |",
		"|#:Webbing  |                                                      |",
		"\\-----------|                                                      |",
		"            \\------------------------------------------------------/", ],

	map22: [ "            /------------------------------------------------------\\",
		"     Level 2|                                                      |",
		"/-----------|                                                  P   |",
		"|0:Air-lock |                                                A-+-F |",
		"|           |                                                  S   |",
		"|@:Locked   |                                                      |",
		"|           |                      /------\\                        |",
		"|P:Control  |                      0::::::P|                       |",
		"|  Panel    |                      \\------/                        |",
		"|           |                                                      |",
		"|H:Ladder   |                                                      |",
		"|           |                                                      |",
		"|#:Webbing  |                                                      |",
		"\\-----------|                                                      |",
		"            \\------------------------------------------------------/" ],

	death: [ "&------------------------------------------------------------------&",
		"|                                                                  |",
		"|                                                                  |",
		"|                      R E S T  I N  P E A C E                     |",
		"|                                                                  |",
		"|                                                                  |",
		"|       _ ------------------------------------------------ _       |",
		"|     /______________________________________________________\\     |",
		"|   (__________________________________________________________)   |",
		"|   [==========================================================]   |",
		"|   [===================[ FIRST MIDDLE LAST ]==================]   |",
		"|   [==========================================================]   |",
		"|   (__________________________________________________________)   |",
		"|                                                                  |",
		"&------------------------------------------------------------------&" ],

	endA: [ "%------------------------------------------------------------------%",
		"|                   %%%%%%%%%%%%%%%%%%%%%%%%%%%%                   |",
		"|                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  |",
		"|                 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 |",
		"|                 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 |",
		"|                 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 |",
		"|                 %%%__________________________%%%                 |",
		"|                  %%|   /\\/\\/\\/\\/\\/\\/\\/\\/\\   |%%                  |",
		"|                     \\/    |   /vv\\   |    \\/                     |",
		"|                            \\/%%%%%%\\/                            |",
		"|                             %%%%%%%%                             |",
		"|                            /\\%%%%%%/\\                            |",
		"|                           |   \\^^/   |                the end    |",
		"|                         /\\AAAAAAAAAAAA/\\                         |",
		"%------------------------------------------------------------------%" ],

	endB: [ "%------------------------------------------------------------------%",
		"|                       %%%%%%%%%%%%%%%%%%%%                       |",
		"|                     %%%%%%%%%%%%%%%%%%%%%%%%                     |",
		"|                   %%%%%%%%%%%%%%%%%%%%%%%%%%%%                   |",
		"|                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                  |",
		"|                 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 |",
		"|                 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 |",
		"|                 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 |",
		"|                 %%%__________________________%%%                 |",
		"|                  %%|   /\\/\\/\\/\\/\\/\\/\\/\\/\\   |%%                  |",
		"|                     \\/                    \\/                     |",
		"|                         /\\AAAAAAAAAAAA/\\                         |",
		"|                         \\______________/              the end    |",
		"|                           \\%%%%%%%%%%/                           |",
		"%------------------------------------------------------------------%" ],
};

var playerName = [];

function toProper( stringIn )
{
	var stringOut = stringIn.split( "" );
	stringOut[ 0 ] = stringOut[ 0 ].toUpperCase();
	return stringOut.join( "" );
}
function storePlayerName( name )
{
	splitNames = name.split( " " );
	splitNames.forEach( function( i ) { playerName.push( toProper( i.toLowerCase() ) ); } );

	var caskName = playerName.join( " " );
	var width = picture.death[ 10 ].length - 10;
	var padding = width - caskName.length - 4;
	/*for( var i = 0; i < playerName.length; i++ )
	{
		if( padding < 0 )
		{
			caskName = caskName.slice( 0, caskName.length - playerName.lastIndexOf().length + 1 ) + ".";
			padding = width - caskName.length;
		}
	}*/
	caskName = caskName.split( "" );
	caskName.unshift( "[ " );
	caskName.push( " ]" );
	for( var i = 0; i < padding; i++ )
	{
		if( i % 2 == 0 )
		{
			caskName.unshift( "=" );
		}
		else
		{
			caskName.push( "=" );
		}	
	}
	picture.death[ 10 ] = "|   [" + caskName.join( "" ) + "]   |";
};

var inputLog = [];
var lastInputIndex = 0;
var msgLog = [ " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " " ];

var inputUnknown = "I'm sorry, I don't understand. Type \"help\" for a list of valid commands.";
var possibleInputs = "Commands: computer, go, help, hide, inventory, look, map, sneak, style, use, walk. Type a command name after \"help\" for details about that command."
var mapError = "Error: map unavailable for this level";
var lockedRoom = "The air-lock leading to this room is sealed. You cannot open it from here.";

var consoleStyles = {
	dos: "style-dos",
	c64: "style-c64",
	tandy: "style-tandy",
	blood: "style-blood",
};
var specifyInput = {
	go: "Please specify a location, E.G. \"go main hall\".",
	g: "Please specify a location, E.G. \"g main hall\".",
	hide: "Please specify a location, E.G. \"hide door\".",
	h: "Please specify a location, E.G. \"h door\".",
	sneak: "Please specify a location, E.G. \"sneak ladder access\".",
	walk: "Please specify a location, E.G. \"walk ladder access\".",
	w: "Please specify a location, E.G. \"w ladder access\".",
	style: "Please specify a style name, E.G. \"style c64\".",
	use: "Please specify an object, E.G. \"use flashlight\".",
	u: "Please specify an object, E.G. \"u flashlight\".",
};
var helpDescrips = {
	computer: "Comp, Computer: Enters computer question mode. While in question mode, a \"question\" is asked by typing an object, character, or place name, E.G. \"hibernation\". The computer will provide whatever details it can in response. Type \"exit\" to leave question mode. Asking a question is a free action, entering question mode is not.",
	comp: "Comp, Computer: Enters computer question mode. While in question mode, a \"question\" is asked by typing an object, character, or place name, E.G. \"hibernation\". The computer will provide whatever details it can in response. Type \"exit\" to leave question mode. Asking a question is a free action, entering question mode is not.",
	go: "G, Go, Move: Moves the player quickly and noisily to the specified location, E.G. \"g table\".",
	g: "G, Go, Move: Moves the player quickly and noisily to the specified location, E.G. \"g table\".",
	move: "G, Go, Move: Moves the player quickly and noisily to the specified location, E.G. \"g table\".",
	help: "Help: Displays all valid player commands. Specify a command to learn more about it, E.G. \"help computer\".",
	hide: "H, Hide: Will hide the player at the specified location, E.G. \"hide door\".",
	h: "H, Hide: Will hide the player at the specified location, E.G. \"hide door\".",
	inventory: "I, Inv, Inventory: Displays list of all items in inventory. This is a free action.",
	inv: "I, Inv, Inventory: Displays list of all items in inventory. This is a free action.",
	i: "I, Inv, Inventory: Displays list of all items in inventory. This is a free action.",
	listen: "Listen: Will describe any sounds you can hear. May reveal sounds normally overlooked.",
	look: "L, Look, Look at: Will describe the current room. Specify an inventory item or something in the room for a more detailed description, E.G. \"look panel\". This is a free action.",
	l: "L, Look, Look at: Will replay the description of the current room. Specify an inventory item or something in the room for a more detailed description, E.G. \"look panel\". This is a free action.",
	map: "M, Map: Displays map of current floor. Specify a floor to see its map instead, E.G. \"map 2\". This is not a free action.",
	m: "M, Map: Displays map of current floor. Specify a floor to see its map instead, E.G. \"map 2\". This is not a free action.",
	sneak: "W, Walk, Sneak: Moves the player slowly and quietly in the specified direction or to the specified object or room, E.G. \"sneak ladder access\".",
	walk: "W, Walk, Sneak: Moves the player slowly and quietly in the specified direction or to the specified object or room, E.G. \"sneak ladder access\".",
	w: "W, Walk, Sneak: Moves the player slowly and quietly in the specified direction or to the specified object or room, E.G. \"sneak ladder access\".",
	style: "Style: Changes the current color palette to one of the following presets: dos, c64, tandy, blood.",
	use: "U, Use, Use _ on: Will use the specified inventory item or object in the environment, E.G. \"use flashlight\". Or use one object on another, E.G. \"use tether on body\".",
	u: "U, Use, Use _ on: Will use the specified inventory item or object in the environment, E.G. \"use flashlight\". Or use one object on another, E.G. \"use tether on body\".",
};
var storyMsgs = [
	"Please enter your full name to begin.",
	"Welcome, [name]! We are excited to include you in our ever growing family.",
	"The room lights up as you enter, and the nine displays in the opposite wall come to life."
];
var inventory = {
	flashlight: true,
};

var consoleInput = document.getElementById( "console-input" );
var consoleDisplay = document.getElementById( "console-display" );
var consoleBack = document.getElementById( "console-back" );

consoleInput.value = "";

function handleInput()
{
	var userInputs = inputLog[ 0 ].trim().toLowerCase().split( " " );
	var command = userInputs[ 0 ];

	var param1 = "";
	for( var i = 1; i < userInputs.length; i++ )
	{
		param1 = param1 + userInputs[ i ] + " ";
	}
	param1 = param1.trim();

	if( command == "g" || command == "go" || command == "move" )
	{
		if( param1 == "" )
		{
			passMessage( specifyInput[ command ] );
		}
		else if( stationRoom[ param1 ] == player.room )
		{
			passMessage( "You are already in " + param1 + ". Specify where in the room you would like to go, or name another room." );
		}
		else if( checkAdjacent( stationRoom[ param1 ] ) )
		{
			if( stationRoom[ param1 ].isLocked )
			{
				passMessage( lockedRoom );
			}
			else
			{
				player.room = stationRoom[ param1 ];
				passMessage( player.room.descrip );
			}
		}
		else
		{
			passMessage( "You cannot reach " + toProper( param1 ) + " from here." );
		}
	}
	else if( command == "help" )
	{
		if( param1 == "" )
		{
			passMessage( possibleInputs );
		}
		else if( helpDescrips.hasOwnProperty( param1 ) )
		{
			passMessage( helpDescrips[ param1 ] );
		}
		else
		{
			passMessage( inputUnknown );
		}
	}
	else if( command == "listen" )
	{
		passMessage( player.room.sounds );
	}
	else if( command == "look" )
	{
		if( param1 == "" )
		{
			passMessage( player.room.descrip );
		}
		else
		{
			passMessage( inputUnknown );
		}
	}
	else if( command == "map" )
	{
		if( param1 == "" )
		{
			drawPicture( "map" + player.level );
		}
		else if( player.level == 22 )
		{
			if( param1 == 1 )
			{
				passMessage( mapError );
			}
			else if( param1 == 2 )
			{
				drawPicture( "map22" );
			}
		}
		else if( param1 > 0 && param1 < 3 )
		{
			drawPicture( "map" + param1 );
		}
		else
		{
			passMessage( mapError );
		}
	}
	else if( command == "style" )
	{
		if( param1 == "" )
		{
			passMessage( specifyInput.style );
		}
		else if( consoleStyles.hasOwnProperty( param1 ) )
		{
			changeStyle( consoleStyles[ param1 ] );
		}
		else
		{
			passMessage( inputUnknown );
		}
	}
	else
	{
		passMessage( inputUnknown );
	}
}

function changeStyle( style )
{
	for( var key in consoleStyles )
	{
		if( consoleDisplay.className.includes( consoleStyles[ key ] ) )
		{
			consoleDisplay.className = consoleDisplay.className.replace( consoleStyles[ key ], style );
			consoleInput.className = consoleInput.className.replace( consoleStyles[ key ], style );
			consoleBack.className = consoleBack.className.replace( consoleStyles[ key ], style );
		}
	}
}

function drawPicture( name )
{
	for( var i = 0; i < 15; i++ )
	{
		consoleDisplay.childNodes[ i ].innerHTML = picture[ name ][ i ];
	}
}

function clearPicture()
{
	for( var i = 14; i >= 0; i-- )
	{
		consoleDisplay.childNodes[ i ].innerHTML = " ";
	}
}

function passMessage( stringIn )
{
	var msgWords = stringIn.split( " " );
	var splitMsg = [ ": " + msgWords[ 0 ] ];
	var currentIndex = 0;
	for( var i = 1; i < msgWords.length; i++ )
	{
		if( ( splitMsg[ currentIndex ] + " " + msgWords[ i ] ).length < 68 )
		{
			splitMsg[ currentIndex ] += " " + msgWords[ i ];
		}
		else
		{
			currentIndex += 1;
			splitMsg[ currentIndex ] = msgWords[ i ];
		}
	}
	for( var y = 0; y < splitMsg.length; y++ )
	{
		for( var x = 0; x < 14; x++ )
		{
			msgLog[ x ] = msgLog[ x + 1 ];
		}
		msgLog[ 14 ] = splitMsg[ y ];
	}
	for( var i = 0; i <= 14; i++ )
	{
		consoleDisplay.childNodes[ i ].innerHTML = msgLog[ i ];
	}
}

function drawDisplay()
{
	for( var i = 14; i >= 0; i-- )
	{
		consoleDisplay.childNodes[ i ].innerHTML = msgLog[ i ];
	}
}

consoleInput.addEventListener( "keypress", function( event )
		{
			if( event.defaultPrevented )
			{
			}
			else
			{
				switch( event.key )
				{
					case "Enter": 
						inputLog.unshift( consoleInput.value );
						consoleInput.value = "";
						lastInputIndex = 0;
						if( storyStage == "title" )
						{
							clearPicture()
							storyStage = "name entry";
							passMessage( storyMsgs[ 0 ] );
						}
						else if( storyStage == "name entry" )
						{
							storyStage = "game";
							storePlayerName( inputLog[ 0 ] );
							storyMsgs[ 1 ] = storyMsgs[ 1 ].replace( "[name]", playerName[ playerName.length - 1 ] );
							passMessage( storyMsgs[ 1 ] );
						}
						else
						{
							handleInput();
						}
					break;
					case "ArrowUp":
						consoleInput.value = inputLog[ lastInputIndex ];
						if( lastInputIndex < inputLog.length - 1 )
						{
							lastInputIndex += 1;
						}
					break;
					case "ArrowDown":
						consoleInput.value = inputLog[ lastInputIndex ];
						if( lastInputIndex > 0 )
						{
							lastInputIndex -= 1;
						}
					break;
					case "Escape":
						consoleInput.value = "";
					break;
				}
			}
		});
