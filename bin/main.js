"use strict";

var fs = require('fs'),
      stdin = process.stdin,
      stdout = process.stdout,
      path = require('path'),
      filePath = path.join(__dirname, 'input.txt'),
      readline = require('readline'),
      rl,
      environment,
      dataArr,
      Environment = require('./Environment'),
      Roomba = require('./Roomba'),
      dirt = require('./dirt');

var roomba = new Roomba();

try {
  const fileStream = fs.createReadStream(filePath)
  var lineCount = 0

  rl = readline.createInterface({
          input: fileStream
  });

  rl.on('line', (line) => {
  ++lineCount;
  lineCheck(line, lineCount);
  });

  rl.on('close', (line) => {
    process.exit(0);
  });

} catch (err) {
  console.error(err)
}

function lineCheck(data, lineCount) {

  var data = data.replace(/\s+/g, '');//remove whitespaces

  if (hasNumber(data)) {
    if (lineCount == 1) {
      dataArr = splitNum(data) //split into array of x-axis,y-axis
      environment = new Environment(dataArr[0], dataArr[1]);//set total grid area
    }
    if (lineCount == 2) {
      dataArr = splitNum(data);
      roomba.position(dataArr[0], dataArr[1]); //set start position
    }
    else if (lineCount > 2)  {
      dirt.dirtList.push(data);
    }
  } else {
    var directionArr = Array.from(data) //turns direction string to array of each character e.g [N,S,W]

    for (var i = 0, len = directionArr.length; i < len; i += 1) { //loop to iterate through array of directions
        roomba.move(directionArr[i], environment)
    }
    console.log(roomba.x, roomba.y);
    console.log(dirt.dirtCleaned);
  }
}

//helper functions
function splitNum(data) { //split number into array of strings
  var dataArr = [],
      stringData = data.toString();

  for (var i = 0, len = stringData.length; i < len; i += 1) {
      dataArr.push(+stringData.charAt(i));
  }
  return dataArr
}

function hasNumber(myString) { //check if numeric
  return /\d/.test(myString);
}
