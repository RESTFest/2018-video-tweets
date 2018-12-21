#!/usr/bin/env node
'use strict';

/* 
 * vid2tweet  utility
 * processes vimeo data into tweets
 *
 * relies on the following:
 * - https://www.npmjs.com/package/commander
 *
 * 2018-12
 * mamund
 */

var program = require('commander');
var fs = require('fs');
var settings = {};
settings.template = "";
settings.list = "";
settings.tweetTemplate = "tweet-template.txt";

// top-level routine
program
  .arguments('<file>')
  .action(function(file){work(file)})
  .parse(process.argv);

// top-level work  
function work(file) {
  var template = "";

  if(readFile(settings.tweetTemplate, "template")) {
    if(readFile(file, "list")) {
      console.log(settings.list);
    }
  };
}

// load string file
function readFile(file, name) {
  var rtn = "";

  if(fs.existsSync(file)) {
    settings[name] = fs.readFileSync(file,'utf8');
    rtn = true;
  } 
  else {
    console.log("File not found or invalid: "+file);
    rtn = false;
  }  

  return rtn;  
}

// EOF
