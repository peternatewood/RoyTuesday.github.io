ready(function() {
  var waveStep = 0;

  function step(t) {
    var waveforms = document.getElementById('waveforms').getContext('2d');

    waveforms.clearRect(0, 0, 1200, 800);

    waveforms.fillStyle = '#333';
    waveforms.font = '32px Share Tech Mono';
    waveforms.textBaseline = 'top';

    waveforms.lineWidth = 6;
    waveforms.strokeStyle = '#333';

    waveforms.fillText('Sine', 8, 8);

    waveforms.beginPath();
    for (var i = 0, x = 0 - waveStep; i < 14; i++) {
      waveforms.moveTo(x, 100);
      waveforms.quadraticCurveTo(x + 50, i % 2 == 0 ? 50 : 150, x + 100, 100);
      x += 100;
    }
    waveforms.stroke();
    waveforms.closePath();

    waveforms.fillText('Triangle', 8, 208);

    waveforms.beginPath();
    waveforms.moveTo(-50 - waveStep, 250);
    waveforms.lineTo(50 - waveStep, 350);
    for (var i = 0, x = 150 - waveStep; i < 14; i++) {
      waveforms.lineTo(x, i % 2 == 0 ? 250 : 350);
      x += 100;
    }
    waveforms.stroke();
    waveforms.closePath();

    waveforms.fillText('Sawtooth', 8, 408);

    waveforms.beginPath();
    waveforms.moveTo(-50 - waveStep, 550);
    for (var i = 0, x = 150 - waveStep; i < 8; i++) {
      waveforms.lineTo(x, 450);
      waveforms.lineTo(x, 550);
      x += 200;
    }
    waveforms.stroke();
    waveforms.closePath();

    waveforms.fillText('Square', 8, 608);

    waveforms.beginPath();
    waveforms.moveTo(-50 - waveStep, 650);
    for (var i = 0, x = 50 - waveStep; i < 15; i++) {
      waveforms.lineTo(x, i % 2 == 0 ? 650 : 750);
      waveforms.lineTo(x, i % 2 == 0 ? 750 : 650);
      x += 100;
    }
    waveforms.stroke();
    waveforms.closePath();

    waveStep += 4;
    if (waveStep > 200) {
      waveStep = 0;
    }

    if(!s){var s=t}if(t-s<2000)window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
});
