(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CONST = require("./constants.js");
var CHEMICAL_ELEMENTS = require("./chemical-elements.js");

var BrowserView = function(args) {
  var gridCanvas = document.querySelector('canvas#tetris-grid');
  var previewCanvas = document.querySelector('canvas#tetris-preview');
  var buttons = document.querySelectorAll("button.control-button");

  this.controlButtons = new Array;
  for(var i in buttons) {
    if(buttons.hasOwnProperty(i)) {
      this.controlButtons.push(buttons[i]);
    }
  }

  this.tableOverlay = document.querySelector('canvas#table-overlay');
  this.tableCanvas = document.querySelector('canvas#tetris-table');

  BLOCK_SPACING_HEIGHT = gridCanvas.getAttribute('height') / 20;
  BLOCK_SPACING_WIDTH = gridCanvas.getAttribute('width') / 10;
  BLOCK_HEIGHT = BLOCK_SPACING_HEIGHT - 10;
  BLOCK_WIDTH = BLOCK_SPACING_WIDTH - 10;

  this.elementDescrip = document.getElementById('element-description');
  this.elementName = document.getElementById('element-name');
  this.atomicNumDisplay = document.getElementById('atomic-number');
  this.elementLink = document.getElementById('element-link');

  this.staticPlayerScore = document.getElementById('player-score-static');
  this.staticHighScore = document.getElementById('high-score-static');
  this.staticGameLevel = document.getElementById('game-level-static');
  this.staticGameMode = document.getElementById('game-mode-static');

  this.playerScore = document.getElementById('player-score');
  this.highScore = document.getElementById('high-score');
  this.gameLevel = document.getElementById('game-level');
  this.gameLevel.innerHTML = CONST.genLevelMenu(0);

  this.gameModeContainer = document.getElementById('game-mode');
  this.gameModeContainer.innerHTML = CONST.genModeMenu(0);

  this.dirContainer = document.getElementById("directions-container");

  this.gridContext = gridCanvas.getContext('2d');
  this.previewContext = previewCanvas.getContext('2d');
  this.tableContext = this.tableCanvas.getContext('2d');
  this.overlayContext = this.tableOverlay.getContext('2d');

  this.overlayContext.fillStyle = 'rgba(255, 255, 255, 0.5)';

  this.isPaused = true;
  this.pressed = {
    slide: false,
    drop: false,
    rotate: false
  };
}
BrowserView.prototype.keyDown = function(event) {
  var pressedKey = event.keyCode ? CONST.KEY_CODES_TO_ACTIONS[event.keyCode] : event.target.dataset.key;
  if(this.isPaused) {
    if(pressedKey == 'space') {
      event.preventDefault();
      this.isPaused = false;
      return "unpause";
    }
  }
  else {
    if(pressedKey == 'left' || pressedKey == 'right') {
      event.preventDefault();
      if(this.pressed.slide == false) {
        this.pressed.slide = pressedKey;
        return pressedKey;
      }
    }
    else if(pressedKey == 'down') {
      event.preventDefault();
      if(this.pressed.drop == false) {
        this.pressed.drop = true;
        return pressedKey;
      }
    }
    else if(pressedKey == 'clock' || pressedKey == 'counter') {
      event.preventDefault();
      if(this.pressed.rotate == false) {
        this.pressed.rotate = pressedKey;
        return pressedKey;
      }
    }
    else if(pressedKey == 'space') {
      this.isPaused = true;
      event.preventDefault();
      return "pause";
    }
  }
};
BrowserView.prototype.keyUp = function(event){
  var releasedKey = event.keyCode ? CONST.KEY_CODES_TO_ACTIONS[event.keyCode] : event.target.dataset.key;
  if(this.isPaused === false) {
    if(releasedKey == 'left' || releasedKey == 'right') {
      event.preventDefault();
      this.pressed.slide = false;
    }
    if(releasedKey == 'down') {
      event.preventDefault();
      this.pressed.drop = false;
    }
    if(releasedKey == 'counter' || releasedKey == 'clock') {
      event.preventDefault();
      this.pressed.rotate = false;
    }
    return releasedKey;
  }
};
BrowserView.prototype.drawBoard = function(board, context) {
  var gridContext = this[context];
  var width = gridContext.canvas.width;
  var height = gridContext.canvas.height;
  gridContext.clearRect(0, 0, width, height);

  gridContext.lineWidth = 4;

  board.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      gridContext.fillStyle = CHEMICAL_ELEMENTS[col]['background-color'];
      gridContext.strokeStyle = CHEMICAL_ELEMENTS[col]['border-color'];

      var xPos = (cIndex * BLOCK_SPACING_WIDTH) + 5;
      var yPos = (rIndex * BLOCK_SPACING_HEIGHT) + 5;
      var textX = (cIndex * BLOCK_SPACING_WIDTH) + (BLOCK_SPACING_WIDTH / 2);
      var textY = (rIndex * BLOCK_SPACING_HEIGHT) + (BLOCK_SPACING_HEIGHT / 2) + 4;

      var textLen = CHEMICAL_ELEMENTS[col].symbol.length;
      if(textLen == 1) {
        gridContext.font = CONST.FONT_SIZE + CONST.BLOCK_FONT;
        textX -= 3;
      }
      else if(textLen == 2) {
        gridContext.font = CONST.FONT_SIZE + CONST.BLOCK_FONT;
        textX -= 7;
      }
      else if(textLen == 3) {
        gridContext.font = (CONST.FONT_SIZE - 2) + CONST.BLOCK_FONT;
        textX -= 7;
      }

      gridContext.fillRect(xPos, yPos, BLOCK_WIDTH, BLOCK_HEIGHT);
      gridContext.strokeRect(xPos, yPos, BLOCK_WIDTH, BLOCK_HEIGHT);
      gridContext.fillStyle = CHEMICAL_ELEMENTS[col]['color'];
      gridContext.fillText(CHEMICAL_ELEMENTS[col].symbol, textX, textY);
    });
  });
};
BrowserView.prototype.drawElementOverlay = function(mouseX, mouseY, element) {
  if(element > 0) {
    this.overlayContext.clearRect(0, 0, 540, 270);
    this.overlayContext.fillRect((mouseX * BLOCK_SPACING_WIDTH) + 5, (mouseY * BLOCK_SPACING_HEIGHT) + 5, BLOCK_WIDTH, BLOCK_HEIGHT);
  }
  else {
    this.overlayContext.clearRect(0, 0, 540, 270);
  }
};
BrowserView.prototype.showDirections = function() {
  this.dirContainer.style["display"] = "initial";
  this.dirContainer.className = "stretching-container";
};
BrowserView.prototype.fadeDirections = function() {
  this.dirContainer.className = "fading-container";
};
BrowserView.prototype.hideDirections = function() {
  this.dirContainer.style["display"] = "none";
};
BrowserView.prototype.updateDirectionsOverlay = function() {
  if(this.dirContainer.style["display"] != "none") {
    var dirTrans = document.getElementById("directions-transparent-layer");
    var directions = document.getElementById("directions");
    var main = document.querySelector("main");

    this.dirContainer.style["left"] = main.offsetLeft + "px";
    this.dirContainer.style["top"] = main.offsetTop + "px";
    this.dirContainer.style["height"] = main.offsetHeight + "px";
    this.dirContainer.style["width"] = main.offsetWidth + "px";

    directions.style["height"] = (main.offsetHeight - 32) + "px";
    directions.style["width"] = (main.offsetWidth - 64) + "px";

    dirTrans.style["height"] = main.offsetHeight + "px";
    dirTrans.style["width"] = main.offsetWidth + "px";
  }
};
BrowserView.prototype.updateElementDescrip = function(element) {
  this.elementName.innerHTML = CHEMICAL_ELEMENTS[element].name + ' [' + CHEMICAL_ELEMENTS[element].symbol + ']';
  this.atomicNumDisplay.innerHTML = element;
  this.elementDescrip.innerHTML = CHEMICAL_ELEMENTS[element].descrip;

  this.elementLink.href = CONST.CHEMISTRY_URL + CHEMICAL_ELEMENTS[element].name.toLowerCase();
  this.elementLink.innerHTML = 'Learn more about ' + CHEMICAL_ELEMENTS[element].name.toLowerCase();
};
BrowserView.prototype.updatePlayerScore = function(score) {
  this.playerScore.innerHTML = score;
};
BrowserView.prototype.updateGameLevel = function(level) {
  this.staticGameLevel.innerHTML = level + ": ";
};
BrowserView.prototype.getGameSettings = function() {
  var levelIndex = document.getElementById('game-level-dropdown').selectedIndex;
  var modeIndex = document.getElementById('game-mode-dropdown').selectedIndex;

  return {
    level: levelIndex,
    gameMode: CONST.GAME_MODES[modeIndex]
  }
};
BrowserView.prototype.disableMenus = function(level, gameMode) {
  this.staticGameMode.innerHTML = gameMode;
  this.staticGameLevel.innerHTML = level + ": ";

  this.gameLevel.style = 'display:none;';
  this.gameModeContainer.style = 'display:none;';
  this.staticGameLevel.style = 'display:initial;';
  this.staticGameMode.style = 'display:initial;';
};
BrowserView.prototype.resetDisplay = function(level, gameMode) {
  this.staticGameLevel.style = 'display:none;';
  this.staticGameMode.style = 'display:none;';

  this.gameModeContainer.style = 'display:initial;';
  this.gameModeContainer.innerHTML = CONST.genModeMenu(gameMode);
  this.gameLevel.style = 'display:initial;';
  this.gameLevel.innerHTML = CONST.genLevelMenu(level);
};
BrowserView.prototype.updateHighScore = function(score) {
  if(score == 0 || this.highScore.innerHTML < score) {
    this.highScore.innerHTML = score;
  }
};

