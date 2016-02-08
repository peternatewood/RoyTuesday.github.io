var getMain = function(htmlString) {
	return htmlString.replace(/(.*\s*){3}/, "").replace("</body>", "").replace("</html>", "").trim();
}

$(document).ready(function() {
	$('a').on('click', function(event) {
		event.preventDefault();
		$.ajax(event.target.href)
		.done(function(response) {
			$('main').html(getMain(response));
		})
		.fail(function(response) {
			console.log('failure?', response);
		});
	});
});