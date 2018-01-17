// function() {
const CANVAS_W = 800;
const CANVAS_H = 450;

const UI_WIDTH = 96;
const LEVEL_W = CANVAS_W - UI_WIDTH;
const MAX_SCORE = 99999;

const TAU = 2 * Math.PI;
const UPDATE_RATE = 15;

const RESPAWN_DELAY = 1200 / UPDATE_RATE;
const RECOVER_DELAY = 1800 / UPDATE_RATE;
const MAX_SPEED = 6;
// Render points relative to the ship's center
const PLAYER_POINTS = [
  { x:  16, y:  0 },
  { x: -12, y: -9 },
  { x:  -8, y:  0 },
  { x: -12, y:  9 }
];

const THRUST_POINTS = [
  { x: -12, y:  0 },
  { x: -14, y: -7 },
  { x: -28, y: -4 },
  { x: -22, y:  0 },
  { x: -26, y:  4 },
  { x: -14, y:  7 },
];

const MAX_MISSILES = 3;
const FIRE_DELAY = 30;
const MISSILE_SPEED = 8;
const MISSILE_SIZE = 4;
const MISSILE_LIFE = 60;

// Big asteroids split into two small ones; therefore the maximum number of asteroids on screen at once must be twice the number of maximum big asteroids
const MAX_BIG_ASTEROIDS = 4;
const MAX_ASTEROIDS = 2 * MAX_BIG_ASTEROIDS;
const ASTEROID_SPEED = 1;
const ASTEROID_SIZE = 16;
// Render points relative to center
const ASTEROID_POINTS = [
  { x:  6, y:-16 },
  { x: 16, y: -6 },
  { x: 16, y:  6 },
  { x:  6, y: 18 },
  { x:  2, y: 14 },
  { x: -6, y: 16 },
  { x:-16, y:  6 },
  { x:-14, y: -6 },
  { x: -8, y:-12 },
  { x: -6, y:-16 },
];

const EXPLOSION_LIFE = 200 / UPDATE_RATE;
const MAX_EXPLOSIONS = MAX_ASTEROIDS + MAX_MISSILES + 1;

// Render points for ASTEROIDS title
const TITLE_POINTS = [[192,257,208,193,224,257,208,241,192,257],[272,193,240,209,272,241,240,257],[320,193,288,193,304,225,304,257],[368,257,336,257,352,225,336,225,336,193,368,193],[384,257,384,193,416,209,384,225,416,257],[448,193,432,225,448,257,464,225,448,193],[496,193,496,257],[528,193,560,225,528,257,528,193],[608,193,576,209,608,241,576,257]];
const SCORE_POINTS = [[4,-8,-4,-8,-4,0,4,0,4,8,-4,8],[4,-8,-4,-8,-4,8,4,8],[-4,-8,-4,8,4,8,4,-8,-4,-8],[-4,8,-4,-8,4,-8,4,0,-4,0,4,8],[4,-8,-4,-8,-4,0,0,0,-4,0,-4,8,4,8]];
const HIGH_POINTS = [[-4,-8,-4,8,-4,0,4,0,4,-8,4,0,4,8],[4,-8,-4,-8,0,-8,0,8,4,8,-4,8],[4,-8,-4,-8,-4,8,4,8,4,0,0,0],[-4,-8,-4,8,-4,0,4,0,4,-8,4,0,4,8]];
const GAMEOVER_POINTS = [[232,193,216,225,232,257,248,225,232,225],[264,257,280,193,296,257,280,241,264,257],[312,257,312,193,328,225,344,193,344,257],[392,193,360,193,376,225,360,257,392,257],[424,193,408,225,424,257,440,225,424,193],[456,193,472,257,488,193],[536,193,504,193,520,225,504,257,536,257],[552,257,552,193,584,209,552,225,584,257]];

const KEY_MAP = {
  'ArrowUp'     : 'up',
  'ArrowLeft'   : 'left',
  'ArrowRight'  : 'right',
  ' '           : 'fire'
};

var context = document.getElementById('canvas').getContext('2d');
/*
Scenes:
0 : Title
1 : Game
*/
var scene = 0;
var gameover = false;
var score = 0;

var highscore = window.localStorage.getItem('asteroidsjs-highscore');
if (! highscore) {
  highscore = 0;
}

function saveScore() {
  window.localStorage.setItem('asteroidsjs-highscore', highscore);
}