module.exports = BrowserView;

},{"./chemical-elements.js":2,"./constants.js":3}],2:[function(require,module,exports){
module.exports = {
  0: {
    'name': 'n/a',
    'symbol': "",
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-color': 'rgba(0, 0, 0, 0.2)',
    'color': '#F1EEFA',
    'descrip': "n/a"
  },

  1: {
    'name': 'Hydrogen',
    'symbol': 'H',
    'background-color': '#DBC3DB',
    'border-color': '#A971A9',
    'color': 'black',
    'descrip': "The single most abundant element in the known universe. Named using the Greek word \"hydro,\" meaning \"water,\" because it makes up two parts of the water molecule."
  },

  2: {
    'name': 'Helium',
    'symbol': 'He',
    'background-color': '#EFE09F',
    'border-color': '#FF9830',
    'color': 'black',
    'descrip': "Named after the Greek god of the sun, \"Helios,\" because it's presence was discovered to be on the surface of the sun."
  },

  3: {
    'name': 'Lithium',
    'symbol': 'Li',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named after the Greek word \"lithos,\" meaning \"stone\". Often used in rechargeable batteries."
  },

  4: {
    'name': 'Beryllium',
    'symbol': 'Be',
    'background-color': '#DEDEDA',
    'border-color': '#50506A',
    'color': 'black',
    'descrip': "Named for the salt from which it was isolated: beryl. Typically used to create copper alloys for use in electrical wiring."
  },

  5: {
    'name': 'Boron',
    'symbol': 'B',
    'background-color': '#ACAFA0',
    'border-color': '#876750',
    'color': 'black',
    'descrip': "Named for the salt from which it was isolated: borax. Used to create green flares and in insulation fiberglass."
  },

  6: {
    'name': 'Carbon',
    'symbol': 'C',
    'background-color': '#625858',
    'border-color': '#121212',
    'color': 'black',
    'descrip': "Named after the Latin \"carbo,\" meaning \"charcoal.\" Typically manifests in coal, graphite, and diamond."
  },

  7: {
    'name': 'Nitrogen',
    'symbol': 'N',
    'background-color': '#FFF',
    'border-color': '#999',
    'color': 'black',
    'descrip': "Named after the Latin \"nitrum,\" a native soda. Makes up the largest percent of air at the Earth's surface."
  },

  8: {
    'name': 'Oxygen',
    'symbol': 'O',
    'background-color': '#C1C5DB',
    'border-color': '#9093A9',
    'color': 'black',
    'descrip': "Named after the Greek root for 'sour' or 'sharp', because the scientist who identified it believed Oxygen to be the key component of all acids. Makes up the second largest percent of air at the Earth's surface."
  },

  9: {
    'name': 'Fluorine',
    'symbol': 'F',
    'background-color': '#FFEF82',
    'border-color': '#B8B870',
    'color': 'black',
    'descrip': "Named for the French \"fluere,\" meaning \"flow\". Chlorine Trifluoride is one of the most dangerous, reactive chemicals in the world. It is known to burn concrete, melt sand, and explode on contact with water."
  },

  10: {
    'name': 'Neon',
    'symbol': 'Ne',
    'background-color': '#EFE09F',
    'border-color': '#EFB830',
    'color': 'black',
    'descrip': "Named after the Latin word for \"new\". Though often seen in neon signs, shows great potential as a refrigerant."
  },

  11: {
    'name': 'Sodium',
    'symbol': 'Na',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the word \"soda\" because it was first isolated from a sample of caustic soda. Commonly found in table salt, in the compound Sodium Chloride (NaCl)."
  },

  12: {
    'name': 'Magnesium',
    'symbol': 'Mg',
    'background-color': '#EFEFFF',
    'border-color': '#656478',
    'color': 'black',
    'descrip': "Named after the Magnesia district in Thessaly. Because it readily ignites in air, it is used in flash photography and pyrotechnics."
  },

  13: {
    'name': 'Aluminum',
    'symbol': 'Al',
    'background-color': '#E0E0F3',
    'border-color': '#656070',
    'color': 'black',
    'descrip': "Named for the salt from which it was derived, \"alum\". Once a very precious metal, so much so that the Washington Monument was originally capped with Aluminum."
  },

  14: {
    'name': 'Silicon',
    'symbol': 'Si',
    'background-color': '#DEDEDA',
    'border-color': '#50506A',
    'color': 'black',
    'descrip': "Named after the Latin \"silex,\" meaning \"flint\". Common component in electronics, as its chemical properties are ideal for creating microscopic transistors."
  },

  15: {
    'name': 'Phosphorus',
    'symbol': 'P',
    'background-color': '#F5D311',
    'border-color': '#877040',
    'color': 'black',
    'descrip': "Named after the Ancient Greek name for the planet Venus, meaning \"light-carrier.\" It is an essential component of cell structure."
  },

  16: {
    'name': 'Sulfur',
    'symbol': 'S',
    'background-color': '#F5D311',
    'border-color': '#877040',
    'color': 'black',
    'descrip': "Known as \"brimstone\" in ancient times. A key component in gunpowder, and an element essential for organic life."
  },

  17: {
    'name': 'Chlorine',
    'symbol': 'Cl',
    'background-color': '#EFDF82',
    'border-color': '#989840',
    'color': 'black',
    'descrip': "Named after the Greek \"chloro,\" meaning \"greenish yellow.\" It is used as a disinfectant and in water treatment plants to provide clean drinking water."
  },

  18: {
    'name': 'Argon',
    'symbol': 'Ar',
    'background-color': '#BBA3BB',
    'border-color': '#A971A9',
    'color': 'black',
    'descrip': "Named after the Greek \"argos,\" meaning \"inert.\" Used to fill incandescent and fluorescent light bulbs."
  },

  19: {
    'name': 'Potassium',
    'symbol': 'K',
    'background-color': '#FFDFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the English \"potash,\" meaning \"pot ash.\" Its symbol comes from the Latin \"kalium.\" Commonly found in bananas and potatoes."
  },

  20: {
    'name': 'Calcium',
    'symbol': 'Ca',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named after the Latin \"calx,\" meaning \"lime.\" It is typically found in limestone, and is the primary component of dental enamel."
  },

  21: {
    'name': 'Scandium',
    'symbol': 'Sc',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the country of Scandinavia. Once used in high-intensity lights, sometimes used to create certain aluminum alloys."
  },

  22: {
    'name': 'Titanium',
    'symbol': 'Ti',
    'background-color': '#E4E4DA',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Greek \"titans.\" Used as an alloy in aircraft, bicycle frames, and other lightweight, rigid structures. Titanium oxide is commonly used in house paint."
  },

  23: {
    'name': 'Vanadium',
    'symbol': 'V',
    'background-color': '#C1C5DB',
    'border-color': '#9093A9',
    'color': 'black',
    'descrip': "Named after the Scandinavian goddess of beauty, \"Vanadis.\" It is used to improve steel, and has been identified in the spectra of several stars and the sun."
  },

  24: {
    'name': 'Chromium',
    'symbol': 'Cr',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Greek \"chroma,\" meaning \"color,\" because its known compounds were many different colors. Responsible for the green color of emeralds."
  },

  25: {
    'name': 'Manganese',
    'symbol': 'Mn',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named after the Latin \"magnes,\" meaning \"magnet,\" for its magnetic properties. Responsible for the purple color of true amethyst."
  },

  26: {
    'name': 'Iron',
    'symbol': 'Fe',
    'background-color': '#E4E4DA',
    'border-color': '#BF9270',
    'color': 'black',
    'descrip': "It's English name may have been derived from words meaning \"holy metal\" because it was used to make swords for the Crusades. Its chemical symbol comes from the Latin word for Iron, \"ferrum.\""
  },

  27: {
    'name': 'Cobalt',
    'symbol': 'Co',
    'background-color': '#9EA3BB',
    'border-color': '#6871A9',
    'color': 'black',
    'descrip': "Named after the German \"kobold,\" meaning \"goblin.\" It is essential to vitamin-B12."
  },

  28: {
    'name': 'Nickel',
    'symbol': 'Ni',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named after the German \"kupfernickel,\" meaning \"Nick's copper\" (as in Saint Nicholas). An American nickel is 25% Nickel."
  },

  29: {
    'name': 'Copper',
    'symbol': 'Cu',
    'background-color': '#DFCE8F',
    'border-color': '#BF8230',
    'color': 'black',
    'descrip': "Named after the Latin \"cuprum,\" referring to the island of Cyprus. Typically used as wiring. Popular in ancient times for its malleability."
  },

  30: {
    'name': 'Zinc',
    'symbol': 'Zn',
    'background-color': '#C1C5DB',
    'border-color': '#9093A9',
    'color': 'black',
    'descrip': "Named after its German name, \"zink\". Used with copper to make brass in ancient times. An essential part of animal and plant diets."
  },

  31: {
    'name': 'Gallium',
    'symbol': 'Ga',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Latin \"Gallia,\" the ancient Celtic peoples who inhabited Gaul, now France. Used in the study of solar neutrinos."
  },

  32: {
    'name': 'Germanium',
    'symbol': 'Ge',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': 'Named after the Latin "Germania," meaning "Germany". Used in infrared spectroscopes and to detect gamma radiation.'
  },

  33: {
    'name': 'Arsenic',
    'symbol': 'As',
    'background-color': '#EFDF82',
    'border-color': '#989840',
    'color': 'black',
    'descrip': "Named after the Greek \"arsenikon,\" meaning \"yellow orpiment.\" Deadly poison to humans. Used as a laser material."
  },

  34: {
    'name': 'Selenium',
    'symbol': 'Se',
    'background-color': '#EF9F9F',
    'border-color': '#EF5C30',
    'color': 'black',
    'descrip': "Named after the Greek \"selene,\" meaning \"moon.\" Useful in photocells and transistors."
  },

  35: {
    'name': 'Bromine',
    'symbol': 'Br',
    'background-color': '#EF8F8F',
    'border-color': '#CF3C20',
    'color': 'black',
    'descrip': "Named after the Greek \"bromos,\" meaning \"stench.\" Gaseous Bromine is heavier than air; in an open container at room temperature the gas will pour out over the edges. Used as a flame retardant."
  },

  36: {
    'name': 'Krypton',
    'symbol': 'Kr',
    'background-color': '#FFDFEF',
    'border-color': '#9093A9',
    'color': 'black',
    'descrip': "Named after the Greek \"kryptos,\" meaning \"hidden.\" Used in fluorescent lightbulbs."
  },

  37: {
    'name': 'Rubidium',
    'symbol': 'Rb',
    'background-color': '#E4C4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named after the Latin \"rubidius,\" meaning \"deepest red,\" for it's ruby red color. Used in vacuum tubes and photocells."
  },

  38: {
    'name': 'Strontium',
    'symbol': 'Sr',
    'background-color': '#EFEFB2',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Scottish village of Strontian. Useful in pyrotechnics for its red flame. Used in nuclear fission power plants."
  },

  39: {
    'name': 'Yttrium',
    'symbol': 'Y',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Swedish village of Ytterby. Used as a red phosphor in television screens. Found in moon rocks."
  },

  40: {
    'name': 'Zirconium',
    'symbol': 'Zr',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Arabic \"zargun,\" meaning \"gold color.\" Used in the nuclear industry. Useful to protect against corrosion."
  },

  41: {
    'name': 'Niobium',
    'symbol': 'Nb',
    'background-color': '#C1C5DB',
    'border-color': '#707389',
    'color': 'black',
    'descrip': "Named after the Greek character \"Niobe,\" daughter of Tantalus, because of its close relation to Tantalum. Used in arc-welding rods and superconductive magnets."
  },

  42: {
    'name': 'Molybdenum',
    'symbol': 'Mo',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Greek \"molybdos,\" meaning \"lead.\" Also known as \"fool's lead\". Used as an alloying agent in steel."
  },

  43: {
    'name': 'Technetium',
    'symbol': 'Tc',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Greek \"technikos,\" meaning \"artificial.\" It's the first chemical element to be produced artificially."
  },

  44: {
    'name': 'Ruthenium',
    'symbol': 'Ru',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Latin \"Ruthenia,\" meaning \"Russia.\" Useful as a harder for palladium and platinum, and to prevent corrosion in titanium."
  },

  45: {
    'name': 'Rhodium',
    'symbol': 'Rh',
    'background-color': '#FFDFEF',
    'border-color': '#616063',
    'color': 'black',
    'descrip': "Named after the Greek \"rhodon,\" meaning \"rose\" or \"pink.\" Used in jewelery and catalytic converters."
  },

  46: {
    'name': 'Palladium',
    'symbol': 'Pd',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the asteroid \"Pallas,\" named for the Greek goddess of wisdom. Used in watches, surgical instruments, and to decolorize gold into white gold."
  },

  47: {
    'name': 'Silver',
    'symbol': 'Ag',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "The chemical symbol derives from the Latin \"argentum.\" Used in high capacity batteries, as a paint for printing circuits, and alloyed with copper as silverware."
  },

  48: {
    'name': 'Cadmium',
    'symbol': 'Cd',
    'background-color': '#C1C5DB',
    'border-color': '#707399',
    'color': 'black',
    'descrip': "Named after the Greek \"kadmeia,\" meaning \"calamine.\" Used as phosphors in television tubes, and in control rods of nuclear reactors."
  },

  49: {
    'name': 'Indium',
    'symbol': 'In',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after its indigo color. Useful as an alloying agent, and to make mirrors."
  },

  50: {
    'name': 'Tin',
    'symbol': 'Sn',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "The chemical symbol comes from the Latin word for tin, \"stannum.\" Used to create the copper alloy, bronze."
  },

  51: {
    'name': 'Antimony',
    'symbol': 'Sb',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Possibly named from the Greek \"anti\" and \"monos,\" meaning \"not alone.\" Known during the Medieval Era to be the death of many monks who did not take enough care while gardening."
  },

  52: {
    'name': 'Tellurium',
    'symbol': 'Te',
    'background-color': '#C7A770',
    'border-color': '#876730',
    'color': 'black',
    'descrip': "Named after the Latin \"tellus,\" meaning \"earth.\" Used in ceramics, semiconductors, and as an alloying agent."
  },

  53: {
    'name': 'Iodine',
    'symbol': 'I',
    'background-color': '#DF8F9F',
    'border-color': '#876730',
    'color': 'black',
    'descrip': "Named after the Greek \"iodes,\" meaning \"violet.\" Useful as a disinfectant, and is added to table salt for nutrition."
  },

  54: {
    'name': 'Xenon',
    'symbol': 'Xe',
    'background-color': '#EFDFEF',
    'border-color': '#9093A9',
    'color': 'black',
    'descrip': "Named after the Greek \"xenos,\" meaning \"stranger.\" Used in electron tubes."
  },

  55: {
    'name': 'Caesium',
    'symbol': 'Cs',
    'background-color': '#F5F391',
    'border-color': '#838260',
    'color': 'black',
    'descrip': "Also spelled \"Cesium,\" named after the Latin \"caesius,\" meaning \"sky blue.\" Used in atomic clocks, and has potential for use in ion propulsion."
  },

  56: {
    'name': 'Barium',
    'symbol': 'Ba',
    'background-color': '#EFEFB2',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Greek \"barys,\" meaning \"heavy.\" Used in making rubber and glass, and in x-ray diagnostics."
  },

  57: {
    'name': 'Lanthanum',
    'symbol': 'La',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Greek \"lanthanein,\" meaning \"to lie hidden.\" Used in film projection and to create cast iron."
  },

  58: {
    'name': 'Cerium',
    'symbol': 'Ce',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the asteroid \"Ceres,\" the Greek goddess of agriculture. Used in \"self-cleaning\" ovens and as a glass polishing agent."
  },

  59: {
    'name': 'Praseodymium',
    'symbol': 'Pr',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Greek \"prasios didymos,\" meaning \"green twin.\" It naturally forms a green oxide unless exposed to air. Used in the film industry in carbon arc lights."
  },

  60: {
    'name': 'Neodymium',
    'symbol': 'Nd',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Greek \"neos didymos,\" meaning \"new twin.\" Used in very powerful permanent magnets."
  },

  61: {
    'name': 'Promethium',
    'symbol': 'Pm',
    'background-color': '#EFEFFF',
    'border-color': '#656478',
    'color': 'black',
    'descrip': "Named after the tragic Greek hero Prometheus. A radioactive element, Promethium salts glow blue or green in the dark."
  },

  62: {
    'name': 'Samarium',
    'symbol': 'Sm',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the mineral from which it was first isolated, \"samarskite.\" Used in electronics and to create lasers and masers."
  },

  63: {
    'name': 'Europium',
    'symbol': 'Eu',
    'background-color': '#EFEFB2',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the continent of Europe. Used in the red phosphor of television tubes."
  },

  64: {
    'name': 'Gadolinium',
    'symbol': 'Gd',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after a Finnish chemist, J. Gadolin. Used in making tv tubes, enhancing MRI images, and in compact disks."
  },

  65: {
    'name': 'Terbium',
    'symbol': 'Tb',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Swedish village of Ytterby. Useful as a laser material and as a phosphor in tv tubes."
  },

  66: {
    'name': 'Dysprosium',
    'symbol': 'Dy',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Greek \"dysprositos,\" meaning \"difficult to acquire.\" Used to make laser materials and in compact disks."
  },

  67: {
    'name': 'Holmium',
    'symbol': 'Ho',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Greek for Sweden, \"Holmia.\" Used in metal alloys, and has an excellent potential for maintaining a magnetic field."
  },

  68: {
    'name': 'Erbium',
    'symbol': 'Er',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Swedish village of Ytterby. Used in the nuclear industry and as an alloying agent."
  },

  69: {
    'name': 'Thulium',
    'symbol': 'Tm',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named after the ancient name for Scandinavia, \"Thule.\""
  },

  70: {
    'name': 'Ytterbium',
    'symbol': 'Yb',
    'background-color': '#EFEFB2',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Swedish village of Ytterby."
  },

  71: {
    'name': 'Lutetium',
    'symbol': 'Lu',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Roman name for the city of Paris, \"Lutetia Parisiorum.\""
  },

  72: {
    'name': 'Hafnium',
    'symbol': 'Hf',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named after the Latin name for the city of Copenhagen, \"Hafnia.\" Used in nuclear reactor control rods."
  },

  73: {
    'name': 'Tantalum',
    'symbol': 'Ta',
    'background-color': '#C1C5DB',
    'border-color': '#707389',
    'color': 'black',
    'descrip': "Named after the mythical Greek Tantalus, son of Zeus who was banished to Tartarus. Useful for strengthening steel."
  },

  74: {
    'name': 'Tungsten',
    'symbol': 'W',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Swedish \"tung sten,\" meaning \"heavy stone.\" Also known as \"Wolfram,\" from which it derives its chemical symbol."
  },

  75: {
    'name': 'Rhenium',
    'symbol': 'Re',
    'background-color': '#DEDEDA',
    'border-color': '#50506A',
    'color': 'black',
    'descrip': "Named after Greek name for the Rhine river, \"Rhenus.\" Useful as an alloying agent and in superconductors."
  },

  76: {
    'name': 'Osmium',
    'symbol': 'Os',
    'background-color': '#DEDEDA',
    'border-color': '#50508A',
    'color': 'black',
    'descrip': "Named after the Greek \"osme,\" meaning \"smell.\" Used to make fountain pen tips, electrical contacts, and in alloys for implants such as pacemakers."
  },

  77: {
    'name': 'Iridium',
    'symbol': 'Ir',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Greek \"iris,\" meaning \"rainbow.\" Used to make the standard metre bar in Paris."
  },

  78: {
    'name': 'Platinum',
    'symbol': 'Pt',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Spanish \"platina,\" meaning \"little silver.\" Used in jewelery, dentistry, and catalytic converters."
  },

  79: {
    'name': 'Gold',
    'symbol': 'Au',
    'background-color': '#EFEF62',
    'border-color': '#A89840',
    'color': 'black',
    'descrip': "Its chemical symbol comes from the Latin word for gold, \"aurum.\" The most malleable and ductile known metal, it doesn't tarnish in air."
  },

  80: {
    'name': 'Mercury',
    'symbol': 'Hg',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Also known as \"quicksilver,\" its chemical symbol derives from the Latin \"hydrargyrum,\" meaning \"liquid silver.\" Mercury vapor is toxic, and no longer used in thermometers."
  },

  81: {
    'name': 'Thallium',
    'symbol': 'Tl',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Greek \"thallos,\" meaning \"green twig.\" Once used as rodenticide."
  },

  82: {
    'name': 'Lead',
    'symbol': 'Pb',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the Latin for lead, \"plumbum.\" Though highly toxic, its sweet taste made it a favorite sweetener of the Romans."
  },

  83: {
    'name': 'Bismuth',
    'symbol': 'Bi',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Its name is of uncertain origin. Used in fire detection and extinguishing systems."
  },

  84: {
    'name': 'Polonium',
    'symbol': 'Po',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Discovered by Marie Curie, and named after her home country, Poland. Used to remove static charge in textile mills, and as thermoelectric power in man-made satellites."
  },

  85: {
    'name': 'Astatine',
    'symbol': 'At',
    'background-color': '#CDCDC0',
    'border-color': '#9D9D90',
    'color': 'black',
    'descrip': "Named after the Greek \"astatos,\" meaning \"unstable.\" All of its known isotopes are radioactive."
  },

  86: {
    'name': 'Radon',
    'symbol': 'Rn',
    'background-color': '#FFF',
    'border-color': '#999',
    'color': 'black',
    'descrip': "Named for its radioactive, \"glowing\" properties. Used in earthquake prediction and radiation therapy."
  },

  87: {
    'name': 'Francium',
    'symbol': 'Fr',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the country of France. Found in uranium minerals, it can be isolated by bombarding it with Thorium."
  },

  88: {
    'name': 'Radium',
    'symbol': 'Ra',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Latin \"radius,\" meaning \"ray,\" because of its radioactive properties. It can emit alpha, beta, and gamma rays."
  },

  89: {
    'name': 'Actinium',
    'symbol': 'Ac',
    'background-color': '#DEDEDD',
    'border-color': '#50508A',
    'color': 'black',
    'descrip': "Named after the Greek \"aktinos,\" meaning \"ray.\" Highly radioactive, it's often used in thermoelectric power and as a source of neutrons."
  },

  90: {
    'name': 'Thorium',
    'symbol': 'Th',
    'background-color': '#EFEFEF',
    'border-color': '#555',
    'color': 'black',
    'descrip': "Named after the Scandinavian god, Thor. Useful as a source of nuclear fission power."
  },

  91: {
    'name': 'Proactinium',
    'symbol': 'Pa',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Greek \"protos,\" meaning \"first.\" Acts as a superconductor at extremely low temperatures."
  },

  92: {
    'name': 'Uranium',
    'symbol': 'U',
    'background-color': '#EFEFEF',
    'border-color': '#555',
    'color': 'black',
    'descrip': "Named after the planet Uranus, often equated to the Greek Ouranos. Gives glass a distinct yellow green color and fluorescent glow. Useful as a fuel for nuclear fission."
  },

  93: {
    'name': 'Neptunium',
    'symbol': 'Np',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the planet Neptune, because it follows Uranium in the periodic table. Used in neutron detection instruments."
  },

  94: {
    'name': 'Plutonium',
    'symbol': 'Pu',
    'background-color': '#FAFAFA',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the planet Pluto, because it follows Neptunium in the periodic table. Used in pacemakers, and as a fuel for nuclear fission."
  },

  95: {
    'name': 'Americanium',
    'symbol': 'Am',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the country of the United States of America. Used in smoke detectors and as a source of gamma radiation."
  },

  96: {
    'name': 'Curium',
    'symbol': 'Cm',
    'background-color': '#FAFAFA',
    'border-color': '#A971A9',
    'color': 'black',
    'descrip': "Named after Marie Curie. Used as the power source in NASA's Mars rover."
  },

  97: {
    'name': 'Berkelium',
    'symbol': 'Bk',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the city of Berkeley, California."
  },

  98: {
    'name': 'Californium',
    'symbol': 'Cf',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the US state, California. Useful in moisture gauges and as a source of neutron radiation."
  },

  99: {
    'name': 'Einsteinium',
    'symbol': 'Es',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the physicist, Albert Einstein. A synthetic element, too little has been produced to have any practical uses."
  },

  100: {
    'name': 'Fermium',
    'symbol': 'Fm',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Italian physicist, Enrico Fermi. A synthetic element, too little has been produced to have any practical uses."
  },

  101: {
    'name': 'Mendelevium',
    'symbol': 'Md',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Russian chemist who devised what would become the modern periodic table of elements, Dmitri Mendeleev. A synthetic element, too little has been produced to have any practical uses."
  },

  102: {
    'name': 'Nobelium',
    'symbol': 'No',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Swedish chemist, Alfred Nobel. A synthetic element, too little has been produced to have any practical uses."
  },

  103: {
    'name': 'Lawrencium',
    'symbol': 'Lr',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after Ernest Lawrence, inventor of the cyclotron. A synthetic element, too little has been produced to have any practical uses."
  },

  104: {
    'name': 'Rutherfordium',
    'symbol': 'Rf',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the New Zealand chemist and physicist, Ernst Rutherford. A synthetic element, too little has been produced to have any practical uses."
  },

  105: {
    'name': 'Dubnium',
    'symbol': 'Db',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Joint Nuclear Institute at Dubna. A synthetic element, too little has been produced to have any practical uses."
  },

  106: {
    'name': 'Seaborgium',
    'symbol': 'Sg',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the American nuclear chemist, Glenn T. Seaborg. A synthetic element, too little has been produced to have any practical uses."
  },

  107: {
    'name': 'Bohrium',
    'symbol': 'Bh',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Danish physicist, Niels Bohr. A synthetic element, too little has been produced to have any practical uses."
  },

  108: {
    'name': 'Hassium',
    'symbol': 'Hs',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Latin for the German state, \"Hassias.\" A synthetic element, too little has been produced to have any practical uses."
  },

  109: {
    'name': 'Meitnerium',
    'symbol': 'Mt',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Austrian physicist, Lise Meitner. A synthetic element, too little has been produced to have any practical uses."
  },

  110: {
    'name': 'Darmstadtium',
    'symbol': 'Ds',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after its place of discovery, Darmstadt, Germany. A synthetic element, too little has been produced to have any practical uses."
  },

  111: {
    'name': 'Roentgenium',
    'symbol': 'Rg',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Its proposed name comes from Wilhelm Conrad Roentgen, who discovered x-rays in 1895. A synthetic element, too little has been produced to have any practical uses."
  },

  112: {
    'name': 'Copernicium',
    'symbol': 'Cn',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Its proposed name comes from the Renaissance mathematician and astronomer, Nicolaus Copernicus. A synthetic element, too little has been produced to have any practical uses."
  },

  113: {
    'name': 'Ununtrium',
    'symbol': 'Uut',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "No name has yet been proposed for this element as its discovery has not been officially confirmed."
  },

  114: {
    'name': 'Flerovium',
    'symbol': 'Fl',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Flerov Laboratory of Nuclear Reactions. A synthetic element, too little has been produced to have any practical uses."
  },

  115: {
    'name': 'Ununpentium',
    'symbol': 'Uup',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "No name has yet been proposed for this element as its discovery has not been officially confirmed."
  },

  116: {
    'name': 'Livermorium',
    'symbol': 'Lv',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Lawrence Livermore National Laboratory. A synthetic element, too little has been produced to have any practical uses."
  },

  117: {
    'name': 'Ununseptium',
    'symbol': 'Uus',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "No name has yet been proposed for this element as its discovery has not been officially confirmed."
  },

  118: {
    'name': 'Ununoctium',
    'symbol': 'Uuo',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "No name has yet been proposed for this element as its discovery has not been officially confirmed."
  },
};

},{}],3:[function(require,module,exports){
var CHEMICAL_ELEMENTS = require("./chemical-elements.js");

var CONST = {};
CONST.CHEMISTRY_URL = "http://www.webelements.com/";
CONST.FONT_SIZE = 11;
CONST.BLOCK_FONT = "px monospace";

// Delay values in milliseconds
CONST.FAST_DROP = 50;
CONST.SLIDE_DELAY = 100;
CONST.ROTATE_DELAY = 200;
CONST.CLEAR_DELAY = 1;
CONST.DROP_DELAY = {
  0: 900,
  1: 848,
  2: 797,
  3: 747,
  4: 698,
  5: 650,
  6: 603,
  7: 557,
  8: 512,
  9: 468,
  10: 425,
  11: 383,
  12: 342,
  13: 302,
  14: 263,
  15: 225,
  16: 188,
  17: 152,
  18: 117,
  19: 83,
  20: 50
}
CONST.GAME_MODES = {
  0: 'Marathon',
  1: 'Fixed Level',
  2: 'Pentathlon'
}
var REPEAT_TETROMINO_LIMIT = 4;

CONST.GRID_HEIGHT = 20;
CONST.GRID_WIDTH = 10;

CONST.BLOCK_WIDTH;
CONST.BLOCK_HEIGHT;
CONST.BLOCK_SPACING_WIDTH;
CONST.BLOCK_SPACING_HEIGHT;

var TETROMINO_TEMPLATES = {
  jBlock: [
    'xxx',
    '  x'],
  lBlock: [
    'xxx',
    'x  '],
  square: [
    'xx',
    'xx'],
  sBlock: [
    ' xx',
    'xx'],
  zBlock: [
    'xx ',
    ' xx'],
  line:   [
    'xxxx'],
  tBlock: [
    'xxx',
    ' x ']
};
var PENTOMINO_TEMPLATES = {
  wBlock: [
    'xx ',
    ' xx',
    '  x'],
  lowT: [
    ' x ',
    'xx ',
    ' xx'],
  kBlock: [
    ' x ',
    ' xx',
    'xx '],
  cross: [
    ' x ',
    'xxx',
    ' x '],
  uBlock: [
    'xx',
    'x ',
    'xx'],
  pBlock: [
    'xx',
    'xx',
    'x '],
  qBlock: [
    'xx',
    'xx',
    ' x'],
  capT: [
    'x  ',
    'xxx',
    'x'],
  corner: [
    'xxx',
    'x  ',
    'x  '],
  sBlock: [
    ' xxx',
    'xx'],
  zBlock: [
    'xxx ',
    '  xx'],
  leftT: [
    'xxxx',
    ' x  '],
  rightT: [
    'xxxx',
    '  x '],
  lBlock: [
    'xx',
    ' x',
    ' x',
    ' x'],
  jBlock: [
    'xx',
    'x ',
    'x ',
    'x '],
  line: [
    'xxxxx']
}

var processTetrominos = function(templates) {
  var tetrominoShape = new Array;
  var index = 0;
  for(var shape in templates) {
    if(templates.hasOwnProperty(shape)) {
      tetrominoShape.push(new Array);
      var currentShape = templates[shape];
      for(var row in currentShape) {
        for(var col in currentShape[row]) {
          if(currentShape[row][col] == 'x') {
            tetrominoShape[index].push({x: parseInt(col, 10),
                                    y: parseInt(row, 10)});
          }
        }
      }
    }
    index++;
  }
  return tetrominoShape
}
var TETROMINO_SHAPES = {
  'Marathon': processTetrominos(TETROMINO_TEMPLATES),
  'Fixed Level': processTetrominos(TETROMINO_TEMPLATES),
  'Pentathlon': processTetrominos(PENTOMINO_TEMPLATES)
};

CONST.KEY_CODES_TO_ACTIONS = {
  32: 'space',
  37: 'left',
  39: 'right',
  40: 'down',
  88: 'counter',
  90: 'clock'
}

CONST.PERIODIC_TABLE = [
  [1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2],
  [3,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  6,  7,  8,  9,  10],
  [11, 12, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
  [55, 56, 0, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
  [87, 88, 0, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
  [0,  0,  57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 0],
  [0,  0,  89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 0]
];

CONST.generateRandomElements = function() {
  var randElements = new Array;
  var orderedElements = new Array;

  for(var prop in CHEMICAL_ELEMENTS) {
    if(CHEMICAL_ELEMENTS.hasOwnProperty(prop)) {
      if(prop != 0) orderedElements.push(prop);
    }
  }

  var length = new Number(orderedElements.length);

  for(var i = 0; i < length; i++) {
    var randIndex = Math.floor(Math.random() * orderedElements.length);
    randElements.push(orderedElements[randIndex]);
    orderedElements.splice(randIndex, 1);
  }

  return randElements;
}
CONST.getRandomShape = function(gameMode, limiter) {
  var length = TETROMINO_SHAPES[gameMode].length;
  var shapes = new Object;
  TETROMINO_SHAPES[gameMode].forEach(function(shape, index) {
    if(limiter.shapeIndex == index && limiter.count == REPEAT_TETROMINO_LIMIT) {
      limiter.shapeIndex = null;
      limiter.count = 0;
    }
    else {
      shapes[index] = shape;
    }
  });

  var randNum = Math.floor(Math.random() * length);

  if(shapes[randNum] === undefined) {
    randNum += randNum > (length / 2) ? -1 : 1;
  }

  if(limiter.shapeIndex == randNum) {
    limiter.count++;
  }
  else {
    limiter.shapeIndex = randNum;
    limiter.count = 1;
  }

  return shapes[randNum];
}

CONST.generateEmptyBoard = function() {
  emptyBoard = new Array;
  for(var y = 0; y < 4; y++) {
    var row = new Array;
    for(var x = 0; x < 4; x++) {
      row.push(0);
    }
    emptyBoard.push(row);
  }
  return emptyBoard;
}
CONST.genModeMenu = function(mode) {
  var menuString = '<select id="game-mode-dropdown">';
  for(var prop in CONST.GAME_MODES) {
    if(CONST.GAME_MODES.hasOwnProperty(prop)) {
      menuString += '<option';
      if(CONST.GAME_MODES[prop] == mode) {
        menuString += ' selected';
      }
      menuString += '>' + CONST.GAME_MODES[prop] + '</option>';
    }
  }
  menuString += '</select>';
  return menuString;
}
CONST.genLevelMenu = function(level_num) {
  var menuString = '<select id="game-level-dropdown">';
  for(var i = 0; i <= 20; i++) {
    menuString += '<option';
    if(i == level_num) {
      menuString += ' selected';
    }
    menuString += '>' + i + '</option>';
  }
  menuString += '</select>';
  return menuString;
}

module.exports = CONST;

},{"./chemical-elements.js":2}],4:[function(require,module,exports){
var CONST = require("./constants.js");

var Tetromino = require("./tetromino.js")
var PreviewBoard = require("./preview-board.js");
var PeriodicTable = require("./periodic-table.js");
var TetrisBoard = require("./tetris-board.js");
var BrowserView = require("./browser-view.js");

var Controller = function(shape) {
  this.level = 0;
  this.gameMode = "Marathon";
  this.elements = CONST.generateRandomElements();
  this.limiter = {
    shapeIndex: null,
    count: 0
  }

  this.previewBoard = new PreviewBoard();
  this.tableBoard = new PeriodicTable();
  this.gameBoard = new TetrisBoard({
    createNextTetromino: this.createNextTetromino.bind(this),
    showGameOver: this.showGameOver.bind(this)
  });

  this.gameView = new BrowserView({
    gameBoard: this.gameBoard,
    cycleDropBlock: this.cycleDropBlock,
  });
  this.highScore = this.loadHighScore();

  this.gameView.drawBoard(this.gameBoard.board, "gridContext");
  this.gameView.drawBoard(this.previewBoard.board, "previewContext");
  this.gameView.drawBoard(this.tableBoard.board, "tableContext");
  this.gameBoard.gameState = 'gameover';

  this.gameView.tableOverlay.addEventListener('mousedown', function(event) {
    var mouseX = Math.floor((event.layerX - this.gameView.tableOverlay.offsetLeft) / (540 / 18));
    var mouseY = Math.floor((event.layerY - this.gameView.tableOverlay.offsetTop) / (270 / 9));
    var element = 0

    if(mouseX >= 0 && mouseY >= 0) {
      element = this.tableBoard.board[mouseY][mouseX];
    }

    if(element > 0) {
      this.gameView.updateElementDescrip(element);
    }
  }.bind(this));
  this.gameView.tableOverlay.addEventListener('mousemove', function(event) {
    var mouseX = Math.floor((event.layerX - this.gameView.tableOverlay.offsetLeft) / (540 / 18));
    var mouseY = Math.floor((event.layerY - this.gameView.tableOverlay.offsetTop) / (270 / 9));
    var element = 0;

    if(mouseX >= 0 && mouseY >= 0) {
      element = this.tableBoard.board[mouseY][mouseX];
    }
    this.gameView.drawElementOverlay(mouseX, mouseY, element);
  }.bind(this));

  addEventListener('keydown', function(event) {
    if(this.gameBoard.gameState == 'gameover') {
      var keyPressed = CONST.KEY_CODES_TO_ACTIONS[event.keyCode];
      if(keyPressed == 'space') {
        event.preventDefault();
        this.startGame();
      }
    }
  }.bind(this));
  addEventListener('mousedown', function(event) {
    if(event.target.nodeName == 'BUTTON' && this.gameBoard.gameState == 'gameover') {
      var buttonPressed = event.target.dataset.key;
      if(buttonPressed == 'space') {
        this.startGame();
      }
    }
  }.bind(this));

  document.getElementById('reset-high-score').addEventListener("click", function(event) {
    event.preventDefault();
    this.resetHighScore();
  }.bind(this));

  addEventListener('keydown', this.handleKeyDown.bind(this));
  addEventListener('keyup', this.handleKeyUp.bind(this));
  this.gameView.controlButtons.forEach(function(button) {
    button.addEventListener("mousedown", this.handleKeyDown.bind(this));
    button.addEventListener("mouseup", this.handleKeyUp.bind(this));
  }.bind(this));

  document.getElementById("show-directions").addEventListener("click", function(event) {
    event.preventDefault();
    this.gameView.isPaused = true;
    clearInterval(this.gameBoard.dropInterval);
    clearInterval(this.gameBoard.rotateInterval);
    clearInterval(this.gameBoard.slideInterval);

    this.gameView.updateDirectionsOverlay();
    this.gameView.showDirections();
  }.bind(this));

  document.getElementById("hide-directions").addEventListener("click", function(event) {
    event.preventDefault();
    this.gameView.fadeDirections();
  }.bind(this));

  addEventListener("animationend", function(event) {
    if(event.animationName == "fade") {
      this.gameView.hideDirections();
      this.gameView.isPaused = false;
      this.cycleDropBlock(CONST.DROP_DELAY[this.level]);
    }
  }.bind(this));

  window.addEventListener("resize", function(event) {
    this.gameView.updateDirectionsOverlay();
  }.bind(this));
}
Controller.prototype.saveHighScore = function() {
  window.localStorage.setItem("highScore", this.highScore);
};
Controller.prototype.loadHighScore = function() {
  var highScore = window.localStorage.getItem("highScore");
  if(highScore) {
    this.highScore = highScore;
  }
  else {
    this.highScore = 0;
  }
  this.gameView.updateHighScore(this.highScore);
};
Controller.prototype.resetHighScore = function() {
  this.highScore = 0;
  this.saveHighScore();
  this.gameView.updateHighScore(this.highScore);
};
Controller.prototype.startGame = function() {
  if(this.elements.length < 118) {
    this.elements = CONST.generateRandomElements();
  }
  var settings = this.gameView.getGameSettings();
  this.gameMode = settings.gameMode;
  if(this.gameMode == 'Fixed Level') {
    this.level = settings.level;
  }
  else {
    this.level = 0;
  }
  this.gameView.disableMenus(this.level, this.gameMode);

  if(this.gameBoard.tetromino) {
    this.gameBoard.tetromino.set({
      element: this.elements.pop(),
      shape: CONST.getRandomShape(this.gameMode, this.limiter)
    });
  }
  else {
    this.gameBoard.tetromino = new Tetromino({
      element: this.elements.pop(),
      shape: CONST.getRandomShape(this.gameMode, this.limiter)
    });
  }

  if(this.previewBoard.tetromino) {
    this.previewBoard.tetromino.set({
      element: this.elements.pop(),
      shape: CONST.getRandomShape(this.gameMode, this.limiter)
    });
  }
  else {
    this.previewBoard.tetromino = new Tetromino({
      element: this.elements.pop(),
      shape: CONST.getRandomShape(this.gameMode, this.limiter)
    });
  }

  this.gameBoard.score = 0;
  this.gameBoard.gameState = 'inProgress';

  var lastTime = null;
  var progress = true;

  var animate = function(time) {
    if(lastTime) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      progress = timeStep < 1000;
    }
    lastTime = time;

    if(progress) {
      this.gameView.drawBoard(this.gameBoard.board, "gridContext");
      this.gameView.drawBoard(this.previewBoard.board, "previewContext");
      this.gameView.drawBoard(this.tableBoard.board, "tableContext");
      this.gameView.updatePlayerScore(this.gameBoard.score);
      requestAnimationFrame(animate.bind(this));
    }
  }
  requestAnimationFrame(animate.bind(this));

  this.previewBoard.blit();
  this.tableBoard.showElement(this.gameBoard.tetromino.element);
  this.gameView.updateElementDescrip(this.previewBoard.tetromino.element);

  this.cycleDropBlock(CONST.DROP_DELAY[this.level]);
};
Controller.prototype.cycleDropBlock = function(dropDelay) {
  this.gameBoard.blit();
  if(this.gameBoard.dropInterval) {
    clearInterval(this.gameBoard.dropInterval);
  }
  this.gameBoard.dropInterval = setInterval(
    this.gameBoard.dropBlock.bind(this.gameBoard),
    dropDelay
  );
};
Controller.prototype.createNextTetromino = function() {
  this.gameBoard.tetromino.set({
    element: this.previewBoard.tetromino.element,
    shape: this.previewBoard.tetromino.shape
  });
  if(this.elements.length <= 0) {
    this.elements = CONST.generateRandomElements();
  }
  this.previewBoard.tetromino.set({
    element: this.elements.pop(),
    shape: CONST.getRandomShape(this.gameMode, this.limiter)
  })
  this.previewBoard.blit();
  this.tableBoard.showElement(this.gameBoard.tetromino.element);
  this.gameView.updateElementDescrip(this.previewBoard.tetromino.element);
  this.updateGameLevel();
};
Controller.prototype.handleKeyDown = function(event) {
  var action = this.gameView.keyDown.bind(this.gameView, event).call();
  if(action == "pause") {
    clearTimeout(this.gameBoard.dropInterval);
    clearInterval(this.gameBoard.rotateInterval);
    clearInterval(this.gameBoard.slideInterval);
  }
  else if(action == "unpause") {
    this.cycleDropBlock(CONST.DROP_DELAY[this.level]);
  }
  else if(action == "left" || action == "right") {
    clearInterval(this.gameBoard.slideInterval);
    this.gameBoard.slideBlock(this.gameView.pressed.slide);
    this.gameBoard.slideInterval = setInterval(this.gameBoard.slideBlock.bind(this.gameBoard, this.gameView.pressed.slide), CONST.SLIDE_DELAY);
  }
  else if(action == "clock" || action == "counter") {
    clearInterval(this.gameBoard.rotateInterval);
    this.gameBoard.rotateBlock(this.gameView.pressed.rotate);
    this.gameBoard.rotateInterval = setInterval(this.gameBoard.rotateBlock.bind(this.gameBoard, this.gameView.pressed.rotate), CONST.ROTATE_DELAY);
  }
  else if(action == "down") {
    clearInterval(this.gameBoard.dropInterval);
    this.cycleDropBlock(CONST.FAST_DROP);
  }
};
Controller.prototype.handleKeyUp = function(event) {
  var action = this.gameView.keyUp.bind(this.gameView, event).call();
  if(action == "left" || action == "right") {
    clearInterval(this.gameBoard.slideInterval);
  }
  else if(action == "counter" || action == "clock") {
    clearInterval(this.gameBoard.rotateInterval);
  }
  else if(action == "down") {
    clearInterval(this.gameBoard.dropInterval);
    this.cycleDropBlock(CONST.DROP_DELAY[this.level]);
  }
};
Controller.prototype.updateGameLevel = function() {
  this.level = Math.floor(this.gameBoard.score / 10);
  this.gameView.updateGameLevel(this.level);
};
Controller.prototype.showGameOver = function() {
  this.gameBoard.tetromino = null;
  this.previewBoard.tetromino = null;

  this.gameView.isPaused = true;
  this.previewBoard.board = CONST.generateEmptyBoard();
  this.gameBoard.clearForGameover();
  this.gameView.resetDisplay(this.level, this.gameMode);
  this.saveHighScore();
  this.gameView.updateHighScore(this.gameBoard.score);
};

module.exports = Controller;

},{"./browser-view.js":1,"./constants.js":3,"./periodic-table.js":5,"./preview-board.js":6,"./tetris-board.js":7,"./tetromino.js":9}],5:[function(require,module,exports){
var CONST = require("./constants.js");

var PeriodicTable = function() {
  this.board = new Array;

  this.elements = new Object;
  for(var row = 0; row < 9; row++) {
    var tableRow = new Array;
    for(var col = 0; col < 18; col++) {
      if(CONST.PERIODIC_TABLE[row][col] != 0) {
        this.elements[CONST.PERIODIC_TABLE[row][col]] = {
          x: col,
          y: row,
          show: false
        }
      }
      tableRow.push(0);
    }
    this.board.push(tableRow);
  }
}
PeriodicTable.prototype.showElement = function(atomicNum) {
  this.elements[atomicNum].show = true;
  this.board[this.elements[atomicNum].y][this.elements[atomicNum].x] = atomicNum;
}

module.exports = PeriodicTable;

},{"./constants.js":3}],6:[function(require,module,exports){
var CONST = require("./constants.js");

var PreviewBoard = function() {
  this.board = CONST.generateEmptyBoard();
  this.tetromino = null;
}
PreviewBoard.prototype.blit = function() {
  this.board = CONST.generateEmptyBoard();

  var blockX, blockY;
  for(var block in this.tetromino.blocks) {
    blockX = this.tetromino.blocks[block].x - 4;
    blockY = this.tetromino.blocks[block].y;
    this.board[blockY][blockX] = this.tetromino.element;
  }
};

module.exports = PreviewBoard;

},{"./constants.js":3}],7:[function(require,module,exports){
var CONST = require("./constants.js");

var Tetromino = require("./tetromino.js");

var TetrisBoard = function(args) {
  this.score = 0;
  this.board = new Array;
  this.randElements = CONST.generateRandomElements();
  this.tetromino = args.tetromino || null;
  this.createNextTetromino = args.createNextTetromino;
  this.showGameOver = args.showGameOver;
  this.gameState = 'gameover';

  this.dropInterval = new Number;

  for(var row = 0; row < 20; row++) {
    this.board[row] = new Array;
    for(var col = 0; col < 10; col++) {
      this.board[row][col] = 0;
    }
  };
}
TetrisBoard.prototype.blit = function(clear) {
  var element = this.tetromino.element;

  if(clear) {
    element = 0;
  }

  for(var block in this.tetromino.blocks) {
    var currentBlock = this.tetromino.blocks[block];
    this.board[currentBlock.y][currentBlock.x] = element;
  }
};
TetrisBoard.prototype.detectCollision = function() {
  for(var block in this.tetromino.blocks) {
    currentBlock = this.tetromino.blocks[block];
    if(currentBlock.y >= CONST.GRID_HEIGHT) {
      return 'floor';
    }
    else if(currentBlock.y < 0) {
      return 'ceiling';
    }
    else if(currentBlock.x < 0 || currentBlock.x >= CONST.GRID_WIDTH) {
      return 'wall';
    }
    else if(this.board[currentBlock.y][currentBlock.x] !== 0) {
      return 'block';
    }
  }
  return 'clear';
};
TetrisBoard.prototype.dropBlock = function() {
  this.blit(true);
  this.tetromino.drop();
  var collision = this.detectCollision();
  if(collision == 'floor' || collision == 'block') {
    this.tetromino.raise();
    this.blit();
    this.createNextTetromino();
    if(this.detectCollision() != 'clear') {
      clearInterval(this.dropInterval);
      this.blit();
      this.showGameOver();
      return;
    }
    this.handleFullLines();
  }
  this.blit();
};
TetrisBoard.prototype.slideBlock = function(direction) {
  this.blit(true);
  this.tetromino.slide(direction);
  var collision = this.detectCollision();
  if(collision == 'wall' || collision == 'block') {
    var reverseDirection = direction == 'left' ? 'right' : 'left';
    this.tetromino.slide(reverseDirection);
  }
  this.blit();
};
TetrisBoard.prototype.rotateBlock = function(direction) {
  this.blit(true);
  this.tetromino.rotate(direction);
  var collision = this.detectCollision();
  if(collision != 'clear') {
    var reverseDirection = direction == 'clock' ? 'counter' : 'clock';
    this.tetromino.rotate(reverseDirection);
  }
  this.blit();
};
TetrisBoard.prototype.handleFullLines = function() {
  var lines = 0;
  this.board.forEach(function(row, rIndex, board) {
    var filled = true;
    row.forEach(function(block) {
      if(block == 0) filled = false;
    });
    if(filled) {
      lines++;
      for(var i = rIndex; i > 0; i--) {
        board[i] = board[i - 1].map(function(col) {
          return col;
        });
      }
      board[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  });
  if(lines > 0) this.score += Math.pow(2, lines) / 2;
};
TetrisBoard.prototype.clearForGameover = function() {
  var randElement = Math.ceil(Math.random() * 118);
  var boardCoords = {x: 0, y: 0};

  var clearBoard = function(boardCoords) {
    if(boardCoords.y < 20) {
      this.board[boardCoords.y][boardCoords.x] = randElement;
      if(boardCoords.x >= 9) {
        boardCoords.y++;
        boardCoords.x = 0;
      }
      else {
        boardCoords.x++;
      }
      setTimeout(clearBoard.bind(this, boardCoords), CONST.CLEAR_DELAY);
    }
    else if(randElement > 0) {
      randElement = 0;
      boardCoords = {x: 0, y:0};
      setTimeout(clearBoard.bind(this, boardCoords), CONST.CLEAR_DELAY);
    }
    else {
      this.gameState = 'gameover';
    }
  }.bind(this);

  clearBoard(boardCoords);
};

module.exports = TetrisBoard;

},{"./constants.js":3,"./tetromino.js":9}],8:[function(require,module,exports){
var Controller = require("./controller.js");

var ready = function(fn) {
  if(document.readyState != 'loading') {
    fn();
  }
  else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(function() {
  var removeExcessSpaces = function(selector) {
    var htmlString = document.querySelector(selector).innerHTML;
  	htmlString = htmlString.replace(/\s+</g, '<');
  	htmlString = htmlString.replace(/>\s+/g, '>');
    htmlString = htmlString.replace(/_/g, ' ');
    document.querySelector(selector).innerHTML = htmlString;
  }
  removeExcessSpaces('main');

  new Controller();
});

},{"./controller.js":4}],9:[function(require,module,exports){
var Tetromino = function(args) {
  this.element;
  this.blocks;
  this.shape;

  this.set(args);
}
Tetromino.prototype.set = function(args) {
  this.element = args.element;
  this.shape = args.shape;

  this.blocks = this.shape.map(function(block) {
    return {x: new Number(block.x), y: new Number(block.y)};
  });

  this.row = 0;
  this.col = 4;

  for(var block in this.blocks) {
    this.blocks[block].y += this.row;
    this.blocks[block].x += this.col;
  }

  var width = 0;
  var height = 0;
  this.shape.forEach(function(block) {
    if(block.x > width) width = block.x;
    if(block.y > height) height = block.y;
  });

  this.center = {
    x: Math.floor(width / 2) + this.col,
    y: Math.floor(height / 2) + this.row
  }
};
Tetromino.prototype.raise = function() {
  this.row--;
  for(var block in this.blocks) {
    this.blocks[block].y--;
  }
  this.center.y--;
};
Tetromino.prototype.drop = function() {
  this.row++;
  for(var block in this.blocks) {
    this.blocks[block].y++;
  }
  this.center.y++;
};
var directToInt = {
  'left': -1,
  'right': 1
};
Tetromino.prototype.slide = function(direction) {
  this.blocks.forEach(function(block) {
    block.x += directToInt[direction];
  });
  this.center.x += directToInt[direction];
};
Tetromino.prototype.rotate = function(direction) {
  var modX, modY;
  var center = this.center;

  this.blocks.forEach(function(block) {
    modX = block.y - center.y;
    modY = block.x - center.x;
    if(direction == 'counter') {
      if(modY !== 0) modY *= -1;
    }
    else {
      if(modX !== 0) modX *= -1;
    }

    block.x = center.x + modX;
    block.y = center.y + modY;
  });
};

module.exports = Tetromino;

},{}]},{},[8]);
