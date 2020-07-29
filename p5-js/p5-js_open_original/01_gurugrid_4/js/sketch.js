//==========
// p5.js

// setup=()=>{
// createCanvas(windowWidth, windowHeight);
// background(33);noStroke();x=width/2;y=height/2;a=0;o=0;i=0;j=0;}
// draw=()=>{
// if(o<1000){if(i<2){if(j<o){
// x+=8*cos(a);y+=8*sin(a);square(x,y,6);j++;return;}
// a+=HALF_PI;j=0;i++;return;}i=0;o++;}}


// setup=()=>{
// createCanvas(windowWidth, windowHeight);
// background(33);noStroke();x=width/2;y=height/2;a=0;o=0;i=0;j=0;}
// draw=()=>{
// if(o<1000){if(i<2){if(j<o){
// x+=8*cos(a);y+=8*sin(a);square(x,y,6);j++;return;}
// a+=HALF_PI;j=0;i++;return;}i=0;o++;}}

setup=()=>{createCanvas(windowWidth, windowHeight);
background(33);noStroke();x=width/2;y=height/2;a=0;o=0;i=0;j=0}
draw=()=>{if(o<1000){if(i<2){if(j<o){x+=8*cos(a);y+=8*sin(a);square(x,y,6);j++;return}
a+=HALF_PI;j=0;i++;return}i=0;o++}}