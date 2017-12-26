const CODE_RED = '#E58';
const CODE_YELLOW = '#EE8';
const CODE_GREEN = '#AE4';
const CODE_BLUE = '#6CE';
const CODE_PURPLE = '#C6E';
const CODE_GRAY = '#999';

function highlightJSCode(match) {
  var replaced = ['<span style="color:', '', ';">', match, '</span>'];

  if (!isNaN(parseInt(match))) {
    replaced[1] = CODE_PURPLE;
  }
  else if (/\/\//.test(match)) {
    replaced[1] = CODE_GRAY;
  }
  else if (/('.+'|".+")/.test(match)) {
    replaced[1] = CODE_YELLOW;
  }
  else if (/[!<>\&|+\-*/=]|if|new|else|case|break|switch|default|return/.test(match)) {
    replaced[1] = CODE_RED;
  }
  else {
    switch (match) {
      case 'function':
      case 'document':
      case 'window':
        replaced[1] = CODE_BLUE + 'font-style:italic';
        break;
      default:
        replaced[1] = CODE_BLUE;
        break;
    }
  }

  return replaced.join('');
}

function highlightHTMLCode(original) {
  var highlighted = [];
  var word = '';
  var flags = {
    tag: false,
    tagName: false,
    doubleQuotes: false
  };

  let length = original.length;
  for (let i = 0; i < length; i++) {
    if (!flags.tag) {
      if (original.slice(i, i + 4) == '&lt;') {
        if (word) {
          highlighted.push(word);
        }
        if (original[i + 4] == '/') {
          highlighted.push('&lt;/<span style="color:' + CODE_RED + '">');
          i += 5;
        }
        else {
          highlighted.push('&lt;<span style="color:' + CODE_RED + '">');
          i += 4;
        }
        word = '';
        flags.tag = true;
        flags.tagName = true;
      }
      word += original[i];
    }
    else {
      if (flags.tagName) {
        if (!/[a-zA-Z]/.test(original[i])) {
          if (original[i] == ' ') {
            highlighted.push(word + ' </span>');
            i++;
          }
          else {
            highlighted.push(word + '</span>');
          }
          word = '';
          flags.tagName = false;
        }
      }
      else {
        if (!flags.doubleQuotes) {
          if (original[i] == '"') {
            flags.doubleQuotes = true;
            highlighted.push('="');
            word = '';
            i++;
          }
          else if (original[i] == '=') {
            highlighted.push('<span style="color:' + CODE_GREEN + '">');
            highlighted.push(word);
            highlighted.push('</span>');
            word = '';
          }
        }
        else {
          if (original[i] == '"') {
            flags.doubleQuotes = false;
            highlighted.push('<span style="color:' + CODE_YELLOW + '">');
            highlighted.push(word);
            highlighted.push('</span>"');
            word = '';
            i++;
          }
        }
      }

      if (original.slice(i, i + 4) == '&gt;') {
        flags.tag = false;
        highlighted.push('&gt;');
        i += 3;
      }
      else {
        word += original[i];
      }
    }
  }

  return highlighted.join('');
}

ready(function() {
  var jsRegex = /(\/\/.+(\r|\n|\r\n)|(\b|\s)(\d+\.\d+|\d+|[!<>+\-*/=]|[\&\|]{1,2}|if|new|else|case|break|switch|default|return|var|function|document|window|[a-z][a-zA-Z\_]+(?=\(.*\)))(\b|\s)|'[^']+'|"[^']+")/g;

  var preTags = document.getElementsByTagName('pre');
  var preTagsLength = preTags.length;

  for (var i = 0; i < preTagsLength; i++) {
    var originalHTML = preTags[i].innerHTML;

    if (preTags[i].className.includes('code-javascript')) {
      preTags[i].innerHTML = originalHTML.replace(jsRegex, highlightJSCode);
    }
    else if (preTags[i].className.includes('code-html')) {
      preTags[i].innerHTML = highlightHTMLCode(originalHTML);
    }
  }
});
