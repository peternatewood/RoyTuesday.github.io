$(document).on('ready', function() {
  console.log("sanity check okay!");

  $('a').on('click', function(event) {
    event.preventDefault();
    console.log('links have been bound!', event.target);
    var targetURI = event.target.href;
    console.log('targetURI', targetURI)
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