var player = {
  x: CANVAS_W / 2, y: CANVAS_H / 2,
  xSpeed: 0, ySpeed: 0, thrust: false,
  radians: 0, radAcc: 0, fireDelay: 0,
  state: 'alive', countdown: 0, lives: 3
};
function resetPlayer(fullReset) {
  if (fullReset) {
    player.lives = 3;
  }
  else {
    player.lives--;
  }
  player.x = CANVAS_W / 2;
  player.y = CANVAS_H / 2;
  player.xSpeed = 0;
  player.ySpeed = 0;
  player.radians = 0;
  player.state = 'recover';
  player.countdown = RECOVER_DELAY;
}

var explosions = new Array(MAX_EXPLOSIONS);
var Explosion = function(x, y) {
  this.x = x;
  this.y = y;

  this.life = EXPLOSION_LIFE;

  return this;
}
function spawnExplosion(x, y) {
  for (var i = 0; i < MAX_EXPLOSIONS; i++) {
    if (!explosions[i]) {
      explosions[i] = new Explosion(x, y);
      return;
    }
  }
}

var missileCount = 0;
var missiles = new Array(MAX_MISSILES);
var Missile = function() {
  // Use player's direction to set missile speed; I like to add the player's speed so it doesn't look weird to fire a missile when the player is already moving
  this.xSpeed = player.xSpeed + MISSILE_SPEED * Math.cos(player.radians);
  this.ySpeed = player.ySpeed + MISSILE_SPEED * Math.sin(player.radians);
  this.x = player.x + this.xSpeed;
  this.y = player.y + this.ySpeed;

  // We count down the missile's life every frame so that it doesn't go on forever
  this.life = MISSILE_LIFE;

  return this;
}
function renderMissile(missile) {
  context.fillStyle = '#FFF';
  context.fillRect(missile.x - MISSILE_SIZE / 2, missile.y - MISSILE_SIZE / 2, MISSILE_SIZE, MISSILE_SIZE);
}

var asteroidCount = 0;
var asteroids = new Array(MAX_ASTEROIDS);
// I use this function syntax to better indicate that this is a class constructor
var Asteroid = function(isSmall, astX, astY, xSpeed, ySpeed) {
  // Get a random radian value for rendering
  this.radians = Math.random() * TAU;

  if (isSmall) {
    this.size = 1;
    this.x = astX;
    this.y = astY;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }
  else {
    // New big asteroid
    this.size = 2;
    var x, y;
    // Gets a random number along the perimeter of the canvas
    var perimeter = 2 * CANVAS_H + 2 * LEVEL_W;
    var perimeterPoint = Math.random() * perimeter;

    if (perimeterPoint <= CANVAS_W) {
      // This point is along the top edge of the canvas
      x = perimeterPoint;
      y = 0;
    }
    else if (perimeterPoint <= LEVEL_W + CANVAS_H) {
      // This point is along the right edge of the canvas
      x = LEVEL_W;
      y = perimeterPoint - LEVEL_W;
    }
    else if (perimeterPoint <= 2 * LEVEL_W + CANVAS_H) {
      // This point is along the bottom edge of the canvas
      x = perimeterPoint - (LEVEL_W + CANVAS_H);
      y = CANVAS_H;
    }
    else {
      // This point is along the left edge of the canvas
      x = 0;
      y = perimeterPoint - (2 * LEVEL_W + CANVAS_H);
    }

    this.x = x;
    this.y = y;
    // Pick a random direction for the asteroid to move
    // This way every asteroid moves at the same speed
    var radians = Math.random() * TAU;
    this.xSpeed = ASTEROID_SPEED * Math.cos(radians);
    this.ySpeed = ASTEROID_SPEED * Math.sin(radians);
  }

  // I think it's good practice to explicitly return the instance
  return this;
}
// We get the index so we can change the asteroids array in place
function breakAsteroid(index) {
  var ast = asteroids[index];
  asteroids[index] = null;
  if (ast.size === 1) {
    spawnExplosion(ast.x, ast.y);
    asteroidCount--;
  }
  else {
    // Big asteroids create two new small ones
    asteroidCount++;
    // Generate random direction to move
    var radians = Math.random() * TAU;
    var xSpeed = Math.cos(radians);
    var ySpeed = Math.sin(radians);
    // Ensure the asteroids start far apart enough to not collide with each other
    var x = ASTEROID_SIZE * xSpeed;
    var y = ASTEROID_SIZE * ySpeed;
    // Create two new asteroids
    for (var i = 0; i < MAX_ASTEROIDS; i++) {
      if (i !== index && !asteroids[i]) {
        asteroids[i] = new Asteroid(true, ast.x + x, ast.y + y, xSpeed, ySpeed);
        break;
      }
    }
    // This astroid moves in the opposite direction
    asteroids[index] = new Asteroid(true, ast.x - x, ast.y - y, -xSpeed, -ySpeed);
  }
}

