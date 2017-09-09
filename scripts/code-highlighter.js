function highlightCode(match) {
  var replaced = ['<span style="color:', '', ';">', match, '</span>'];

  if (!isNaN(parseInt(match))) {
    replaced[1] = '#A6E';
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
  var codeRegex = /((\b|\s)(\d+|[!<>+\-*/=]|[\&\|]{1,2}|if|new|else|case|break|switch|default|return|var|function|document|window|[a-z][a-zA-Z\_]+(?=\(.*\)))(\b|\s)|'\w+'|"\w+")/g;
  var preTags = document.getElementsByTagName('pre');
  var preTagsLength = preTags.length;

  for (var i = 0; i < preTagsLength; i++) {
    var originalHTML = preTags[i].innerHTML;
    preTags[i].innerHTML = originalHTML.replace(codeRegex, highlightCode);
  }
});
