function highlightJSCode(match) {
  var replaced = ['<span style="color:', '', ';">', match, '</span>'];

  if (!isNaN(parseInt(match))) {
    replaced[1] = '#A6E';
  }
  else if (/\/\//.test(match)) {
    replaced[1] = '#999';
  }
  else if (/('.+'|".+")/.test(match)) {
    replaced[1] = '#EE6';
  }
  else if (/[!<>\&|+\-*/=]|if|new|else|case|break|switch|default|return/.test(match)) {
    replaced[1] = '#E46';
  }
  else {
    switch (match) {
      case 'function':
      case 'document':
      case 'window':
        replaced[1] = '#6AE;font-style:italic';
        break;
      default:
        replaced[1] = '#6AE';
        break;
    }
  }

  return replaced.join('');
}

ready(function() {
  var jsRegex = /(\/\/.+(\r|\n|\r\n)|(\b|\s)(\d+|[!<>+\-*/=]|[\&\|]{1,2}|if|new|else|case|break|switch|default|return|var|function|document|window|[a-z][a-zA-Z\_]+(?=\(.*\)))(\b|\s)|'\w+'|"\w+")/g;
  var preTags = document.getElementsByTagName('pre');
  var preTagsLength = preTags.length;

  for (var i = 0; i < jsPreTagsLength; i++) {
    var originalHTML = preTags[i].innerHTML;

    if (preTags[i].className.includes('code-javascript')) {
      preTags[i].innerHTML = originalHTML.replace(jsRegex, highlightJSCode);
    }
  }
});
