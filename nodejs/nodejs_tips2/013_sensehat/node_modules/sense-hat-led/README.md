# Control a Raspberry Pi Sense HAT LED Display with Node

Fork of Jochen Hinrichsen's sense hat library see:

https://github.com/jhinrichsen/sense-hat-matrix

### Install:

Install the Sense HAT software by opening a Terminal window and entering the following commands (while connected to the Internet):

`npm install sense-hat-led`

### Usage:

example:

```javascript
"use strict";
const sense = require("sense-hat-led");

sense.setPixel(0, 7, [244,0,0], (err) => {
  sense.getPixel(0, 7, (err, color) => {
    console.log(color);
  }
});

```

API should follow the sense hat pthon library see (http://pythonhosted.org/sense-hat/api/#led-matrix) except all methods are camelCase and an added callback as the last parameter of the asynchronous methods. The callbacks are passed arguments (err, data), where data is the return value (if any) of the synchronous version of the function. 

The synchronous functions are methods of the sync object.

example:
```javascript
"use strict";
const sense = require("sense-hat-led").sync;

sense.setPixel(0,7,[244,0,0]);
var color = sense.getPixel(0,7);

```

All LED Matrix methods are implemented. For sensors see nodeimu at:

https://www.npmjs.com/package/nodeimu

## Sense HAT LED MATRIX API Reference

### setRotation

If you're using the Pi upside down or sideways you can use this function to correct the orientation of the image being shown.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`r` | Integer | `0` `90` `180` `270` | The angle to rotate the LED matrix though. `0` is with the Raspberry Pi HDMI port facing downwards.
`redraw` | Boolean | `true` `false` | Whether or not to redraw what is already being displayed on the LED matrix. Defaults to `true`

Returned / callback data type | Explanation
--- | ---
None |

```javascript
var sense = require("sense-hat-led");

sense.setRotation(180);
# alternatives
sense.rotation = 180;
```
- - -
### flipH

Flips the image on the LED matrix horizontally.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`redraw` | Boolean | `true` `false` | Whether or not to redraw what is already being displayed on the LED matrix. Defaults to `true`

Returned / callback data type | Explanation
--- | ---
Array | An array containing 64 smaller arrays of `[R, G, B]` pixels (red, green, blue) representing the flipped image.

```javascript
var sense = require("sense-hat-led");

sense.flipH();
```
- - -
### flipV

Flips the image on the LED matrix vertically.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`redraw` | Boolean | `true` `false` | Whether or not to redraw what is already being displayed on the LED matrix when flipped. Defaults to `true`

Returned / callback data type | Explanation
--- | ---
Array | An array containing 64 smaller arrays of `[R, G, B]` pixels (red, green, blue) representing the flipped image.

```javascript
var sense = require("sense-hat-led");

sense.flipV();
```
- - -
### setPixels

Updates the entire LED matrix based on a 64 length array of pixel values.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`pixelArray` | Array | `[[R,G,B]*64]` | An array containing 64 smaller arrays of `[R, G, B]` pixels (red, green, blue). Each R-G-B element must be an integer between 0 and 255.

Returned / callback data type | Explanation
--- | ---
None |

```javascript
var sense = require("sense-hat-led");

var X = [255, 0, 0];  // Red
var O = [255, 255, 255];  // White

var questionMark = [
O, O, O, X, X, O, O, O,
O, O, X, O, O, X, O, O,
O, O, O, O, O, X, O, O,
O, O, O, O, X, O, O, O,
O, O, O, X, O, O, O, O,
O, O, O, X, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, O, X, O, O, O, O
];

sense.setPixels(questionMark);
```
- - -
### getPixels

Returned / callback data type | Explanation
--- | ---
Array | An array containing 64 smaller arrays of `[R, G, B]` pixels (red, green, blue) representing the currently displayed image.

```javascript
var sense = require("sense-hat-led").sync;

var pixelArray = sense.getPixels();
```

async:

```javascript
var sense = require("sense-hat-led");

sense.getPixels((err, pixelArray)=>{
  console.log(pixelArray[0])
});
```


Note: You will notice that the pixel values you pass into `setPixels` sometimes change when you read them back with  `getPixels`. This is because we specify each pixel element as 8 bit numbers (0 to 255) but when they're passed into the Linux frame buffer for the LED matrix the numbers are bit shifted down to fit into RGB 565. 5 bits for red, 6 bits for green and 5 bits for blue. The loss of binary precision when performing this conversion (3 bits lost for red, 2 for green and 3 for blue) accounts for the discrepancies you see.

The `getPixels` function provides a correct representation of how the pixels end up in frame buffer memory after you've called `setPixels`.


- - -
### setPixel

Sets an individual LED matrix pixel at the specified X-Y coordinate to the specified colour.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`x` | Integer | `0-7` | 0 is on the left, 7 on the right.
`y` | Integer |  `0-7` | 0 is at the top, 7 at the bottom.
Colour can either be passed as an RGB array: |||
`pixel` | Array |  `(r, g, b)` | Each element must be an integer between 0 and 255.
Or three separate values for red, green and blue: |||
`r` | Integer |  `0-255` | The Red element of the pixel.
`g` | Integer |  `0-255` | The Green element of the pixel.
`b` | Integer |  `0-255` | The Blue element of the pixel.

Returned / callback data type | Explanation
--- | ---
None |

```javascript
var sense = require("sense-hat-led").sync;

// examples using (x, y, r, g, b)

sense.setPixel(0, 0, 255, 0, 0);
sense.setPixel(0, 7, 0, 255, 0);
sense.setPixel(7, 0, 0, 0, 255);
sense.setPixel(7, 7, 255, 0, 255);

red = [255, 0, 0];
green = [0, 255, 0];
blue = [0, 0, 255];

// examples using (x, y, pixel)

sense.setPixel(0, 0, red);
sense.setPixel(0, 0, green);
sense.setPixel(0, 0, blue);
```
- - -
### getPixel

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`x` | Integer |  `0 - 7` | 0 is on the left, 7 on the right.
`y` | Integer |  `0 - 7` | 0 is at the top, 7 at the bottom.

Returned / callback data type | Explanation
--- | ---
Array | Returns An array of `[R, G, B]` representing the colour of an individual LED matrix pixel at the specified X-Y coordinate.

```javascript
var sense = require("sense-hat-led").sync;

var topLeftPixel = sense.getPixel(0, 0);
```
async:

```javascript
var sense = require("sense-hat-led");

sense.getPixel(0, 0 , (err, topLeftPixel)=>{
  console.log(topLeftPixel[0]); // red value
});
```



Note: Please read the note under `getPixels`
- - -
### loadImage

Loads an image file, converts it to RGB format and displays it on the LED matrix. The image must be 8 x 8 pixels in size.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`filePath` | String | Any valid file path. | The file system path to the image file to load.
`redraw` | Boolean | `true` `false` | Whether or not to redraw the loaded image file on the LED matrix. Defaults to `true`

```javascript
var sense = require("sense-hat-led");

sense.loadImage("space_invader.png");
```

Returned / callback data type | Explanation
--- | ---
Array | An array containing 64 smaller arrays of `[R, G, B]` pixels (red, green, blue) representing the loaded image after RGB conversion.

```javascript
var sense = require("sense-hat-led").sync;

var invaderPixels = sense.loadImage("space_invader.png", redraw=false);
```

async:

```javascript
var sense = require("sense-hat-led");

sense.loadImage("space_invader.png", redraw=false (err, invaderPixels) =>{
  console.log(invaderPixels.length);
});

```
- - -
### clear

Sets the entire LED matrix to a single colour, defaults to blank / off.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`colour` | Array | `(r,g,b)` | An array containing the RGB (red, green, blue) values of the colour. Each element must be an integer between 0 and 255. Defaults to `(0, 0, 0)`.

Alternatively, the RGB values can be passed individually:

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`r` | Integer |  `0 - 255` | The Red element of the colour.
`g` | Integer |  `0 - 255` | The Green element of the colour.
`b` | Integer |  `0 - 255` | The Blue element of the colour.

```javascript
var sense = require("sense-hat-led").sync;

var red = [255, 0, 0];

sense.clear();  // no arguments defaults to off
sense.clear(red) // passing in an RGB array
sense.clear(255, 255, 255);  // passing in r, g and b values of a colour
```
- - -
### showMessage

Scrolls a text message from right to left across the LED matrix and at the specified speed, in the specified colour and background colour.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`textString` | String | Any text string. | The message to scroll.
`scrollSpeed` | Number | Any positive number. | The speed at which the text should scroll. This value represents the time paused for between shifting the text to the left by one column of pixels. Defaults to `0.1`
`textColour` | Array | `[R,G,B]` | An array containing the R-G-B (red, green, blue) colour of the text. Each R-G-B element must be an integer between 0 and 255. Defaults to `[255, 255, 255]` white.
`backColour` | Array | `[R,G,B]` | An array containing the R-G-B (red, green, blue) colour of the background. Each R-G-B element must be an integer between 0 and 255. Defaults to `[0, 0, 0]` black / off.

Returned / callback data type | Explanation
--- | ---
None |

```javascript
var sense = require("sense-hat-led");

sense.showMessage("One small step for Pi!", [255, 0, 0], done);

function done(){
  console.log("finished message")
}

```
- - -
### showLetter

Displays a single text character on the LED matrix.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`s` | String | A text string of length 1. | The letter to show.
`textColour` | Array | `[R,G,B]` | An array containing the R-G-B (red, green, blue) colour of the letter. Each R-G-B element must be an integer between 0 and 255. Defaults to `[255, 255, 255]` white.
`backColour` | Array | `[R,G,B]` | An array containing the R-G-B (red, green, blue) colour of the background. Each R-G-B element must be an integer between 0 and 255. Defaults to `[0, 0, 0]` black / off.

Returned / callback data type | Explanation
--- | ---
None |

```javascript
var sense = require("sense-hat-led").sync;


for (var i = 10; i > 0; i--){
    sense.showLetter(i.toString());
    sense.sleep(0.5);
}

```

async:

```javascript
var sense = require("sense-hat-led");

function flash(message) {
  if (message.length === 0) return;
    
  showLetter(message[0], () => {
    if (error) return console.error(error.message);
    setTimeout(flash, speed * 1000, message.slice(1));
  });
}

flash("hello");
  
```

- - -
### flashMessage

Flashes a text message one character at a time LED matrix and at the specified speed, in the specified colour and background colour.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`textString` | String | Any text string. | The message to flash.
`speed` | Number | Any number. | The speed at which the text should flash. This value represents the time paused for between letters. Defaults to `0.1`
`textColour` | Array | `[R,G,B]` | An array containing the R-G-B (red, green, blue) colour of the text. Each R-G-B element must be an integer between 0 and 255. Defaults to `[255, 255, 255]` white.
`backColour` | Array | `[R,G,B]` | An array containing the R-G-B (red, green, blue) colour of the background. Each R-G-B element must be an integer between 0 and 255. Defaults to `[0, 0, 0]` black / off.

Returned / callback data type | Explanation
--- | ---
None |

```javascript
var sense = require("sense-hat-led");

sense.flashMessage("One small step for Pi!", 0.2);

```
- - -
### lowLight

Toggles the LED matrix low light mode, useful if the Sense HAT is being used in a dark environment.

```javascript
var sense = require("sense-hat-led").sync;

sense.clear(255, 255, 255);
sense.lowLight = true;
sense.sleep(2);
sense.lowLight = false;
```
- - -
### gamma

For advanced users. Most users will just need the lowLight Boolean property above. The Sense HAT API uses 8 bit (0 to 255) colours for R, G, B. When these are written to the Linux frame buffer they're bit shifted into RGB 5 6 5. The driver then converts them to RGB 5 5 5 before it passes them over to the ATTiny88 AVR for writing to the LEDs.

The gamma property allows you to specify a gamma lookup table for the final 5 bits of colour used. The lookup table is a list of 32 numbers that must be between 0 and 31. The value of the incoming 5 bit colour is used to index the lookup table and the value found at that position is then written to the LEDs.

Type | Valid values | Explanation
--- | --- | --- 
Array	| Array of length 32 containing Integers between 0 and 31 | Gamma lookup table for the final 5 bits of colour

```javascript
var sense = require("sense-hat-led").sync;

sense.clear(255, 127, 0);
console.log(sense.gamma);
sense.sleep(2);

sense.gamma = sense.gamma.reverse();
console.log(sense.gamma);
sense.sleep(2);

sense.lowLight = true;
console.log(sense.gamma);
sense.sleep(2);

sense.lowLight = false;
```
- - -
### gammaReset

A function to reset the gamma lookup table to default, ideal if you've been messing with it and want to get it back to a default state.

Returned: none

```javascript
var sense = require("sense-hat-led").sync;

sense.clear(255, 127, 0);
sense.sleep(2);
sense.gamma = new Array(32).fill(0);  // Will turn the LED matrix off
sense.sleep(2);
sense.gammaReset();
```
- - -
### sleep

NOTE: Synchronous only. These calls will block execution of all JavaScript by halting Node.js' event loop!!

for the asynchronous functions use setTimeout instead.

Parameter | Type | Valid values | Explanation
--- | --- | --- | ---
`time` | Number | Any number. | the time in seconds to pause

Returned / callback data type | Explanation
--- | ---
None |

```javascript
var sense = require("sense-hat-led").sync;


function flashRed(){
  sense.clear([255, 0, 0]);
  sense.sleep(0.1);
  sense.clear(); 
}
```
asynchronous alternative (recommended)

```javascript
var sense = require("sense-hat-led");

function flashRed(){
  sense.clear([255, 0, 0]);
  setTimeout(sense.clear, 100);
}

// or

function flashGreenThenDoSomething(callback){
  sense.clear([0, 0, 255]);
  setTimeout(sense.clear, 100, callback);
}

// or with error checking

function flashBlueThenDoSomething(callback){
  sense.clear([0, 255, 0], (err) => {
    if (err) return console.error(err.message);
    setTimeout(() => {
      sense.clear((err) => {
        if (err) return console.error(err.message);
        callback(null);
      }
    }), 100);
  });
}


```
