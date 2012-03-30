var yaml = require('yaml');
var fs = require('fs');

var arguments = process.argv.splice(2);
var source = arguments[0];
var target = arguments[1];

if(source.charAt(source.length - 1) == '/') {
  source = source.slice(0, -1);
}

var config = source + '/restatic.yml';
var optimized = '';

var fileContents = fs.readFile(config, function(err, fileContents) {
  var yaml = require('yaml');
  fileContents = fileContents.toString();
  fileContents = '\n' + fileContents;

  var commentedLine = false;

  for (var i = 0; i <= fileContents.length; i++) {
    if(typeof fileContents[i + 1] != 'undefined') {
      if(fileContents[i] != '\n') {
        if(commentedLine != true) {
          optimized = optimized + fileContents[i];
        }
      } else {
        if(fileContents[i + 1] == '#') {
          commentedLine = true;
        } else {
          commentedLine = false;
        }
      }
    }
  }

  optimized = yaml.eval(optimized);
  var key = optimized.googleSpreadSheetKey;
  var delimiters = optimized.delimiter;

  delimiters = delimiters.replace(" ", "");
  delimiters = delimiters.split(",");

  console.log(key);
  console.log(delimiters[0]);
  console.log(delimiters[1]);
})