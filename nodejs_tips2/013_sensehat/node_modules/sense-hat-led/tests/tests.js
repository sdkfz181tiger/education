'use strict';
const assert = require('assert');
const sense = require('sense-hat-led');

const sleep = sense.sync.sleep;

const X = [248, 248, 248]; // black
const O = [0, 0, 0]; // White

const arrow = [
  O, O, O, O, X, O, O, O,
  O, O, O, O, X, X, O, O,
  O, O, O, O, X, X, X, O,
  O, O, O, O, X, X, X, X,
  O, O, O, O, X, O, O, O,
  O, O, O, O, X, O, O, O,
  O, O, O, O, X, O, O, O,
  O, O, O, O, X, O, O, O
];

const G = [56, 252, 0];

const si = [
  O, O, O, G, G, O, O, O,
  O, O, G, G, G, G, O, O,
  O, G, G, G, G, G, G, O,
  G, G, O, G, G, O, G, G,
  G, G, G, G, G, G, G, G,
  O, O, G, O, O, G, O, O,
  O, G, O, G, G, O, G, O,
  G, O, G, O, O, G, O, G,
];

let lst = ' +-*/!"#$><0123456789.=)(ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?,;:|@%[&_\']\~';
let abc = 'abcdefghijklmnopqrstuvwxyz';

let t = 0.2;

sense.sync.clear();
sense.sync.setRotation(180);


sense.sync.showMessage(lst, t / 10);
sleep(t);

sense.sync.showLetter('A');
sleep(t);


const B = [248, 252, 248];

const A = [
  O, O, O, O, O, O, O, O,
  O, O, B, B, B, O, O, O,
  O, B, O, O, O, B, O, O,
  O, B, O, O, O, B, O, O,
  O, B, B, B, B, B, O, O,
  O, B, O, O, O, B, O, O,
  O, B, O, O, O, B, O, O,
  O, B, O, O, O, B, O, O,
];


assert.deepStrictEqual(A, sense.sync.getPixels());

sense.sync.flashMessage(abc, t);

sense.sync.clear();
assert.deepStrictEqual(new Array(64).fill([0, 0, 0]), sense.sync.getPixels());


sense.sync.setRotation(0);
sleep(t);
sense.sync.setPixels(arrow);
assert.deepStrictEqual(arrow, sense.sync.getPixels());
sleep(t);
sense.sync.flipV();
sleep(t);
sense.sync.flipV();
assert.deepStrictEqual(arrow, sense.sync.getPixels());
sleep(t);
sense.sync.flipH();
sleep(t);
sense.sync.flipH();
assert.deepStrictEqual(arrow, sense.sync.getPixels());
sleep(t);
sense.sync.setRotation(90);
assert(sense.sync.rotation === 90);
sleep(t);
sense.sync.setRotation(180);
assert(sense.sync.rotation === 180);
sleep(t);
sense.sync.setRotation(270);
assert(sense.sync.rotation === 270);
sleep(t);
sense.sync.setRotation(0);
assert(sense.sync.rotation === 0);
assert.deepStrictEqual(arrow, sense.sync.getPixels());
sleep(t);
sense.sync.rotation = 90;
assert(sense.sync.rotation === 90);
sleep(t);
sense.sync.rotation = 180;
assert(sense.sync.rotation === 180);
sleep(t);
sense.sync.rotation = 270;
assert(sense.sync.rotation === 270);
sleep(t);
sense.sync.rotation = 0;
assert(sense.sync.rotation === 0);
assert.deepStrictEqual(arrow, sense.sync.getPixels());


sleep(t);
for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    sense.sync.setPixel(x, y, [248 - (x * 32), 248 - (y * 32), 248 - (x + y) * 16]);
  }
}

for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    assert.deepStrictEqual(sense.sync.getPixel(x, y), [248 - (x * 32), 248 - (y * 32), 248 - (x + y) * 16]);
  }
}
sleep(t);
sense.sync.clear();
sense.sync.rotation = 180;
assert(sense.sync.rotation === 180);

let picture = sense.sync.loadImage('./space_invader.png');
assert.deepStrictEqual(sense.sync.getPixels(), si);
sleep(t);

sense.sync.clear(255, 255, 255);
sense.sync.lowLight = true;
sense.sync.sleep(t);
sense.sync.lowLight = false;

sense.sync.clear(255, 127, 0);

