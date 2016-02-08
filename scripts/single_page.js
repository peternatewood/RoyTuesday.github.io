$(document).ready(function() {
	$('a').on('click', function(event) {
		event.preventDefault();
		$.ajax(event.target.href)
		.done(function(response) {
			console.log(event.target, response);
		})
		.fail(function(response) {
			console.log('failure?', response);
		});
	});
});