function handleInput(action, isActivated) {
  switch (action) {
    case 'left'   : player.radAcc += isActivated ? -1 :  1; break;
    case 'right'  : player.radAcc += isActivated ?  1 : -1; break;
    case 'up':
      if (scene === 1) {
        player.thrust = isActivated ? true : false;
      }
      break;
    case 'fire'   :
      if (scene === 1) {
        if (isActivated && player.state === 'alive' && player.fireDelay === 0 && missileCount < MAX_MISSILES) {
          missileCount++;
          for (var i = 0; i < MAX_MISSILES; i++) {
            if (!missiles[i]) {
              missiles[i] = new Missile();
              break;
            }
          }
          // Set the player's fire delay so the missiles don't come too quickly
          player.fireDelay = FIRE_DELAY;
        }
      }
      break;
  }

  if (scene === 0) {
    scene = 1;
  }
  else if (gameover) {
    // Reset game
    score = 0;
    gameover = false;
    resetPlayer(true);
  }
}

function handleKeydown(e) {
  // Extra step to check whether the canvas is visible
  var rect = context.canvas.getBoundingClientRect();

  // ctrlKey refers to control on Apple computers, ctrl on Windows
  // metaKey refers to command on Apple, the Windows key on Windows
  if (rect.top < window.innerHeight && !e.altKey && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
  }

  var key = KEY_MAP[e.key];
  if (!e.repeat && key) {
    handleInput(key, true);
  }
}
function handleKeyup(e) {
  var key = KEY_MAP[e.key];
  if (key) {
    handleInput(key);
  }
}
document.addEventListener('keydown', handleKeydown);
document.addEventListener('keyup', handleKeyup);
// Track whether the mouse button is down for mouseout events
var mouseDown = false;

function handleButtonInput(e) {
  // Prevents unwanted touch event behavior
  if (e.type === 'touchstart') {
    e.preventDefault();
  }
  e.stopPropagation();

  // Ensure the mouse or touch event came from a button, is not a right click, and that the button has an "action" data attribute
  if (e.target.tagName === 'BUTTON' && e.button !== 2 && e.target.dataset.action) {
    mouseDown = e.type === 'mousedown';
    var isActivated = mouseDown || e.type === 'touchstart';
    handleInput(e.target.dataset.action, isActivated);
  }
}
var buttonControls = document.getElementById('canvas-button-controls');

buttonControls.addEventListener('mousedown', handleButtonInput);
buttonControls.addEventListener('mouseup', handleButtonInput);
// buttonControls.addEventListener('mouseout', handleButtonInput);

function handleButtonMouseout(e) {
  // We only need to handleButtonInput if the mouse button was down when the mouse moved out
  if (e.target.tagName === 'BUTTON' && mouseDown) {
    mouseDown = false;
    handleButtonInput(e);
  }
}
buttonControls.addEventListener('mouseout', handleButtonMouseout);

buttonControls.addEventListener('touchstart', handleButtonInput);
buttonControls.addEventListener('touchend', handleButtonInput);

function preventEverything(e) {
  e.preventDefault();
  e.stopPropagation();
}
buttonControls.addEventListener('touchmove', preventEverything);

buttonControls = null;

// Get hypoteneuse of a right triangle given the two shorter sides
function getHypoteneuse(x, y) {
  return Math.sqrt(x * x + y * y);
}

// Get the distance between two actors
function getDistance(a, b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

// Restrict a value to a specified range
function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}

function updateActor(mod, actor) {
  actor.x += mod * actor.xSpeed;
  actor.y += mod * actor.ySpeed;

  // If the actor passes an edge of the canvas, move it to the opposite edge
  if (actor.x < 0) {
    actor.x += LEVEL_W;
  }
  else if (actor.x > LEVEL_W) {
    actor.x -= LEVEL_W;
  }

  if (actor.y < 0) {
    actor.y += CANVAS_H;
  }
  else if (actor.y > CANVAS_H) {
    actor.y -= CANVAS_H;
  }
}

function drawPoints(points, x, y) {
  if (!x) { x = 0; }
  if (!y) { y = 0; }

  var length = points.length;
  context.moveTo(x + points[0], y + points[1]);
  for (var p = 2; p < length; p++) {
    context.lineTo(x + points[p], y + points[++p]);
  }
}

