var CHEMICAL_ELEMENTS = {
	0: { name: "empty", symbol: "_", block: "empty-block", descrip: "" },
	1: { name: "Hydrogen", symbol: "H", block: "h-block", descrip: "Named after the Greek for water, from which it was first synthesized. The starting fuel in stars. The outermost layer of most stars is made of burning hydrogen." },
	2: { name: "Helium", symbol: "He", block: "he-block", descrip: "First observed in the sun, named after the Greek god of the sun, Helios." },
	3: { name: "Lithium", symbol: "Li", block: "li-block", descrip: "Named after the Greek for 'stone'." },
	4: { name: "Beryllium", symbol: "Be", block: "be-block", descrip: "" },
	5: { name: "Boron", symbol: "B", block: "b-block", descrip: "" },
	6: { name: "Carbon", symbol: "C", block: "c-block", descrip: "Typically manifests in coal, graphite, and diamond." },
	7: { name: "Nitrogen", symbol: "N", block: "n-block", descrip: "Makes up the largest percent of air at the Earth's surface." },
	8: { name: "Oxygen", symbol: "O", block: "o-block", descrip: "Makes up the second largest percent of air at the Earth's surface. Named after the Greek root for 'sour' or 'sharp', because the scientist who identified it believed Oxygen to be the key component of all acids." },
	9: { name: "Fluorine", symbol: "F", block: "f-block", descrip: "Named after the word 'flow'." },
	10: { name: "Neon", symbol: "Ne", block: "ne-block", descrip: "Named after the Latin word for 'new'." },
	11: { name: "Sodium", symbol: "Na", block: "na-block", descrip: "Commonly found in table salt, in the compound Sodium Chloride ( NaCl )" },
	12: { name: "Magnesium", symbol: "Mg", block: "mg-block", descrip: "" },
	13: { name: "Aluminum", symbol: "Al", block: "al-block", descrip: "Named for the salt from which it was derived: Alum. Once a very precious metal, so much so that the Washington Monument was originally capped with Aluminum." },
	14: { name: "Silicon", symbol: "Si", block: "si-block", descrip: "Common component in electronics, as its chemical properties are ideal for creating microscopic transistors." },
	15: { name: "Phosphorus", symbol: "P", block: "p-block", descrip: "" },
	16: { name: "Sulfur", symbol: "S", block: "s-block", descrip: "Known as 'brimstone' in ancient times. A key component in gunpowder." },
	17: { name: "Chlorine", symbol: "Cl", block: "cl-block", descrip: "" },
	18: { name: "Argon", symbol: "Ar", block: "ar-block", descrip: "" },
	19: { name: "Potassium", symbol: "K", block: "k-block", descrip: "Commonly found in bananas and potatoes." },
	20: { name: "Calcium", symbol: "Ca", block: "ca-block", descrip: "Typically found in limestone, from which it gets its name." },
	21: { name: "Scandium", symbol: "Sc", block: "sc-block", descrip: "Named after the country of Scandinavia." },
	22: { name: "Titanium", symbol: "Ti", block: "ti-block", descrip: "" },
	23: { name: "Vanadium", symbol: "V", block: "v-block", descrip: "" },
	24: { name: "Chromium", symbol: "Cr", block: "cr-block", descrip: "" },
	25: { name: "Manganese", symbol: "Mn", block: "mn-block", descrip: "Named for its magnetic properties." },
	26: { name: "Iron", symbol: "Fe", block: "fe-block", descrip: "" },
	27: { name: "Cobalt", symbol: "Co", block: "co-block", descrip: "" },
	28: { name: "Nickel", symbol: "Ni", block: "ni-block", descrip: "" },
	29: { name: "Copper", symbol: "Cu", block: "cu-block", descrip: "It's chemical symbol derives from the Latin 'Cuprus'." },
	30: { name: "Zinc", symbol: "Zn", block: "zn-block", descrip: "" },
	31: { name: "Gallium", symbol: "Ga", block: "ga-block", descrip: "Named after the ancient Celtic peoples who inhabited what is now France, Gaul." },
	32: { name: "Germanium", symbol: "Ge", block: "ge-block", descrip: "Named after the country of Germany." },
	33: { name: "Arsenic", symbol: "As", block: "as-block", descrip: "Deadly poison to humans, named for its yellow color." },
	34: { name: "Selenium", symbol: "Se", block: "se-block", descrip: "" },
	35: { name: "Bromine", symbol: "Br", block: "br-block", descrip: "Named after the Greek for '' ( bad smell )." },
	36: { name: "Krypton", symbol: "Kr", block: "kr-block", descrip: "Named after the Greek for 'hidden'." },
	37: { name: "Rubidium", symbol: "Rb", block: "rb-block", descrip: "Named for it's 'ruby red' color." },
	38: { name: "Strontium", symbol: "Sr", block: "sr-block", descrip: "" },
	39: { name: "Yttrium", symbol: "Y", block: "y-block", descrip: "Named after the village of Ytterby." },
	40: { name: "Zirconium", symbol: "Zr", block: "zr-block", descrip: "" },
	41: { name: "Niobium", symbol: "Nb", block: "nb-block", descrip: "Named after the city of Niobe." },
	42: { name: "Molybdenum", symbol: "Mo", block: "mo-block", descrip: "Also known as 'fool's lead'." },
	43: { name: "Technitium", symbol: "Tc", block: "tc-block", descrip: "" },
	44: { name: "Ruthenium", symbol: "Ru", block: "ru-block", descrip: "" },
	45: { name: "Rhodium", symbol: "Rh", block: "rh-block", descrip: "Named for its pink color." },
	46: { name: "Palladium", symbol: "Pd", block: "pd-block", descrip: "" },
	47: { name: "Silver", symbol: "Ag", block: "ag-block", descrip: "Its chemical symbol derives from the Latin 'argent'." },
	48: { name: "Cadmium", symbol: "Cd", block: "cd-block", descrip: "" },
	49: { name: "Indium", symbol: "In", block: "in-block", descrip: "Named after the country of India." },
	50: { name: "Tin", symbol: "Sn", block: "sn-block", descrip: "" },
	51: { name: "Antimony", symbol: "Sb", block: "sb-block", descrip: "Known during the Medieval Era to be the death of many monks who did not take enough care while gardening." },
	52: { name: "Tellurium", symbol: "Te", block: "te-block", descrip: "" },
	53: { name: "Iodine", symbol: "I", block: "i-block", descrip: "Named for its dark purple color." },
	54: { name: "Xenon", symbol: "Xe", block: "xe-block", descrip: "" },
	55: { name: "Cesium", symbol: "Cs", block: "cs-block", descrip: "Named for its sky blue color." },
	56: { name: "Barium", symbol: "Ba", block: "ba-block", descrip: "Named after the word for 'heavy'." },
	57: { name: "Lanthanum", symbol: "La", block: "la-block", descrip: "" },
	58: { name: "Cerium", symbol: "Ce", block: "ce-block", descrip: "Named after the word for 'farm'." },
	59: { name: "Praseodymium", symbol: "Pr", block: "pr-block", descrip: "" },
	60: { name: "Neodymium", symbol: "Nd", block: "nd-block", descrip: "" },
	61: { name: "Promethium", symbol: "Pm", block: "pm-block", descrip: "Named after the tragic Greek hero Prometheus." },
	62: { name: "Samarium", symbol: "Sm", block: "sm-block", descrip: "" },
	63: { name: "Europium", symbol: "Eu", block: "eu-block", descrip: "Named after the continent of Europe." },
	64: { name: "Gadolinium", symbol: "Gd", block: "gd-block", descrip: "" },
	65: { name: "Terbium", symbol: "Tb", block: "tb-block", descrip: "Named after the village of Ytterby." },
	66: { name: "Dysprosium", symbol: "Dy", block: "dy-block", descrip: "Named for being difficult to acquire." },
	67: { name: "Holmium", symbol: "Ho", block: "ho-block", descrip: "Named after the city of Stockholm, Sweden." },
	68: { name: "Erbium", symbol: "Er", block: "er-block", descrip: "Named after the village of Ytterby." },
	69: { name: "Thulium", symbol: "Tm", block: "tm-block", descrip: "Named after the country of Iceland." },
	70: { name: "Ytterbium", symbol: "Yb", block: "yb-block", descrip: "Named after the village of Ytterby." },
	71: { name: "Lutetium", symbol: "Lu", block: "lu-block", descrip: "Named after the original name of the city of Paris, Lutetia Parisii. 'Lutetia' may refer to the once swamp-like quality of the region." },
	72: { name: "Hafnum", symbol: "Hf", block: "hf-block", descrip: "Named after the city of Copenhagen, Switzerland." },
	73: { name: "Tantalum", symbol: "Ta", block: "ta-block", descrip: "Named for the mythical Greek Tantalus: a region deep beneath the surface of the Earth, where Zeus banished the titans." },
	74: { name: "Tungsten", symbol: "W", block: "w-block", descrip: "Also known as 'Wolfram', from which it derives its chemical symbol." },
	75: { name: "Rhenium", symbol: "Re", block: "re-block", descrip: "Named after the Rhine river." },
	76: { name: "Osmium", symbol: "Os", block: "os-block", descrip: "Named for its smell." },
	77: { name: "Iridium", symbol: "Ir", block: "ir-block", descrip: "" },
	78: { name: "Platinum", symbol: "Pt", block: "pt-block", descrip: "Named 'little silver'." },
	79: { name: "Gold", symbol: "Au", block: "au-block", descrip: "" },
	80: { name: "Mercury", symbol: "Hg", block: "hg-block", descrip: "Also known as 'quicksilver'. Its chemical symbol derives from ." },
	81: { name: "Thallium", symbol: "Tl", block: "tl-block", descrip: "" },
	82: { name: "Lead", symbol: "Pb", block: "pb-block", descrip: "" },
	83: { name: "Bismuth", symbol: "Bi", block: "bi-block", descrip: "" },
	84: { name: "Polonium", symbol: "Po", block: "po-block", descrip: "Discovered by Marie Curie, and named after her home country, Poland." },
	85: { name: "Astatine", symbol: "At", block: "at-block", descrip: "" },
	86: { name: "Radon", symbol: "Rn", block: "rn-block", descrip: "Named for its radioactive, 'glowing' properties." },
	87: { name: "Francium", symbol: "Fr", block: "fr-block", descrip: "Named for the country of France." },
	88: { name: "Radium", symbol: "Ra", block: "ra-block", descrip: "Named for its radioactive properties." },
	89: { name: "Actinium", symbol: "Ac", block: "ac-block", descrip: "" },
	90: { name: "Thorium", symbol: "Th", block: "th-block", descrip: "Named after the Norse god, Thor." },
	91: { name: "Proactinium", symbol: "Pa", block: "pa-block", descrip: "" },
	92: { name: "Uranium", symbol: "U", block: "u-block", descrip: "Named after the Roman god, Uranus, often equated to the Greek Ouranos." },
	93: { name: "Neptunium", symbol: "Np", block: "np-block", descrip: "Named after the Roman god, Neptune." },
	94: { name: "Plutonium", symbol: "Pu", block: "pu-block", descrip: "Named after the Roman god, Pluto." },
	95: { name: "Americanium", symbol: "Am", block: "am-block", descrip: "Named after the country of the United States of America." },
	96: { name: "Curium", symbol: "Cm", block: "cm-block", descrip: "Named after Marie Curie." },
	97: { name: "Berkelium", symbol: "Bk", block: "bk-block", descrip: "Named 'birch tree'." },
	98: { name: "Californium", symbol: "Cf", block: "cf-block", descrip: "Named after the US state, California." },
	99: { name: "Einsteinium", symbol: "Es", block: "es-block", descrip: "Named after the physicist, Albert Einstein." },
	100: { name: "Fermium", symbol: "Fm", block: "fm-block", descrip: "Named after the _, Enrico Fermi." },
	101: { name: "Mendelevium", symbol: "Md", block: "md-block", descrip: "Named after the chemist who devised what would become the modern periodic table of elements, Mendeleev." },
	102: { name: "Nobelium", symbol: "No", block: "no-block", descrip: "Named after the _, Nobel." },
	103: { name: "Lawrencium", symbol: "Lr", block: "lr-block", descrip: "Named after the _, Lawrence." },
	104: { name: "Rutherford", symbol: "Rf", block: "rf-block", descrip: "Named after the physicist, Ernst Rutherford." },
	105: { name: "Dubnium", symbol: "Db", block: "db-block", descrip: "" },
	106: { name: "Seaborgium", symbol: "Sg", block: "sg-block", descrip: "Named after the _, Seaborg." },
	107: { name: "Bohrium", symbol: "Bh", block: "bh-block", descrip: "Named after the physicist, Niels Bohr." },
	108: { name: "Hassium", symbol: "Hs", block: "hs-block", descrip: "" },
	109: { name: "Meitnerium", symbol: "Mt", block: "mt-block", descrip: "" },
	110: { name: "Darmstadtium", symbol: "Ds", block: "ds-block", descrip: "" },
	111: { name: "Roentgenium", symbol: "Rg", block: "rg-block", descrip: "" },
	112: { name: "Copernicium", symbol: "Cn", block: "cn-block", descrip: "Named after the philosopher, Copernicus." },
	113: { name: "Ununtrium", symbol: "Uut", block: "uut-block", descrip: "" },
	114: { name: "Flerovium", symbol: "Fl", block: "fl-block", descrip: "" },
	115: { name: "Ununpentium", symbol: "Uup", block: "uup-block", descrip: "" },
	116: { name: "Livermorium", symbol: "Lv", block: "lv-block", descrip: "" },
	117: { name: "Ununseptium", symbol: "Uus", block: "uus-block", descrip: "" },
	118: { name: "Ununoctium", symbol: "Uuo", block: "uuo-block", descrip: "" },
};
var elementLog = [];
var remainingElements = [];
for( var i = 1; i <= 118; i++ )
{
	remainingElements.push( i );
}

