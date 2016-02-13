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
    var targetURI = event.target.dataset.pagePartial;
    console.log("I'm a blog link!", targetURI);
    $.ajax({
      cache: false,
      url: targetURI
    }).done(function(response) {
      console.log('success!', response);
    }).fail(function(response) {
      console.log('failure?', response);
    });
  });

});