function drawNumber(num, x, y) {
  const NUMBER_POINTS = [
    [
       4, -8,
       4,  8,
      -4,  8,
      -4, -8,
       4, -8,
      -4,  8
    ],
    [
      -4, -8,
       0, -8,
       0,  8
    ],
    [
      -4, -8,
       4, -8,
       4,  0,
      -4,  0,
      -4,  8,
       4,  8
    ],
    [
      -4, -8,
       4, -8,
       0,  0,
       4,  0,
       4,  8,
      -4,  8
    ],
    [
       4,  8,
       4, -8,
      -4,  0,
       4,  0
    ],
    [
       4, -8,
      -4, -8,
      -4,  0,
       4,  0,
       4,  8,
      -4,  8
    ],
    [
       4, -8,
      -4, -8,
      -4,  8,
       4,  8,
       4,  0,
      -4,  0
    ],
    [
      -4, -8,
       4, -8,
       4,  8
    ],
    [
      -4,  0,
      -4, -8,
       4, -8,
       4,  0,
      -4,  0,
      -4,  8,
       4,  8,
       4,  0
    ],
    [
      -4,  8,
       4,  8,
       4, -8,
      -4, -8,
      -4,  0,
       4,  0
    ]
  ];
  var places = Math.log10(num) >> 0;

  for (var i = Math.pow(10, places); i >= 1; i /= 10) {
    var digit = i > 1 ? ((num / i >> 0) % 10) : num % 10;
    drawPoints(NUMBER_POINTS[digit], x, y);
    x += 16;
  }
}

function drawActor(actor, points) {
  var length = points.length;
  var cos = Math.cos(actor.radians);
  var sin = Math.sin(actor.radians);
  var scale = actor.size ? actor.size : 1;

  for (var i = 0; i <= length; i++) {
    var point = points[i % length];
    var x = scale * (point.x * cos + point.y * sin);
    var y = scale * (point.x * sin - point.y * cos);

    context[i === 0 ? 'moveTo' : 'lineTo'](actor.x + x, actor.y + y);
  }
}

var lastTimestamp = Date.now();