var gameOver = false;
var gameReset = true;
var gamePaused = false;

var resetMessage = "Press 'enter' or 'return' key to play again.";

function elementBlock( address, chemElement, x, y )
{
	this.address = address;
	this.name = chemElement;
	this.x = x;
	this.y = y;
}

var playerScoreDisplay = document.getElementById( "player-score" );
var playerScore = 0;
var hiScoreDisplay = document.getElementById( "hi-score" );
var hiScore = 0;

var gridElements = document.getElementById( "grid" ).getElementsByTagName( "section" );
var periodicTable = [ 0 ];
var periodicRows = document.getElementById( "periodic-table" ).getElementsByTagName( "section" );
for( var y = 0; y < 5; y++ )
{
	for( var x = 0; x < 18; x++ )
	{
		if( periodicRows[ y ].getElementsByTagName( "div" )[ x ].className != "empty-block debug" )
		{
			periodicTable.push( periodicRows[ y ].getElementsByTagName( "div" )[ x ] );
		}
		periodicRows[ y ].getElementsByTagName( "div" )[ x ].className = "empty-block debug";
	}
}
for( var y = 7; y < 9; y++ )
{
	for( var x = 0; x < 2; x++ )
	{
		periodicTable.push( periodicRows[ y - 2 ].getElementsByTagName( "div" )[ x ] );
		periodicRows[ y - 2 ].getElementsByTagName( "div" )[ x ].className = "empty-block debug";
	}
	for( var x = 2; x < 17; x++ )
	{
		periodicTable.push( periodicRows[ y ].getElementsByTagName( "div" )[ x ] );
		periodicRows[ y ].getElementsByTagName( "div" )[ x ].className = "empty-block debug";
	}
	for( var x = 3; x < 18; x++ )
	{
		periodicTable.push( periodicRows[ y - 2 ].getElementsByTagName( "div" )[ x ] );
		periodicRows[ y - 2 ].getElementsByTagName( "div" )[ x ].className = "empty-block debug";
	}
}
var nextBlockDisplay = document.getElementById( "preview-grid" ).getElementsByTagName( "article" );
var nextBlockDescrip = document.getElementById( "element-detail" );
var nextBlock = {
	element: 0,
	shape: null,
	display: "",
}

