$(document).on('ready', function() {
  console.log("sanity check okay!");

  $('nav a').on('click', function(event) {
    event.preventDefault();
    console.log('links have been bound!', event.target);
    var targetURI = event.target.dataset.pagePartial;
    console.log('targetURI', targetURI)
    $.ajax({
      cache: false,
      url: targetURI
    }).done(function(response) {
      console.log('success!', response);
      $('main').html(response);
    }).fail(function(response) {
      console.log('failure?', response);
    });
  });

});