function frameStep(timestamp) {
  // Fill the background
  context.fillStyle = '#000';
  context.fillRect(0, 0, CANVAS_W, CANVAS_H);

  switch (scene) {
    case 0:
      context.beginPath();

      for (var i = 0; i < 9; i++) {
        drawPoints(TITLE_POINTS[i]);
      }

      context.lineWidth = 2;
      context.strokeStyle = '#FFF';
      context.stroke();
      context.closePath();
      break;
    case 1:
      // Get physics modifier
      var now = Date.now();
      var mod = (now - lastTimestamp) / UPDATE_RATE;
      lastTimestamp = now;

      // Update player
      if (player.countdown > 0) {
        // Destroyed timer
        player.countdown -= 1 / mod;
        if (player.countdown <= 0) {
          player.countdown = 0;
          // Update player state
          switch (player.state) {
            case 'destroyed':
              if (player.lives > 0) {
                resetPlayer();
              }
              else {
                // Gameover
                gameover = true;
              }
              break;
            case 'recover':
              player.state = 'alive';
              break;
          }
        }
      }

      if (player.state !== 'destroyed') {
        if (player.fireDelay > 0) {
          player.fireDelay -= 1 / mod;
          if (player.fireDelay < 0) {
            player.fireDelay = 0;
          }
        }
        if (player.radAcc) {
          var radians = player.radians + mod * player.radAcc / 10;
          if (radians < 0) {
            radians += TAU;
          }
          else if (radians >= TAU) {
            radians -= TAU;
          }
          player.radians = radians;
        }
        // Update the player's speed in the x and y directions
        if (player.thrust) {
          var cos = Math.cos(player.radians);
          var sin = Math.sin(player.radians);

          // Calculate the combined speed of both directions
          player.xSpeed += cos;
          player.ySpeed += sin;

          var speed = getHypoteneuse(player.xSpeed, player.ySpeed);
          if (speed < -MAX_SPEED || speed > MAX_SPEED) {
            speed = clamp(speed, -MAX_SPEED, MAX_SPEED);
            player.xSpeed = speed * cos;
            player.ySpeed = speed * sin;
          }
        }

        updateActor(mod, player);

        // Render player
        var sin = Math.sin(player.radians);
        var cos = Math.cos(player.radians);

        // Apply rotation transform to each point
        context.beginPath();
        drawActor(player, PLAYER_POINTS);
        // Draw engine thrust
        if (player.thrust) {
          drawActor(player, THRUST_POINTS);
        }

        context.lineWidth = 2;
        context.strokeStyle = player.state === 'alive' ? '#FFF' : '#AAA';
        context.stroke();
        context.closePath();
      }

      // Update missiles
      for (var i = 0; i < MAX_MISSILES; i++) {
        if (missiles[i]) {
          // Count down the missile's life based on the physics modifier
          missiles[i].life -= 1 / mod;

          if (missiles[i].life > 0) {
            updateActor(mod, missiles[i]);
            // Check for asteroid collisions
            for (var a = 0; a < MAX_ASTEROIDS; a++) {
              if (asteroids[a]) {
                if (getDistance(missiles[i], asteroids[a]) < asteroids[a].size * ASTEROID_SIZE - MISSILE_SIZE) {
                  score += 3 * asteroids[a].size;
                  if (score > MAX_SCORE) {
                    score = MAX_SCORE;
                  }
                  if (highscore < score) {
                    highscore = score;
                    saveScore();
                  }
                  breakAsteroid(a);
                  spawnExplosion(missiles[i].x, missiles[i].y);
                  missiles[i] = null;
                  missileCount--;
                  break;
                }
              }
            }
          }
          else {
            missiles[i] = null;
            missileCount--;
          }

          if (missiles[i]) {
            renderMissile(missiles[i]);
          }
        }
      }

      // Update asteroids
      context.beginPath();
      for (var i = 0; i < MAX_ASTEROIDS; i++) {
        if (asteroids[i]) {
          updateActor(mod, asteroids[i]);
          // Check for player collision if player is alive
          if (player.state === 'alive') {
            if (getDistance(asteroids[i], player) < asteroids[i].size * ASTEROID_SIZE) {
              // Destroy player
              spawnExplosion(player.x, player.y);
              player.state = 'destroyed';
              player.countdown = RESPAWN_DELAY;
            }
          }
          // Check for collision with other asteroids; starting with the current index so we don't repeat ourselves
          for (var a = i + 1; a < MAX_ASTEROIDS; a++) {
            if (asteroids[a]) {
              // Add both asteroid's sizes together
              if (getDistance(asteroids[i], asteroids[a]) < asteroids[i].size * ASTEROID_SIZE + asteroids[a].size * ASTEROID_SIZE) {
                breakAsteroid(i);
                breakAsteroid(a);
                break;
              }
            }
          }

          if (asteroids[i]) {
            drawActor(asteroids[i], ASTEROID_POINTS);
          }
        }
        else {
          // Only add new asteroids if there are fewer than the max big ones
          if (asteroidCount < MAX_BIG_ASTEROIDS) {
            asteroids[i] = new Asteroid();
            asteroidCount++;
          }
        }
      }
      // Update and draw explosions
      for (var i = 0; i < MAX_EXPLOSIONS; i++) {
        if (explosions[i]) {
          explosions[i].life -= 1 / mod;
          if (explosions[i].life > 0) {
            var radius = (EXPLOSION_LIFE - explosions[i].life);
            context.moveTo(explosions[i].x + radius, explosions[i].y);
            context.arc(explosions[i].x, explosions[i].y, radius, 0, TAU);
          }
          else {
            explosions[i] = null;
          }
        }
      }

      context.strokeStyle = '#FFF';
      context.stroke();
      context.closePath();

      // Render UI
      context.fillStyle = '#000';
      context.fillRect(LEVEL_W, 0, UI_WIDTH, CANVAS_H);

      context.beginPath();

      context.moveTo(LEVEL_W, 0);
      context.lineTo(LEVEL_W, CANVAS_H);

      // Player's lives
      for (var i = 0; i < player.lives; i++) {
        drawActor({ x: LEVEL_W + 24 + 24 * i, y: 32, radians: 4.71 }, PLAYER_POINTS);
      }

      // Score
      for (var i = 0; i < 5; i++) {
        drawPoints(SCORE_POINTS[i], LEVEL_W + 16 + 16 * i, 96);
        drawPoints(SCORE_POINTS[i], LEVEL_W + 16 + 16 * i, 224);
      }
      drawNumber(score, LEVEL_W + 16, 128);

      for (var i = 0; i < 4; i++) {
        drawPoints(HIGH_POINTS[i], LEVEL_W + 16 + 16 * i, 192);
      }
      drawNumber(highscore, LEVEL_W + 16, 256);

      if (gameover) {
        for (var i = 0; i < 8; i++) {
          drawPoints(GAMEOVER_POINTS[i]);
        }
      }

      context.stroke();
      context.closePath();
    break;
  }

  if (!start) {
    var start = timestamp;
  }
  if (timestamp - start < 2000) {
    window.requestAnimationFrame(frameStep);
  }
}
window.requestAnimationFrame(frameStep);
// }).call();