var blockGrid = [
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
	"0000000000",
];
for( var i = 0; i < blockGrid.length; i++ )
{
	blockGrid[ i ] = blockGrid[ i ].split( "" );
}

var previewGrid = [
	[ 0, 0, 0, 0 ],
	[ 0, 0, 0, 0 ],
	[ 0, 0, 0, 0 ],
	[ 0, 0, 0, 0 ]
];

var tetroidNames = [ "line", "tBlock", "box", "sBlock", "zBlock", "lBlock", "jBlock" ];
var tetroids = {
	line: [ "x",
		"x",
		"x",
		"x" ],

	tBlock: [ "xxx",
		  " x " ],

	box: [ "xx",
	       "xx" ],

	sBlock: [ "x ",
		  "xx",
		  " x" ],

	zBlock: [ " x",
		  "xx",
		  "x " ],

	lBlock: [ "xx",
		  " x",
		  " x" ],

	jBlock: [ "xx",
		  "x ",
		  "x " ]
}

var keyNames = {
	13: "enter",
	27: "escape",
	37: "left",
	38: "up",
	39: "right",
	40: "down"

};
function trackKeys( codes )
{
	var pressed = Object.create( null );
	function handler( event )
	{
		if( codes.hasOwnProperty( event.keyCode ) )
		{
			var down = event.type == "keydown";
			pressed[ codes[ event.keyCode ] ] = down;
			event.preventDefault();
		}
	}
	addEventListener( "keydown", handler );
	addEventListener( "keyup", handler );
	return pressed;
}
var userKeys = trackKeys( keyNames );

