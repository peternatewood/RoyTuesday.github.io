const CODE_RED = '#E58';
const CODE_YELLOW = '#EE8';
const CODE_GREEN = '#AE4';
const CODE_BLUE = '#6CE';
const CODE_PURPLE = '#C6E';
const CODE_GRAY = '#999';

function highlightRubyCode(match) {
  var replaced = ['<span style="color:', '', ';">', match, '</span>'];

  if (!isNaN(parseInt(match)) || match === 'undefined' || match === 'null' || match === 'NaN') {
    replaced[1] = CODE_PURPLE;
  }
  else if (match[0] === '#') {
    replaced[1] = CODE_GRAY;
  }
  else if (/('.+'|".+")/.test(match)) {
    replaced[1] = CODE_YELLOW;
  }
  else if (/[!<>+\-*\/=]|[\&\|]{1,2}|if|new|else|elsif|case|break|switch|do|end|default|return/.test(match)) {
    replaced[1] = CODE_RED;
  }
  else if (match.slice(0, 3) === 'def') {
    replaced[1] = CODE_RED;
    replaced[3] = 'def</span> <span style="color:' + CODE_GREEN + ';">' + match.replace('def ', '');
  }

  return replaced.join('');
}

function highlightJSCode(match) {
  var replaced = ['<span style="color:', '', ';">', match, '</span>'];
  match = match.trim();

  if (!isNaN(parseInt(match))) {
    replaced[1] = CODE_PURPLE;
  }
  else if (/\/\//.test(match)) {
    replaced[1] = CODE_GRAY;
  }
  else if (/('.+'|".+")/.test(match)) {
    replaced[1] = CODE_YELLOW;
  }
  else if (/[!<>+\-*\/=]|[\&\|]{1,2}|if|new|else|case|break|switch|default|return/.test(match)) {
    replaced[1] = CODE_RED;
  }
  else if (match.slice(0, 8) === 'function') {
    replaced[1] = CODE_BLUE + ';font-style:italic';
    replaced[3] = 'function</span> <span style="color:' + CODE_GREEN + ';">' + match.replace('function ', '');
  }
  else if (/^[A-Z]/.test(match)) {
    replaced[1] = CODE_BLUE + ';font-style:italic';
  }
  else {
    switch (match) {
      case "document":
      case "window":
      case "var":
      case "Array":
      case "Boolean":
      case "Date":
      case "Error":
      case "EvalError":
      case "Function":
      case "Map":
      case "Math":
      case "Number":
      case "Object":
      case "Promise":
      case "Proxy":
      case "RangeError":
      case "ReferenceError":
      case "RegExp":
      case "Set":
      case "String":
      case "SyntaxError":
      case "TypeError":
      case "URIError":
      case "WeakMap":
        replaced[1] = CODE_BLUE + ';font-style:italic';
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
      if (original.slice(i, i + 4) === '&lt;') {
        if (word) {
          highlighted.push(word);
        }
        if (original[i + 4] === '/') {
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
          if (original[i] === ' ') {
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
          if (original[i] === '"') {
            flags.doubleQuotes = true;
            highlighted.push('="');
            word = '';
            i++;
          }
          else if (original[i] === '=') {
            highlighted.push('<span style="color:' + CODE_GREEN + '">');
            highlighted.push(word);
            highlighted.push('</span>');
            word = '';
          }
        }
        else {
          if (original[i] === '"') {
            flags.doubleQuotes = false;
            highlighted.push('<span style="color:' + CODE_YELLOW + '">');
            highlighted.push(word);
            highlighted.push('</span>"');
            word = '';
            i++;
          }
        }
      }

      if (original.slice(i, i + 4) === '&gt;') {
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
  const RUBY_REGEX = /(\#.+(\r|\n|\r\n)|(\d+\.\d+|\d+|[!<>+\-*\/=]|[\&\|]{1,2})|(\b| )(if|new|else|elsif|case|break|switch|do|end|default|return|def [a-z][\w]+)(\b| )|'[^']+'|"[^"]+")/g;
  // Also any Capital object followed by a period gets blue and italic
  const JS_REGEX = /(\/\/.+(\r|\n|\r\n)|(\d+\.\d+|\d+|[!<>+\-*\/=]|[\&\|]{1,2})|(\b| )(if|new|else|case|break|switch|default|return|var|document|window|undefined|null|NaN|Array|Boolean|Date|Error|EvalError|Function|Map|Math|Number|Object|Promise|Proxy|RangeError|ReferenceError|RegExp|Set|String|SyntaxError|TypeError|URIError|WeakMap|([A-Z][\w]+(?=\.))|(?=\.)[a-z][\w]+(?=\()|(function )?[a-z][\w]+(?=\())(\b| )|'[^']+'|"[^"]+")/g;

  var preTags = document.getElementsByTagName('pre');
  var preTagsLength = preTags.length;

  for (var i = 0; i < preTagsLength; i++) {
    var originalHTML = preTags[i].innerHTML;

    switch (preTags[i].className) {
      // case 'code-c'         : break;
      case 'code-ruby'      : preTags[i].innerHTML = originalHTML.replace(RUBY_REGEX, highlightRubyCode); break;
      case 'code-javascript': preTags[i].innerHTML = originalHTML.replace(JS_REGEX, highlightJSCode); break;
      case 'code-html'      : preTags[i].innerHTML = highlightHTMLCode(originalHTML); break;
    }
  }
});
