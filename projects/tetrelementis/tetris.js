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

  var updateDirectionsOverlay = function(container) {
    var dirTrans = document.querySelector("#directions-transparent-layer");
    var directions = document.querySelector("#directions");
    var main = document.querySelector("main");

    container.style["left"] = main.offsetLeft + "px";
    container.style["top"] = main.offsetTop + "px";
    container.style["height"] = main.offsetHeight + "px";
    container.style["width"] = main.offsetWidth + "px";

    directions.style["height"] = (main.offsetHeight - 32) + "px";
    directions.style["width"] = (main.offsetWidth - 64) + "px";

    dirTrans.style["height"] = main.offsetHeight + "px";
    dirTrans.style["width"] = main.offsetWidth + "px";
  }

  removeExcessSpaces('main');

  var dirContainer = document.querySelector("#directions-container");

  document.querySelector("#show-directions a").addEventListener("click", function(event) {
    event.preventDefault();

    if(dirContainer.style["display"] != "none") {
      updateDirectionsOverlay(dirContainer);
    }

    dirContainer.style["display"] = "initial";
    dirContainer.className = "stretching-container";
  });

  document.querySelector("#hide-directions a").addEventListener("click", function(event) {
    event.preventDefault();
    dirContainer.className = "fading-container";
  });

  dirContainer.addEventListener("animationend", function(event) {
    if(event.animationName == "fade") {
      dirContainer.style["display"] = "none";
    }
  });

  window.addEventListener("resize", function(event) {
    updateDirectionsOverlay(dirContainer);
  });

  new Controller();
});