addEventListener( "keydown", function() {
	if( userKeys.enter )
	{
		if( gameReset == true )
		{
			runGame();
		}
	}
} );

var timer = 0;
var dropDelay = 1000;
var slideDelay = 200;

var dropTimeout = null;
var slideTimeout = null;

function drawGrid()
{
	if( !gamePaused )
	{
		var currentBlock = "";
		for( var y = 0; y < blockGrid.length; y++ )
		{
			var elementRow = gridElements[ y ].getElementsByTagName( "div" );
			for( var x = 0; x < blockGrid[ y ].length; x++ )
			{
				currentBlock = blockGrid[ y ][ x ];
				if( currentBlock == "0" )
				{
					elementRow[ x ].className = "empty-block debug";
				}
				else
				{
					elementRow[ x ].className = CHEMICAL_ELEMENTS[ currentBlock ].block +" debug";
				}
				elementRow[ x ].innerHTML = CHEMICAL_ELEMENTS[ currentBlock ].symbol;
			}
		}
		for( var y = 0; y < previewGrid.length; y++ )
		{
			var elementRow = nextBlockDisplay[ y ].getElementsByTagName( "div" );
			for( var x = 0; x < previewGrid[ y ].length; x++ )
			{
				currentBlock = previewGrid[ y ][ x ];
				if( currentBlock == "0" )
				{
					elementRow[ x ].className = "empty-block debug";
				}
				else
				{
					elementRow[ x ].className = CHEMICAL_ELEMENTS[ currentBlock ].block +" debug";
				}
				elementRow[ x ].innerHTML = CHEMICAL_ELEMENTS[ currentBlock ].symbol;
			}
		}
	}
	else if( gamePaused )
	{
		for( var y = 0; y < blockGrid.length; y++ )
		{
			var elementRow = gridElements[ y ].getElementsByTagName( "div" );
			for( var x = 0; x < blockGrid[ 0 ].length; x++ )
			{
				elementRow[ x ].className = "empty-block debug";
				elementRow[ x ].innerHTML = "_";
				if( y == 9 )
				{
					if( x == 2 )
					{
						elementRow[ x ].className = "p-block debug";
						elementRow[ x ].innerHTML = "P";
					}
					else if( x == 3 )
					{
						elementRow[ x ].className = "au-block debug";
						elementRow[ x ].innerHTML = "Au";
					}
					else if( x == 4 )
					{
						elementRow[ x ].className = "u-block debug";
						elementRow[ x ].innerHTML = "U";
					}
					else if( x == 5 )
					{
						elementRow[ x ].className = "s-block debug";
						elementRow[ x ].innerHTML = "S";
					}
					else if( x == 6 )
					{
						elementRow[ x ].className = "es-block debug";
						elementRow[ x ].innerHTML = "Es";
					}
					else if( x == 7 )
					{
						elementRow[ x ].className = "db-block debug";
						elementRow[ x ].innerHTML = "Db";
					}
				}
			}
		}
	}
}
function resetGrid( blockX, blockY, step, atomNum )
{
	var x = blockX;
	var y = blockY;
	var stepCount = step;
	previewGrid = [
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ]
	];

	if( stepCount >= 200 )
	{
		blockGrid[ y ][ x ] = atomNum;
	}
	else if( stepCount < 200 )
	{
		blockGrid[ y ][ x ] = 0;
	}
	if( x == 0 )
	{
		if( y > 0 )
		{
			y -= 1;
			x = 9;
		}
		else if( stepCount > 0 )
		{
			x = 9;
			y = 19;
		}
		else
		{
			gameReset = true;
			nextBlockDescrip.getElementsByTagName( "p" )[ 0 ].innerHTML = resetMessage;
			drawGrid();
			if( playerScore > hiScore )
			{
				hiScore = playerScore;
				hiScoreDisplay.innerHTML = hiScore;
			}
			return 0;
		}
	}
	else
	{
		x -= 1;
	}
	setTimeout( function() { resetGrid( x, y, stepCount - 1, atomNum ) }, 5 );
	drawGrid();
}