assert(sense.sync.gamma.toString() === '0,0,0,0,0,0,1,1,2,2,3,3,4,5,6,7,8,9,10,11,12,14,15,17,18,20,21,23,25,27,29,31');
sense.sync.sleep(t);
sense.sync.gamma = sense.sync.gamma.reverse();
assert(sense.sync.gamma.toString() === '31,29,27,25,23,21,20,18,17,15,14,12,11,10,9,8,7,6,5,4,3,3,2,2,1,1,0,0,0,0,0,0');
sense.sync.sleep(t);
sense.sync.lowLight = true;
assert(sense.sync.gamma.toString() === '0,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,3,3,3,4,4,5,5,6,6,7,7,8,8,9,10,10');
sense.sync.sleep(t);
sense.low_light = false;

sense.sync.clear(255, 127, 0);
sense.sync.sleep(t);
sense.sync.gamma = new Array(32).fill(0); // Will turn the LED matrix off
sense.sync.sleep(t);
sense.sync.gammaReset();

console.log('done sync');

var async = require("async");

let timeout = (callback) => setTimeout(callback, t * 1000);

async.series(
  [(callback) => sense.clear(255, 0, 0, callback),
    timeout,
    sense.clear,
    (callback) => sense.setRotation(180, true, callback),
    (callback) => sense.showMessage(lst, t / 10, callback),
    sense.clear,
    (callback) => sense.showLetter('A', callback),
    (callback) => sense.getPixels((error, pixelList) => {
      if (error) console.error(error.message);
      assert.deepStrictEqual(A, pixelList);
      callback();
    }),
    timeout,
    sense.clear,
    (callback) => sense.flashMessage(abc, t, callback),
    timeout,
    sense.clear,
    (callback) => sense.setRotation(0, callback),
    (callback) => sense.setPixels(arrow, callback),
    timeout,
    sense.flipV,
    timeout,
    sense.flipV,
    (callback) => sense.getPixels((error, pixelList) => {
      if (error) console.error(error.message);
      assert.deepStrictEqual(arrow, pixelList);
      callback();
    }),
    timeout,
    sense.flipH,
    timeout,
    sense.flipH,
    (callback) => sense.getPixels((error, pixelList) => {
      if (error) console.error(error.message);
      assert.deepStrictEqual(arrow, pixelList);
      callback();
    }),
    timeout,
    (callback) => sense.setRotation(90, callback),
    (callback) => {
      assert(sense.rotation === 90);
      callback();
    },
    timeout,
    (callback) => sense.setRotation(180, callback),
    (callback) => {
      assert(sense.rotation === 180);
      callback();
    },
    timeout,
    (callback) => sense.setRotation(270, callback),
    (callback) => {
      assert(sense.rotation === 270);
      callback();
    },
    timeout,
    (callback) => sense.setRotation(0, callback),
    (callback) => {
      assert(sense.rotation === 0);
      sense.getPixels((error, pixelList) => {
        if (error) console.error(error.message);
        assert.deepStrictEqual(arrow, pixelList);
        callback();
      });
    },
    timeout,
    (callback) => {
      function fill(x, y) {
        if (x === 8) {
          x = 0;
          y++;
        }
        if (y === 8) return callback();
        sense.setPixel(x, y, [248 - (x * 32), 248 - (y * 32), 248 - (x + y) * 16], () => fill(x + 1, y));
      }
      fill(0, 0);
    },
    timeout,
    (callback) => {
      function read(x, y) {
        if (x === 8) {
          x = 0;
          y++;
        }
        if (y === 8) return callback();
        sense.getPixel(x, y, (error, data) => {
          assert.deepStrictEqual(data, [248 - (x * 32), 248 - (y * 32), 248 - (x + y) * 16]);
          read(x + 1, y);
        });
      }
      read(0, 0);
    },
    (callback) => sense.setRotation(180, false, callback),
    (callback) => sense.loadImage('./space_invader.png', true, callback),
    (callback) => sense.getPixels((error, pixelList) => {
      if (error) console.error(error.message);
      assert.deepStrictEqual(si, pixelList);
      callback();
    }),
    sense.clear,
    (callback) => {
      sense.getPixels((error, pixelList) => {
        if (error) console.error(error.message);
        assert.deepStrictEqual(new Array(64).fill([0, 0, 0]), pixelList);
        callback();
      });
    }
  ]
);
