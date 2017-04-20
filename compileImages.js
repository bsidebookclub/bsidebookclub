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

  fs.writeFile(outputFilename, JSON.stringify(images));
}

// read directory, build JSON with info about files.
fs.readdir(imageDirectory, buildJSON);

console.log('Images successfully compiled to', outputFilename);
