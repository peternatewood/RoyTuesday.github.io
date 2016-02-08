$(document).ready(function() {
	$('a').on('click', function(event) {
		event.preventDefault();
		console.log('Links adjusted!', event);
	});
});