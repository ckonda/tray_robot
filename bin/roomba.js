"use strict";

var dirt = require('./dirt');

function Roomba(){

}

Roomba.prototype.position = function(xPosition, yPosition) {
  this.x = xPosition;
  this.y = yPosition;
}

function dirtRemoval(dirtList, coordinate) {
  var index = dirtList.indexOf(coordinate);
  dirt.dirtList.splice(index, 1)
  ++(dirt.dirtCleaned)
}

Roomba.prototype.move = function(direction, environment) {
   var coordinate;
   switch(direction){
       case 'N':
            if(this.y < (environment.yAxis - 1)){ //ensure within environment parameter. If goes upto wall, no action taken
                this.y += 1;
            }
            coordinate = "" + this.x + this.y//concat x,y together to make string

            if (dirt.dirtList.includes(coordinate)) {//check if string is part of dirt list
              dirtRemoval(dirt.dirtList, coordinate) //if so, remove from dirt list and increment dirt cleaned
            }
            break;
       case 'S':
            if(this.y > 0){
                this.y -= 1;
            }
            coordinate = "" + this.x + this.y

            if (dirt.dirtList.includes(coordinate)) {
              dirtRemoval(dirt.dirtList, coordinate)
            }
            break;
       case 'E':
            if(this.x < (environment.xAxis - 1)){
                this.x += 1;
            }
            coordinate = "" + this.x + this.y;

            if (dirt.dirtList.includes(coordinate)) {
              dirtRemoval(dirt.dirtList, coordinate)
            }
            break;
       case 'W':
            if(this.x > 0){
                this.x -= 1;
            }
            coordinate = "" + this.x + this.y;

            if (dirt.dirtList.includes(coordinate)) {
              dirtRemoval(dirt.dirtList, coordinate)
            }
            break;
   }
};

module.exports = Roomba;