function handleInput()
{
	if( userKeys.down )
	{
		dropDelay = 50;
	}
	else
	{
		dropDelay = 400;
	}
}

function previewNextBlock()
{
	var height = nextBlock.shape.length;
	var width = nextBlock.shape[ 0 ].length;
	var descrip = nextBlockDescrip.getElementsByTagName( "p" )[ 0 ];
	previewGrid = [
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ]
	];
	for( var y = 0; y < height; y++ )
	{
		for( var x = 0; x < width; x++ )
		{
			if( nextBlock.shape[ y ][ x ] == "x" )
			{
				previewGrid[ y + Math.floor( ( 4 - height ) / 2 ) ][ x + Math.floor( ( 4 - width ) / 2 ) ] = nextBlock.element;
			}
		}
	}
	descrip.innerHTML = CHEMICAL_ELEMENTS[ nextBlock.element ].symbol + " " + CHEMICAL_ELEMENTS[ nextBlock.element ].name + ": " + CHEMICAL_ELEMENTS[ nextBlock.element ].descrip;
}

function collideCheck( blocksIn, dimension, direction )
{
	var blocks = blocksIn;
	if( dimension == "y" )
	{
		for( var i = 0; i < 4; i++ )
		{
			blocks[ i ].y += direction;
		}
		for( var i = 0; i < 4; i++ )
		{
			if( blocks[ i ].y > 19 || blockGrid[ blocks[ i ].y ][ blocks[ i ].x ] > 0 )
			{
				return "floor";
			}
		}
	}
	else if( dimension == "x" )
	{
		for( var i = 0; i < 4; i++ )
		{
			blocks[ i ].x += direction;
		}
		for( var i = 0; i < 4; i++ )
		{
			if( blocks[ i ].x < 0 || blocks[ i ].x > 9 )
			{
				return "wall";
			}
			else if( blockGrid[ blocks[ i ].y ][ blocks[ i ].x ] > 0 )
			{
				return "wall";
			}
		}
	}
	return "empty";
}

