var removeExcessSpaces = function(htmlString) {
	var processedString = htmlString.replace(/\s+</g, '<');
	processedString = processedString.replace(/>\s+/g, '>');
  processedString = processedString.replace(/\:</g, ': <');
	return processedString;
}

var ready = function(fn) {
  if(document.readyState != 'loading') {
    fn();
  }
  else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(function() {
	document.querySelector('body').innerHTML = removeExcessSpaces(document.querySelector('body').innerHTML);

  // Ensure the periodic table overlay is positioned correctly
  var tableLeft = document.querySelector('#tetris-table').offsetLeft;
  var tableTop = document.querySelector('#tetris-table').offsetTop;
  document.querySelector('#table-overlay').style.left = tableLeft + 1 + 'px';
  document.querySelector('#table-overlay').style.top = tableTop + 1 + 'px';

  // This variable is global for the purposes of development and debugging
  // Once the game is complete, remove the variable assignment
  window.gameControl = new Controller();
});
