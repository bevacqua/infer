'use strict';

var fs = require('fs');
var validator = require('validator');
var everyone = (
  fs.readFileSync('./data/names.txt', 'utf8') +
  fs.readFileSync('./data/nombres.txt', 'utf8')
).split('\n');

module.exports = infer;

function first (text, exactOnly) {
  var exact = everyone.indexOf(text);
  if (exact !== -1) {
    return everyone[exact];
  }
  if (exactOnly) {
    return;
  }
  var i = 0, len = everyone.length;
  var partial = '';
  var current;

  for (; i < len; i++) {
    current = everyone[i];
    if (text.indexOf(current) !== -1 && current.length > partial.length) {
      partial = current;
    }
  }

  return partial;
}

function exactFromParts (parts) {
  var i = 0, len = parts.length;
  var longest = '';
  var current;
  for (; i < len; i++) {
    current = first(parts[i], true);
    if (current) {
      return current;
    } else if (parts[i].length > longest.length) {
      longest = parts[i];
    }
  }
  return longest;
}

function isEmail (text) {
  return email.test(text);
}

function infer (input, placeholder) {
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
  var parts = local.split('.');
  if (parts.length > 1) {
    return exactFromParts(parts) || beforeLabel;
  }

  var match = first(beforeLabel);
  var idx = beforeLabel.indexOf(match);
  if (match && idx === 0 || idx + match.length === beforeLabel.length) {
    return match;
  }
  return beforeLabel;
}