function updateScore( numRows )
{
	if( numRows == 0 )
	{
		playerScore = 0;
	}
	else
	{
		/*var rowScore = 2;
		for( var i = 1; i < numRows; i++ )
		{
			rowScore = rowScore * 2;
		}
		playerScore += rowScore / 2;*/
		playerScore += numRows * numRows;
	}
	playerScoreDisplay.innerHTML = playerScore;
}
function clearRows()
{
	var clearedRows = 0;
	for( var y = 0; y < blockGrid.length; y++ )
	{
		var isFilled = true;
		for( var x = 0; x < blockGrid[ y ].length; x++ )
		{
			if( blockGrid[ y ][ x ] == 0 )
			{
				isFilled = false;
			}
		}
		if( isFilled )
		{
			clearedRows += 1;
			for( var i = y; y > 0; y-- )
			{
				blockGrid[ y ] = blockGrid[ y - 1 ];
			}
		}
		blockGrid[ 0 ] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	}
	if( clearedRows > 0 )
	{
		updateScore( clearedRows );
	}
	drawGrid();
}
function slideBlock( blocksIn, atomNum, blockHeight )
{
	clearTimeout( slideTimeout );

	var blocks = blocksIn;
	var height = blockHeight;
	var elementNum = atomNum;
	var direction = 0;

	if( userKeys.up )
	{
		turnBlock( blocks, height, elementNum );
	}
	if( userKeys.left )
	{
		direction = -1;
	}
	else if( userKeys.right )
	{
		direction = 1;
	}
	else if( userKeys.escape )
	{
		gamePaused = !gamePaused;
		pauseGame( blocks, height, elementNum );
	}
	if( direction != 0 )
	{
		for( var i = 0; i < 4; i++ )
		{
			blockGrid[ blocks[ i ].y ][ blocks[ i ].x ] = 0;
		}
		if( collideCheck( blocks, "x", direction ) == "wall" )
		{
			for( var i = 0; i < 4; i++ )
			{
				blocks[ i ].x -= direction;
				blockGrid[ blocks[ i ].y ][ blocks[ i ].x ] = elementNum;
			}
		}
		else
		{
			for( var i = 0; i < 4; i++ )
			{
				blockGrid[ blocks[ i ].y ][ blocks[ i ].x ] = elementNum;
			}
		}
	}
	slideTimeout = setTimeout( function() { slideBlock( blocks, elementNum ) }, slideDelay );
	drawGrid();
}
function turnBlock( blocksIn, blockHeight, atomNum )
{
	var blocks = blocksIn;
	var collide = false;
	var height = blockHeight;
	var elementNum = atomNum;
	var modX = [ 0, 0, 0, 0 ];
	var modY = [ 0, 0, 0, 0 ];
	var shiftY = 0;
	var shiftX = 0;

	for( var i = 0; i < 4; i++ )
	{
		blockGrid[ blocks[ i ].y ][ blocks[ i ].x ] = 0;
	}
	for( var i = 0; i < 4; i++ )
	{
		modX[ i ] = blocks[ i ].y - blocks[ 1 ].y;
		modY[ i ] = ( blocks[ i ].x - blocks[ 1 ].x ) * -1;
		if( blocks[ 1 ].y + modY[ i ] > 19 || blocks[ 1 ].y + modY[ i ] < 0
			|| blocks[ 1 ].x + modX[ i ] < 0 || blocks[ 1 ].x + modX[ i ] > 9
			|| blockGrid[ blocks[ 1 ].y + modY[ i ] ][ blocks[ 1 ].x + modX[ i ] ] != 0 )
		{
			collide = true;
		}
	}
	if( collide == false )
	{
		for( var i = 0; i < 4; i++ )
		{
			blocks[ i ].x = blocks[ 1 ].x + modX[ i ];
			blocks[ i ].y = blocks[ 1 ].y + modY[ i ];
		}
	}
	for( var i = 0; i < 4; i++ )
	{
		blockGrid[ blocks[ i ].y ][ blocks[ i ].x ] = elementNum;
	}
	drawGrid();
}
function dropBlock( blocksIn, atomNum )
{
	clearTimeout( dropTimeout );

	var blocks = blocksIn;
	var elementNum = atomNum;
	handleInput();
	for( var i = 0; i < 4; i++ )
	{
		blockGrid[ blocks[ i ].y ][ blocks[ i ].x ] = 0;
	}
	if( collideCheck( blocks, "y", 1 ) == "floor" )
	{
		for( var i = 0; i < 4; i++ )
		{
			blocks[ i ].y -= 1;
			blockGrid[ blocks[ i ].y ][ blocks[ i ].x ] = elementNum;
			if( blocks[ i ].y <= 0 )
			{
				gameOver = true;
			}
		}
		clearTimeout( slideTimeout );
		clearRows();
		moveBlock( nextBlock.shape, nextBlock.element );
	}
	else
	{
		for( var i = 0; i < 4; i++ )
		{
			blockGrid[ blocks[ i ].y ][ blocks[ i ].x ] = elementNum;
		}
		dropTimeout = setTimeout( function() { dropBlock( blocks, elementNum ) }, dropDelay );
	}
	drawGrid();
}
// Sometimes nextBlock = 0; when we run out of elements, need to reset remainingElements;
function moveBlock( blockShape, atomNum )
{
	clearTimeout( slideTimeout );
	clearTimeout( dropTimeout );

	periodicTable[ elementLog[ 0 ] ].className = CHEMICAL_ELEMENTS[ elementLog[ 0 ] ].block + " debug";
	nextBlock.shape = tetroids[ tetroidNames[ Math.floor( Math.random() * 6 ) ] ];
	if( remainingElements.length == 0 )
	{
		for( var i = 1; i <= 118; i++ )
		{
			remainingElements.push( i );
		}
		elementLog = [];
	}
	var randIndex = Math.floor( Math.random() * remainingElements.length );
	elementLog.unshift( remainingElements[ randIndex ] );
	remainingElements.splice( randIndex, 1 );
	nextBlock.element = elementLog[ 0 ];
	previewNextBlock();

	var blocks = { 
		0: { x: 0, y: 0 },
		1: { x: 0, y: 0 },
		2: { x: 0, y: 0 },
		3: { x: 0, y: 0 }
	};
	var width = blockShape[ 0 ].length;
	var height = blockShape.length;
	var elementNum = atomNum;
	var iterate = 0;
	for( var y = 0; y < height; y++ )
	{
		for( var x = 0; x < width; x++ )
		{
			if( blockShape[ y ][ x ] == "x" )
			{
				blocks[ iterate ].x = x + 4;
				blocks[ iterate ].y = y;
				if( blockGrid[ blocks[ iterate ].y ][ blocks[ iterate ].x ] != 0 )
				{
					gameOver = true;
				}
				blockGrid[ blocks[ iterate ].y ][ blocks[ iterate ].x ] = elementNum;
				iterate += 1;
			}
		}
	}
	drawGrid();
	if( gameOver == false )
	{
		setTimeout( function() { slideBlock( blocks, elementNum, height ) }, slideDelay );
		setTimeout( function() { dropBlock( blocks, elementNum ) }, dropDelay );
	}
	else if( gameOver )
	{
		gameOver = false;
		resetGrid( 9, 19, 399, Math.ceil( Math.random() * 118 ) );
		return timer;
	}
}

function pauseGame( blocksIn, blockHeight, atomNum )
{
	var blocks = blocksIn;
	var height = blockHeight;
	var elementNum = atomNum;

	if( gamePaused )
	{
		clearTimeout( slideTimeout );
		clearTimeout( dropTimeout );
		drawGrid();
	}
	else if( !gamePaused )
	{
		slideTimeout = setTimeout( function() { slideBlock( blocks, elementNum, height ) }, slideDelay );
		dropTimeout = setTimeout( function() { dropBlock( blocks, elementNum ) }, dropDelay );
	}
}
function runGame()
{
	updateScore( 0 );
	gameReset = false;
	elementLog.unshift( Math.ceil( Math.random() * 118 ) );
	remainingElements.splice( elementLog[ 0 ], 1 );
	moveBlock( tetroids[ tetroidNames[ Math.floor( Math.random() * 6 ) ] ], elementLog[ 0 ] );
}