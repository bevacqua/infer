'use strict';

var fs = require('fs');
var validator = require('validator');
var everyone = (
  fs.readFileSync('./data/names.txt', 'utf8') +
  fs.readFileSync('./data/nombres.txt', 'utf8')
).split('\n');
var separators = /[._-]/g;

module.exports = infer;

function first (text) {
  var exact = everyone.indexOf(text);
  if (exact !== -1) {
    return everyone[exact];
  }
}

function extractFromParts (parts) {
  var i = 0, len = parts.length;
  var longest = '';
  var current;
  for (; i < len; i++) {
    current = first(parts[i]);
    if (current) {
      return { result: current, matched: true };
    } else if (parts[i].length > longest.length) {
      longest = parts[i];
    }
  }
  return { result: longest };
}

function isEmail (text) {
  return email.test(text);
}

function infer (input, placeholder, strict) {
  var p = placeholder || 'you';
  var email = String(input);
  var valid = validator.isEmail(email);
  if (!valid) {
    return p;
  }
  var local = email.split('@')[0];
  if (!local) {
    return p;
  }
  var beforeLabel = local.split('+')[0];
  if (!beforeLabel) {
    return p;
  }
  var exact;
  var parts = beforeLabel.split(separators);
  if (parts.length > 1) {
    exact = exactFromParts(parts);
    return exact.matched ? exact.result : (strict ? p : exact.result || placeholder);
  }

  var match = first(beforeLabel);
  if (match) {console.log(match);
    return match;
  }
  return strict ? p : beforeLabel;
}
