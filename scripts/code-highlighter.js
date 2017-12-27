const CODE_RED = '#E58';
const CODE_ORANGE = '#EA3';
const CODE_YELLOW = '#EE8';
const CODE_GREEN = '#AE4';
const CODE_BLUE = '#6CE';
const CODE_PURPLE = '#C6E';
const CODE_GRAY = '#999';

function regexHighlightCCode(match) {
  if (/^(\d+|\d+\.\d+)$/g.test(match)) {
    return '<span style="color: ' + CODE_PURPLE + ';">' + match + '</span>'
  }
  else if (/[\w]+/g.test(match)) {
    return '<span style="color: ' + CODE_BLUE + ';">' + match + '</span>';
  }
}

function highlightCCode(original) {
  const C_REGEX = /\b(\d+|\d+\.\d+|[\w]+(?=\())\b/g;
  const TYPES = [
    'bool',
    'char',
    'int',
    'float',
    'unsigned',
    'signed',
    'long',
    'short',
    'void'
  ];
  function getType(line) {
    var typesLength = TYPES.length;

    for (var t = 0; t < typesLength; t++) {
      if (line.indexOf(TYPES[t]) === 0) {
        return TYPES[t];
      }
    }
  }

  var highlighted = [];
  var word = '';
  var flags = {
    comment: false,
    include: false,
    declare: false,
    quotes: false
  };

  // Go line-by-line
  var lines = original.split("\n");
  var linesLength = lines.length;
  for (var i = 0; i < linesLength; i++) {
    var line = lines[i];

    if (line === '\n') {
      highlighted.push('');
    }
    else if (line.indexOf('#include') === 0) {
      highlighted.push('<span style="color: ' + CODE_RED + ';">#include</span><span style="color: ' + CODE_YELLOW + ';">' + line.slice(8) + '</span>');
    }
    else if (line.indexOf('#define') === 0) {
      var paren = line.indexOf('(');
      var space = line.indexOf(' ', 8);
      var sliceTo = paren !== -1 ? paren : space;

      highlighted.push('<span style="color: ' + CODE_RED + ';">#define</span><span style="color: ' + CODE_GREEN + ';">' + line.slice(7, sliceTo) + '</span>' + line.slice(sliceTo).replace(C_REGEX, regexHighlightCCode));
    }
    else if (line[0] === '/' && line[1] === '/') {
      highlighted.push('<span style="color: ' + CODE_GRAY + ';">' + line + '</span>');
    }
    else {
      var type = getType(line);
      if (type) {
        highlighted.push('<span style="color: ' + CODE_BLUE + ';font-style:italic;">' + type + '</span>');
        line = line.slice(type.length);

        var sliceTo = line.indexOf('(');
        if (sliceTo !== -1) {
          highlighted.push('<span style="color: ' + CODE_GREEN + ';">' + line.slice(0, sliceTo) + '</span>');
          line = line.slice(sliceTo);
        }
      }
      var length = line.length;
      if (length > 0) {
        word = '';

        for (var l = 0; l < length; l++) {
          type = getType(line.slice(l));
          if (type) {
            highlighted.push(word + '<span style="color: ' + CODE_BLUE + ';">' + type + '</span>');
            line = line.slice(type.length);
            length -= type.length;
            word = '';
          }
          else {
            if (flags.quotes) {
              if (line[l] === '"') {
                flags.quotes = false;
                highlighted.push('<span style="color: ' + CODE_YELLOW + ';">' + word + '"</span>');
                l++;
                word = '';
              }
            }
            else {
              if (line[l] === '"') {
                flags.quotes = true;
                highlighted.push(word);
                word = '';
              }
              else if (line[l] === "'") {
                highlighted.push(word + '<span style="color: ' + CODE_YELLOW + ';">' + line.slice(l, l += 3) + '</span>');
                word = '';
              }
              else if (/ ?(if|else) ?/.test(word)) {
                highlighted.push('<span style="color: ' + CODE_RED + ';">' + word + '</span>');
                word = '';
              }
            }
          }
          word += line[l];
        }
        highlighted.push(word.replace(C_REGEX, regexHighlightCCode));
      }
    }
    highlighted.push('\n');
  }

  return highlighted.join('');
}

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
  else if (/\|[\w]+\|/.test(match)) {
    replaced[1] = CODE_ORANGE + ';font-style:italic';
    replaced[3] = match.slice(1, match.length - 1);
    replaced.unshift('|');
    replaced.push('|');
  }
  else if (/[!<>+\-*\/=]|[\&\|]{1,2}|if|new|else|elsif|while|case|break|switch|do|end|default|return/.test(match)) {
    replaced[1] = CODE_RED;
  }
  else if (match.trim().slice(0, 3) === 'def') {
    replaced[1] = CODE_RED;
    replaced[3] = match.replace('def ', 'def</span> <span style="color:' + CODE_GREEN + ';">');
  }
  else if (match.trim().slice(0, 5) === 'class') {
    replaced[1] = CODE_RED;
    replaced[3] = match.replace('class ', 'class</span> <span style="color:' + CODE_GREEN + ';">');
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
  else if (/[!<>+\-*\/=]|[\&\|]{1,2}|if|new|else|while|case|break|switch|default|return/.test(match)) {
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

  var length = original.length;
  for (var i = 0; i < length; i++) {
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
  const RUBY_REGEX = /(\#.+(\r|\n|\r\n)|\|[\w]+\||(\d+\.\d+|\d+|[!<>+\-*\/=]| [\&\|]{1,2} )|(\b| )(if|new|else|elsif|while|case|break|switch|do|end|default|return|def [a-z][\w]+\??|class [A-Z][\w]+)(\b| )|'[^']+'|"[^"]+")/g;
  const JS_REGEX = /(\/\/.+(\r|\n|\r\n)|(\d+\.\d+|\d+|[!<>+\-*\/=]|[\&\|]{1,2})|(\b| )(if|new|else|while|case|break|switch|default|return|var|document|window|undefined|null|NaN|Array|Boolean|Date|Error|EvalError|Function|Map|Math|Number|Object|Promise|Proxy|RangeError|ReferenceError|RegExp|Set|String|SyntaxError|TypeError|URIError|WeakMap|([A-Z][\w]+(?=\.))|(?=\.)[a-z][\w]+(?=\()|(function )?[a-z][\w]+(?=\())(\b| )|'[^']+'|"[^"]+")/g;

  var preTags = document.getElementsByTagName('pre');
  var preTagsLength = preTags.length;

  for (var i = 0; i < preTagsLength; i++) {
    var originalHTML = preTags[i].innerHTML;

    switch (preTags[i].className) {
      case 'code-c'         : preTags[i].innerHTML = highlightCCode(originalHTML); break;
      case 'code-ruby'      : preTags[i].innerHTML = originalHTML.replace(RUBY_REGEX, highlightRubyCode); break;
      case 'code-javascript': preTags[i].innerHTML = originalHTML.replace(JS_REGEX, highlightJSCode); break;
      case 'code-html'      : preTags[i].innerHTML = highlightHTMLCode(originalHTML); break;
    }
  }
});
