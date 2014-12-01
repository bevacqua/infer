'use strict';

var test = require('tape');
var infer = require('..');
var placeholder = 'Unknown';
var cases = {
  'should fail for numbers': { input: 1, expect: placeholder },
  'should fail for dates': { input: new Date(), expect: placeholder },
  'should fail for non-emails': { input: 'carlos', expect: placeholder },
  'should fail for incomplete labelled non-emails': { input: '+carlos@gmail.com', expect: placeholder },
  'should return carlos under obvious conditions': { input: 'carlos@gmail.com', expect: 'carlos' },
  'should return charles under obvious conditions': { input: 'charles@gmail.com', expect: 'charles' },
  'should return nicolas under not-so-obvious conditions': { input: 'nicolasbevacqua@gmail.com', expect: 'nicolasbevacqua' },
  'should return nicolas even if name comes last': { input: 'bevacquanicolas@gmail.com', expect: 'bevacquanicolas' },
  'should return nico under abbreviations': { input: 'nico.bevacqua@gmail.com', expect: 'bevacqua' },
  'should return full local when cannot make sense': { input: 'foreverbevacqua@gmail.com', expect: 'foreverbevacqua' },
  'should return bevacqua when abbreviations are shorter than three chars': { input: 'ni.bevacqua@gmail.com', expect: 'bevacqua' },
  'should return eva when partially matched': { input: 'eva.longoria@gmail.com', expect: 'eva' },
  'should ignore labels': { input: 'charles+junk@gmail.com', expect: 'charles' },
  'should return nicolas when partially matched': { input: 'nicolas_bevacqua+spam@gmail.com', expect: 'nicolas' },
  'should return Unknown when strict if unmatched': { input: 'nicolass_bevacqua+spam@gmail.com', expect: 'Unknown', strict: true }
};

Object.keys(cases).forEach(addCase);

function addCase (tc) {
  test(tc, testCase.bind(null, cases[tc]));
}

function testCase (c, t) {
  var name = infer(c.input, placeholder, c.strict);
  t.equal(name, c.expect, 'inferred name matches expectation for ' + c.input);
  t.end();
}
