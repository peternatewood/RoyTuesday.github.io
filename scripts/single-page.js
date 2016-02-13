$(document).on('ready', function() {
  console.log("sanity check okay!");

  $('a').on('click', function(event) {
    event.preventDefault();
    console.log('links have been bound!');
  });
});