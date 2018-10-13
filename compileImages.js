#! /usr/local/bin/node
'use strict';

const fs = require('fs');
const path = require('path');

const imageDirectory = 'img/gallery';
const outputFilename = 'images.json';

function buildJSON(error, data) {
  if (error) {
    throw error;
  }
  const images = data.map(img => {
    return path.join('/', imageDirectory, '/', img);
  });

  fs.writeFile(outputFilename, JSON.stringify(images), (error, data) => {
    if(error)
    {
      console.error('oh noes')
      return console.log(require('util').inspect(error));
    }

    console.log('Images successfully compiled to', outputFilename);
  });

}

// read directory, build JSON with info about files.
fs.readdir(imageDirectory, buildJSON);
