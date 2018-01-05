ready(function() {
  var rectangle = document.getElementById('rectangle').getContext('2d');

  rectangle.strokeStyle = '#CCC';
  rectangle.lineWidth = 2;
  rectangle.beginPath();
  // Horizontal grid lines
  for (let y = 0; y < 450; y += 20) {
    rectangle.moveTo(0, y);
    rectangle.lineTo(800, y);
  }
  // Vertical grid lines
  for (let x = 0; x < 800; x += 20) {
    rectangle.moveTo(x, 0);
    rectangle.lineTo(x, 450);
  }
  rectangle.stroke();
  rectangle.closePath();

  rectangle.fillStyle = '#66A';
  rectangle.strokeStyle = 'crimson';

  rectangle.fillRect(100, 40, 200, 120);
  rectangle.strokeRect(100, 40, 200, 120);

  // Size and position arrows
  rectangle.fillStyle = '#333';
  rectangle.strokeStyle = '#333';

  rectangle.beginPath();

  // X Position
  rectangle.moveTo(0, 40);
  rectangle.lineTo(8, 44);
  rectangle.lineTo(8, 36);

  rectangle.moveTo(100, 40);
  rectangle.lineTo(92, 44);
  rectangle.lineTo(92, 36);

  // Y Position
  rectangle.moveTo(100, 0);
  rectangle.lineTo(104, 8);
  rectangle.lineTo(96, 8);

  rectangle.moveTo(100, 40);
  rectangle.lineTo(104, 32);
  rectangle.lineTo(96, 32);

  // Width
  rectangle.moveTo(100, 164);
  rectangle.lineTo(108, 164);
  rectangle.lineTo(108, 172);

  rectangle.moveTo(300, 164);
  rectangle.lineTo(292, 164);
  rectangle.lineTo(292, 172);

  // Height
  rectangle.moveTo(304, 40);
  rectangle.lineTo(304, 48);
  rectangle.lineTo(312, 48);

  rectangle.moveTo(304, 160);
  rectangle.lineTo(304, 152);
  rectangle.lineTo(312, 152);

  rectangle.fill();
  rectangle.closePath();

  rectangle.beginPath();
  // X
  rectangle.moveTo(8, 40);
  rectangle.lineTo(92, 40);
  // Y
  rectangle.moveTo(100, 8);
  rectangle.lineTo(100, 32);
  // W
  rectangle.moveTo(108, 165);
  rectangle.lineTo(292, 165);
  // H
  rectangle.moveTo(305, 48);
  rectangle.lineTo(305, 152);

  rectangle.stroke();
  rectangle.closePath();

  rectangle.font = '14px Courier';
  rectangle.textAlign = 'center';
  // X
  rectangle.fillText('100 pixels', 50, 60);
  // Y
  rectangle.fillText('40 pixels', 150, 24);
  // W
  rectangle.fillText('200 pixels', 200, 190);
  // H
  rectangle.fillText('120 pixels', 360, 100);

  var threeLines = document.getElementById('three-lines').getContext('2d');

  threeLines.strokeStyle = '#CCC';
  threeLines.lineWidth = 2;
  threeLines.beginPath();
  // Horizontal grid lines
  for (let y = 0; y < 450; y += 20) {
    threeLines.moveTo(0, y);
    threeLines.lineTo(800, y);
  }
  // Vertical grid lines
  for (let x = 0; x < 800; x += 20) {
    threeLines.moveTo(x, 0);
    threeLines.lineTo(x, 450);
  }
  threeLines.stroke();
  threeLines.closePath();

  threeLines.fillStyle = '#F90';
  // An isosceles triangle
  threeLines.beginPath();
  threeLines.moveTo(200, 100);
  threeLines.lineTo(300, 200);
  threeLines.lineTo(100, 200);
  threeLines.closePath();

  threeLines.fill();

  threeLines.fillStyle = '#09F';

  threeLines.beginPath();
  threeLines.arc(200, 100, 4, 0, 6.28);
  threeLines.closePath();
  threeLines.fill();

  threeLines.beginPath();
  threeLines.arc(300, 200, 4, 0, 6.28);
  threeLines.closePath();
  threeLines.fill();

  threeLines.beginPath();
  threeLines.arc(100, 200, 4, 0, 6.28);
  threeLines.closePath();
  threeLines.fill();

  threeLines.font = '16px Courier';
  threeLines.fillStyle = '#333';
  threeLines.textAlign = 'center';
  threeLines.fillText('1st Point', 200, 80);
  threeLines.fillText('2nd Point', 356, 210);
  threeLines.fillText('3rd Point', 100, 220);


  threeLines.strokeStyle = '#00F';
  // Three lines rendered at once
  threeLines.beginPath();
  threeLines.moveTo(300, 400);
  threeLines.lineTo(400, 300);

  threeLines.moveTo(400, 400);
  threeLines.lineTo(500, 300);

  threeLines.moveTo(500, 400);
  threeLines.lineTo(600, 300);

  threeLines.stroke();
  threeLines.closePath();

  var triangles = document.getElementById('triangles').getContext('2d');


  triangles.strokeStyle = '#CCC';
  triangles.lineWidth = 2;
  triangles.beginPath();
  // Horizontal grid lines
  for (let y = 0; y < 450; y += 20) {
    triangles.moveTo(0, y);
    triangles.lineTo(800, y);
  }
  // Vertical grid lines
  for (let x = 0; x < 800; x += 20) {
    triangles.moveTo(x, 0);
    triangles.lineTo(x, 450);
  }
  triangles.stroke();
  triangles.closePath();

  triangles.fillStyle = '#F00';
  triangles.beginPath();
  // Two triangles
  triangles.moveTo(100, 100);
  triangles.lineTo(200, 100);
  triangles.lineTo(100, 200);

  triangles.moveTo(700, 250);
  triangles.lineTo(600, 350);
  triangles.lineTo(700, 350);

  triangles.fill();
  triangles.closePath();

  // Circle
  triangles.beginPath();
  triangles.arc(400, 125, 32, 0, 2 * Math.PI);
  triangles.fill();
  triangles.closePath();

  // Half-Circle
  triangles.beginPath();
  triangles.arc(400, 225, 32, 0, Math.PI);
  triangles.fillStyle = '#00F';
  triangles.fill();
  triangles.closePath();

  // Pac Man?
  triangles.beginPath();
  triangles.moveTo(384, 325);
  triangles.arc(400, 325, 32, 0.5, 5.78);
  triangles.fillStyle = '#FF0';
  triangles.fill();
  triangles.closePath();
});
