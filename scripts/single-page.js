$(document).on('ready', function() {

  $('nav a').on('click', function(event) {
    event.preventDefault();
    var targetURI = event.target.dataset.pagePartial;
    $.ajax({
      cache: false,
      url: targetURI
    }).done(function(response) {
      $('main').html(response);
    });
  });

  $('a.blog-link').on('click', function(event) {
    event.preventDefault();
    console.log("I'm a blog link!");
  });

});