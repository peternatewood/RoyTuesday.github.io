ready(function() {
  var audio;
  if (typeof AudioContext !== 'undefined') {
    audio = new AudioContext;
  }
  else if (typeof webkitAudioContext !== 'undefined') {
    audio = new webkitAudioContext;
  }

  function playRawOsc(e) {
    e.preventDefault();

    if (audio) {
      var osc = audio.createOscillator();
      osc.connect(audio.destination);
      osc.start(audio.currentTime);
      osc.stop(audio.currentTime + 0.1);
    }
  }
  function playSawtooth(e) {
    e.preventDefault();

    if (audio) {
      var osc = audio.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, audio.currentTime);
      osc.connect(audio.destination);
      osc.start(audio.currentTime);
      osc.stop(audio.currentTime + 0.1);
    }
  }
  function playSofter(e) {
    e.preventDefault();

    if (audio) {
      var osc = audio.createOscillator();
      var gain = audio.createGain();
      gain.gain.setValueAtTime(0.1, audio.currentTime);

      osc.connect(gain);
      gain.connect(audio.destination);

      osc.start(audio.currentTime);
      osc.stop(audio.currentTime + 0.1);
    }
  }
  function playRamp(e) {
    e.preventDefault();

    if (audio) {
      var osc = audio.createOscillator();
      var gain = audio.createGain();

      gain.gain.setValueAtTime(0, audio.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, audio.currentTime + 0.01);

      gain.gain.setValueAtTime(0.1, audio.currentTime + 0.99);
      gain.gain.linearRampToValueAtTime(0, audio.currentTime + 1);

      osc.connect(gain);
      gain.connect(audio.destination);

      osc.start(audio.currentTime);
      osc.stop(audio.currentTime + 0.1);
    }
  }

  document.getElementById('raw-osc').addEventListener('click', playRawOsc);
  document.getElementById('sawtooth').addEventListener('click', playSawtooth);
  document.getElementById('softer').addEventListener('click', playSofter);
  document.getElementById('ramp').addEventListener('click', playRamp);

  var waveStep = 0;

  function step(t) {
    var waveforms = document.getElementById('waveforms').getContext('2d');

    waveforms.clearRect(0, 0, 1200, 800);

    waveforms.lineWidth = 6;
    waveforms.strokeStyle = '#333';

    waveforms.beginPath();
    for (var i = 0, x = 0 - waveStep; i < 11; i++) {
      waveforms.moveTo(x, 100);
      waveforms.quadraticCurveTo(x + 50, i % 2 == 0 ? 50 : 150, x + 100, 100);
      x += 100;
    }
    waveforms.stroke();
    waveforms.closePath();

    waveforms.beginPath();
    waveforms.moveTo(-50 - waveStep, 250);
    waveforms.lineTo(50 - waveStep, 350);
    for (var i = 0, x = 150 - waveStep; i < 11; i++) {
      waveforms.lineTo(x, i % 2 == 0 ? 250 : 350);
      x += 100;
    }
    waveforms.stroke();
    waveforms.closePath();

    waveforms.beginPath();
    waveforms.moveTo(-50 - waveStep, 550);
    for (var i = 0, x = 150 - waveStep; i < 6; i++) {
      waveforms.lineTo(x, 450);
      waveforms.lineTo(x, 550);
      x += 200;
    }
    waveforms.stroke();
    waveforms.closePath();

    waveforms.beginPath();
    waveforms.moveTo(-50 - waveStep, 650);
    for (var i = 0, x = 50 - waveStep; i < 12; i++) {
      waveforms.lineTo(x, i % 2 == 0 ? 650 : 750);
      waveforms.lineTo(x, i % 2 == 0 ? 750 : 650);
      x += 100;
    }
    waveforms.stroke();
    waveforms.closePath();

    waveforms.fillStyle = '#333';
    waveforms.font = '64px Share Tech Mono';
    waveforms.textBaseline = 'middle';

    waveforms.clearRect(900, 0, 300, 800);
    waveforms.fillText('Sine', 915, 100);
    waveforms.fillText('Triangle', 915, 300);
    waveforms.fillText('Sawtooth', 915, 500);
    waveforms.fillText('Square', 915, 700);

    waveStep += 4;
    if (waveStep > 200) {
      waveStep = 0;
    }

    if(!s){var s=t}if(t-s<2000)window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
});
