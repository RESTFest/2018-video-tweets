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
settings.tweetList =[];
settings.tweetTemplate = "tweet-template.txt";
settings.writeFile = "tweet-list.txt";

// top-level routine
program
  .arguments('<file>')
  .action(function(file){work(file)})
  .parse(process.argv);

// the work  
function work(file) {
  var template = "";

  if(readFile(settings.tweetTemplate, "template")) {
    if(readFile(file, "list")) {
      genTweets();
    }
  };
}

// generate tweets
function genTweets() {
  var i,x;
  var list; 

  list = parseList();  
  for(i=0,x=list.length;i<x;i++) {
    settings.tweetList.push(makeTweet(list[i]));  
  }
  writeFile(settings.writeFile,settings.tweetList);
}


// make a tweet
function makeTweet(item) {
  var output = "";

  output = settings.template;
  output = output.replace("{speaker}", item.title);
  output = output.replace("{title}", item.speaker);
  output = output.replace("{link}", item.link);
  output = output.replace("{handle}", item.handle);

  return output;
};

// parse the input file
function parseList() {
  var i,x;
  var rtn = [];
  var items = [];
  var tweet = {};

  items = settings.list.split("\n");
  for(i=0, x=items.length;i<x;i++) {
    tweet = {};
    tweet.title = items[i].split("::")[0];
    tweet.speaker = items[i].split("::")[1];
    tweet.link = items[i].split("::")[2];
    tweet.handle = items[i].split("::")[3];

    rtn.push(tweet);
  }

  return rtn;
};

// write string file
function writeFile(name,list) {
  var rtn = "";
  var i,x;

  for(i=0,x=list.length;i<x;i++) {
    rtn = rtn + list[i] + "\n";
  } 
 
  fs.writeFileSync(name,rtn);

  return true;
};

// read string file
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
