function regexHighlightCCode(match) {
  if (/^(\d+\.\d+f?|0x[\dA-F]+|\d+)$/g.test(match)) {
    return '<span class="code-purple">' + match + '</span>'
  }
  else if (/[\w]+/g.test(match)) {
    return '<span class="code-cyan">' + match + '</span>';
  }
}

function highlightCCode(original) {
  const C_REGEX = /\b(\d+\.\d+f?|0x[\dA-F]+|\d+|[\w]+(?=\())\b/g;
  const TYPES = [
    'bool',
    'char',
    'int',
    'float',
    'double',
    'unsigned',
    'signed',
    'long',
    'short',
    'enum',
    'typedef',
    'union',
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
      highlighted.push('<span class="code-red">#include</span><span class="code-yellow">' + line.slice(8) + '</span>');
    }
    else if (line.indexOf('#define') === 0) {
      var paren = line.indexOf('(');
      var space = line.indexOf(' ', 8);
      var sliceTo = paren !== -1 ? paren : space;

      highlighted.push('<span class="code-red">#define</span><span class="code-green">' + line.slice(7, sliceTo) + '</span>' + line.slice(sliceTo).replace(C_REGEX, regexHighlightCCode));
    }
    else if (line[0] === '/' && line[1] === '/') {
      highlighted.push('<span class="code-gray">' + line + '</span>');
    }
    else {
      var type = getType(line);
      if (type) {
        highlighted.push('<span class="code-cyan" style="font-style:italic;">' + type + '</span>');
        line = line.slice(type.length);

        var sliceTo = line.indexOf('(');
        if (sliceTo !== -1) {
          highlighted.push('<span class="code-green">' + line.slice(0, sliceTo) + '</span>');
          line = line.slice(sliceTo);
        }
      }
      var length = line.length;
      if (length > 0) {
        word = '';

        for (var l = 0; l < length; l++) {
          type = getType(line.slice(l));
          if (type) {
            highlighted.push(word + '<span class="code-cyan">' + type + '</span>');
            line = line.slice(type.length);
            length -= type.length;
            word = '';
          }
          else {
            if (flags.quotes) {
              if (line[l] === '"') {
                flags.quotes = false;
                highlighted.push('<span class="code-yellow">' + word + '"</span>');
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
                highlighted.push(word + '<span class="code-yellow">' + line.slice(l, l += 3) + '</span>');
                word = '';
              }
              // Figure out how to exclude parentheses from this highlighting
              // else if (/ ?(true|false|NULL) ?/.test(word)) {
              //   highlighted.push('<span class="code-purple">' + word + '</span>');
              //   word = '';
              // }
              else if (/ ?(break|case|const|continue|default|else|for|goto|if|return|sizeof|switch|while) ?/.test(word)) {
                highlighted.push('<span class="code-red">' + word + '</span>');
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

function highlightCSSProperty(match, name, value) {
  var highlighted = ['<span class="code-cyan">', name, '</span>', '<span>'];

  var words = value.split(' ');
  var replacedValue = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var replacedWord = ['<span class="code-cyan">', word, '</span>', '<span>'];
    if (/(\d+|\d+\.\d+)(px|em|%)?/.test(word)) {
      replacedWord[0] = '<span class="code-purple">'
    }
    else if (/\'.*\'/.test(word)) {
      replacedWord[0] = '<span class="code-yellow">'
    }
    replacedValue.push(replacedWord.join(''));
  }
  highlighted.push(replacedValue.join(' '));

  return highlighted.join('');
}

function highlightCSSCode(original) {
  var highlighted = [];
  var word = '';
  var flags = {
    inRule: false
  };

  var lines = original.split("\n");
  var linesLength = lines.length;
  for (var l = 0; l < linesLength; l++) {
    var line = lines[l];

    if (flags.inRule) {
      if (line.indexOf('}') !== -1) {
        flags.inRule = false;
      }
      else {
        line = line.replace(/(^ +[\w\-]+(?=\:))(.+(?=;))/, highlightCSSProperty);
      }
    }
    else {
      flags.inRule = line.indexOf('{') !== -1;
      if (flags.inRule || /\,$/.test(line)) {
        if (/ *#/.test(line)) {
          // ID selector
          line = line.replace(/#[\w\-]+/, function(match) { return '<span class="code-blue">' + match + '</span>'; });
        }
        else if (/ *\./.test(line)) {
          // Class selector
          line = line.replace(/\.[\w\-]+/, function(match) { return '<span class="code-green">' + match + '</span>'; });
        }
        else {
          // Tag selector
          line = line.replace(/[\w\-]+/, function(match) { return '<span class="code-red">' + match + '</span>'; });
        }
        line = line.replace(/\:[\w]+/, function(match) { return '<span class="code-orange">' + match + '</span>'; });
      }
    }
    highlighted.push(line);
  }

  return highlighted.join("\n");
}

const RUBY_REGEX = /(\#.+(\r|\n|\r\n)|\|[\w]+\||(\d+\.\d+|0x[\dA-F]+|\d+|[!<>+\-*\/=]| [\&\|]{1,2} )|(\b| )(if|new|else|elsif|while|case|break|switch|do|end|default|return|def [a-z][\w]+\??|class [A-Z][\w]+)(\b| )|'[^']+'|"[^"]+")/g;

function highlightRubyCode(match) {
  var replaced = ['', match, '</span>'];

  if (!isNaN(parseInt(match)) || match === 'undefined' || match === 'null' || match === 'NaN') {
    replaced[0] = '<span class="code-purple">';
  }
  else if (match[0] === '#') {
    replaced[0] = '<span class="code-gray">';
  }
  else if (/('.+'|".+")/.test(match)) {
    replaced[0] = '<span class="code-yellow">';
  }
  else if (/\|[\w]+\|/.test(match)) {
    replaced[0] = 'class="color-orange" style="font-style:italic"';
    replaced[1] = match.slice(1, match.length - 1);
    replaced.unshift('|');
    replaced.push('|');
  }
  else if (/[!<>+\-*\/=]|[\&\|]{1,2}|&[lg]t;|&amp;{1,2}|if|new|else|elsif|while|case|break|switch|do|end|default|return/.test(match)) {
    replaced[0] = '<span class="code-red">';
  }
  else if (match.trim().slice(0, 3) === 'def') {
    replaced[0] = '<span class="code-red">';
    replaced[1] = match.replace('def ', 'def</span> <span class="code-green">');
  }
  else if (match.trim().slice(0, 5) === 'class') {
    replaced[0] = '<span class="code-red">';
    replaced[1] = match.replace('class ', 'class</span> <span class="code-green">');
  }

  return replaced.join('');
}

const JS_REGEX = /\/\/.+| *\/\*[\s\S]+\*\/|((\r|\n|\r\n)|(\d+\.\d+|0x[\dA-F]+|\d+|[!<>+\-*\/=]| [\&\|]{1,2} |&[lg]t;|&amp;{1,2})|(\b| )(if|new|else|while|for|case|break|switch|default|typeof|instanceof|return|true|false|null|undefined|NaN|this|const|var|document|window|Array|Boolean|Date|Error|EvalError|Function|Map|Math|Number|Object|Promise|Proxy|RangeError|ReferenceError|RegExp|Set|String|SyntaxError|TypeError|URIError|WeakMap|([A-Z][\w]+(?=\.))|(?=\.)[a-z][\w]+(?=\()|[\w]+ \= function|(function )?[\w]+(?=\())(\b| )|'[^']+'|"[^"]+")/g;

function highlightJSCode(match) {
  var replaced = ['', match, '</span>'];
  // match = match.trim();

  if (/( *\/\/| *\/\*[\s\S]+\*\/)/.test(match)) {
    replaced[0] = '<span class="code-gray">';
  }
  else if (!isNaN(parseInt(match)) || /true|false|null|undefined|NaN/.test(match)) {
    replaced[0] = '<span class="code-purple">';
  }
  else if (match.trim() === 'this') {
    replaced[0] = '<span class="code-orange" style="font-style:italic">';
  }
  else if (/ *('.+'|".+")/.test(match)) {
    replaced[0] = '<span class="code-yellow">';
  }
  else if (/ [\w]+ \= function/.test(match)) {
    var name = match.match(/ [\w]+/);

    replaced[0] = '<span class="code-green">';
    replaced[1] = name[0] + '</span> <span class="code-red">=</span> <span class="code-cyan" style="font-style:italic;">function';
  }
  else if (/ *function/.test(match)) {
    replaced[0] = '<span class="code-cyan" style="font-style:italic">';
    // If a function declaration
    if (/function \w+/.test(match)) {
      replaced[1] = match.match(/^ */)[0] + 'function</span> <span class="code-green">' + match.replace(/ *function /, '');
    }
  }
  else if (/ *[!<>+\-*\/=]|[\&\|]{1,2}|(if|new|else|while|for|case|break|switch|default|typeof|instanceof|return)\b/.test(match)) {
    replaced[0] = '<span class="code-red">';
  }
  else if (/^ *[A-Z]/.test(match)) {
    replaced[0] = '<span class="code-cyan" style="font-style:italic">';
  }
  else {
    switch (match) {
      case "document":
      case "window":
      case "const":
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
        replaced[0] = '<span class="code-cyan" style="font-style:italic">';
        break;
      default:
        replaced[0] = '<span class="code-cyan">';
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
    doubleQuotes: false,
    styleTag: false,
    scriptTag: false
  };

  var stylesheet = '';
  var javascript = '';

  var length = original.length;
  for (var i = 0; i < length; i++) {
    if (!flags.tag) {
      if (original.slice(i, i + 4) === '&lt;' && (!flags.scriptTag || original[i + 4] === '/')) {
        if (word) {
          if (flags.styleTag) {
            highlighted.push(highlightCSSCode(word));
          }
          else if (flags.scriptTag) {
            highlighted.push(word.replace(JS_REGEX, highlightJSCode));
          }
          else {
            highlighted.push(word);
          }
        }
        if (original[i + 4] === '/') {
          highlighted.push('&lt;/<span class="code-red">');
          i += 5;
        }
        else {
          highlighted.push('&lt;<span class="code-red">');
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
        if (!/[a-zA-Z0-9]/.test(original[i])) {
          if (original[i] === ' ') {
            highlighted.push(word + ' </span>');
            i++;
          }
          else {
            highlighted.push(word + '</span>');
          }
          // Check whether this is a style or script tag
          if (word === 'style') {
            flags.styleTag = !flags.styleTag;
          }
          else if (word === 'script') {
            flags.scriptTag = !flags.scriptTag;
          }
          word = '';
          flags.tagName = false;
        }
      }
      else {
        if (!flags.doubleQuotes) {
          if (original[i] === '"') {
            flags.doubleQuotes = true;
            highlighted.push('=');
            word = '"';
            i++;
          }
          else if (original[i] === '=') {
            highlighted.push('<span class="code-green">');
            highlighted.push(word);
            highlighted.push('</span>');
            word = '';
          }
        }
        else {
          if (original[i] === '"') {
            flags.doubleQuotes = false;
            highlighted.push('<span class="code-yellow">');
            highlighted.push(word);
            highlighted.push('"</span>');
            word = '';
            i++;
          }
        }
      }

      if (flags.tag && original.slice(i, i + 4) === '&gt;') {
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

function highlightPreTagsContent() {
  var preTags = document.getElementsByTagName('pre');
  var preTagsLength = preTags.length;

  for (var i = 0; i < preTagsLength; i++) {
    var originalHTML = preTags[i].innerHTML;

    switch (preTags[i].className) {
      case 'code-c'         : preTags[i].innerHTML = highlightCCode(originalHTML); break;
      case 'code-css'       : preTags[i].innerHTML = highlightCSSCode(originalHTML); break;
      case 'code-ruby'      : preTags[i].innerHTML = originalHTML.replace(RUBY_REGEX, highlightRubyCode); break;
      case 'code-javascript': preTags[i].innerHTML = originalHTML.replace(JS_REGEX, highlightJSCode); break;
      case 'code-html'      : preTags[i].innerHTML = highlightHTMLCode(originalHTML); break;
    }
  }
}

ready(highlightPreTagsContent);
