(function() {
  function handleSourceCodeClick(e) {
    e.preventDefault();
    var source = document.getElementById('source-code');
    source.style.display = source.style.display === 'none' ? 'block' : 'none';
  }
  document.getElementById('show-source').addEventListener('click', handleSourceCodeClick);

  const CANVAS_W = 800;
  const CANVAS_H = 450;

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

  // Big asteroids split into two small ones; therefore the maximum number of asteroids on screen at once must be twice the number of maximum big asteroids
  const MAX_BIG_ASTEROIDS = 3;
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

  const KEY_MAP = {
    'ArrowUp'     : 'up',
    'ArrowLeft'   : 'left',
    'ArrowRight'  : 'right'
  };

  var context = document.getElementById('canvas').getContext('2d');

  var player = {
    x: CANVAS_W / 2, y: CANVAS_H / 2,
    xSpeed: 0, ySpeed: 0, thrust: false,
    radians: 0, radAcc: 0,
    state: 'alive', countdown: 0
  };
  function updatePlayer(mod) {
    if (player.countdown > 0) {
      // Destroyed/Recovery timer
      player.countdown -= 1 / mod;
      if (player.countdown <= 0) {
        player.countdown = 0;
        // Update player state
        switch (player.state) {
          case 'destroyed': resetPlayer(); break;
          case 'recovery': player.state = 'alive'; break;
        }
      }
    }

    if (player.state !== 'destroyed') {
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
    }
  }
  function resetPlayer() {
    player.x = CANVAS_W / 2;
    player.y = CANVAS_H / 2;
    player.xSpeed = 0;
    player.ySpeed = 0;
    player.radians = 0;
    player.state = 'recovery';
    player.countdown = RECOVER_DELAY;
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
      var perimeterPoint = Math.random() * (2 * CANVAS_H + 2 * CANVAS_W);
      if (perimeterPoint <= CANVAS_W) {
        // This point is along the top edge of the canvas
        x = perimeterPoint;
        y = 0;
      }
      else if (perimeterPoint <= CANVAS_W + CANVAS_H) {
        // This point is along the right edge of the canvas
        x = CANVAS_W;
        y = perimeterPoint - CANVAS_W;
      }
      else if (perimeterPoint <= 2 * CANVAS_W + CANVAS_H) {
        // This point is along the bottom edge of the canvas
        x = perimeterPoint - (CANVAS_W + CANVAS_H);
        y = CANVAS_H;
      }
      else {
        // This point is along the left edge of the canvas
        x = 0;
        y = perimeterPoint - (2 * CANVAS_W + CANVAS_H);
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
  function renderAsteroid(asteroid) {
    var cos = Math.cos(asteroid.radians);
    var sin = Math.sin(asteroid.radians);

    context.beginPath();
    for (var i = 0; i < 10; i++) {
      var pointX = asteroid.size * (ASTEROID_POINTS[i].x * cos + ASTEROID_POINTS[i].y * sin);
      var pointY = asteroid.size * (ASTEROID_POINTS[i].x * sin - ASTEROID_POINTS[i].y * cos);

      context[i === 0 ? 'moveTo' : 'lineTo'](asteroid.x + pointX, asteroid.y + pointY);
    }
    context.closePath();
    context.strokeStyle = '#FFF';
    context.stroke();
  }
  // We get the index so we can change the asteroids array in place
  function breakAsteroid(index) {
    var ast = asteroids[index];
    if (ast.size === 1) {
      asteroidCount--;
      asteroids[index] = null;
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
      // This astroid moves in nearly the total opposite direction; if it was 180 degrees the two would loop around and collide
      radians += 3;
      xSpeed = Math.cos(radians);
      ySpeed = Math.sin(radians);
      x = ASTEROID_SIZE * xSpeed;
      y = ASTEROID_SIZE * ySpeed;
      asteroids[index] = new Asteroid(true, ast.x + x, ast.y + y, xSpeed, ySpeed);
    }
  }

  function handleInput(action, isActivated) {
    switch (action) {
      case 'up'     : player.thrust = isActivated; break;
      case 'left'   : player.radAcc += isActivated ? -1 :  1; break;
      case 'right'  : player.radAcc += isActivated ?  1 : -1; break;
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
      actor.x += CANVAS_W;
    }
    else if (actor.x > CANVAS_W) {
      actor.x -= CANVAS_W;
    }

    if (actor.y < 0) {
      actor.y += CANVAS_H;
    }
    else if (actor.y > CANVAS_H) {
      actor.y -= CANVAS_H;
    }
  }

  var lastTimestamp = Date.now();

  function frameStep(timestamp) {
    // Fill the background
    context.fillStyle = '#000';
    context.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Get physics modifier
    var now = Date.now();
    var mod = (now - lastTimestamp) / UPDATE_RATE;
    lastTimestamp = now;

    // Update player
    updatePlayer(mod);
    if (player.state !== 'destroyed') {
      updateActor(mod, player);

      // Render player
      var sin = Math.sin(player.radians);
      var cos = Math.cos(player.radians);

      // Apply rotation transform to each point
      context.beginPath();
      for (var i = 0; i < 4; i++) {
        var pointX = PLAYER_POINTS[i].x * cos + PLAYER_POINTS[i].y * sin;
        var pointY = PLAYER_POINTS[i].x * sin - PLAYER_POINTS[i].y * cos;

        context[i === 0 ? 'moveTo' : 'lineTo'](player.x + pointX, player.y + pointY);
      }
      context.closePath();

      context.lineWidth = 2;
      context.strokeStyle = player.state === 'alive' ? '#FFF' : '#AAA';
      context.stroke();
    }

    // Update asteroids
    for (var i = 0; i < MAX_ASTEROIDS; i++) {
      if (asteroids[i]) {
        updateActor(mod, asteroids[i]);
        // Check for player collision if player is alive
        if (player.state === 'alive') {
          if (getDistance(asteroids[i], player) < asteroids[i].size * ASTEROID_SIZE) {
            // Destroy player
            player.state = 'destroyed';
            // setTimeout(resetPlayer, RESPAWN_DELAY);
            player.countdown = RESPAWN_DELAY;
          }
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
    // Check for asteroids colliding with each other
    for (var i = 0; i < MAX_ASTEROIDS; i++) {
      if (asteroids[i]) {
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
        // Render the asteroid if it still exists
        if (asteroids[i]) {
          renderAsteroid(asteroids[i]);
        }
      }
    }

    if (!start) {
      var start = timestamp;
    }
    if (timestamp - start < 2000) {
      window.requestAnimationFrame(frameStep);
    }
  }
  window.requestAnimationFrame(frameStep);
}).call();
