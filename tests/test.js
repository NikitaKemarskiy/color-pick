const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { getDifference } = require(path.join(__dirname, '..', 'src', 'libs', 'colors'));
const { sqrt, pow, floor } = Math;

describe('Colors', () => {
  describe('#getDifference(color1, color2)', () => {
    it('Should get euclidean distance between red and green colors', () => {
    	const red = { red: 255, green: 0, blue: 0 };
    	const green = { red: 0, green: 255, blue: 0 };
    	assert.equal(getDifference(red, green), 360);
    });
    it('Should get euclidean distance between different colors', () => {
    	const red = { red: 127, green: 163, blue: 22 };
    	const green = { red: 74, green: 255, blue: 56 };
    	assert.equal(getDifference(red, green), 111);
    });
    it('Should get euclidean distance between equal colors', () => {
    	const red = { red: 255, green: 0, blue: 0 };
    	assert.equal(getDifference(red, red), 0);
    });
  });
});
