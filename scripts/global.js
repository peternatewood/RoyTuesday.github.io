ready(function() {
  function setOpaque() {
    this.style.opacity = 1;
  }

  var navLinks = document.getElementsByClassName("nav-link");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("animationend", setOpaque);
  }
  var articles = document.getElementsByTagName("article");
  for (var i = 0; i < 4 && i < articles.length; i++) {
    articles[i].addEventListener("animationend", setOpaque);
  }
});
