var fs = require('fs');
var os = require('os');
const webpackGenerator = require('./webpackCompiler.js');
const pageGenerator = require('./PageGenerator.js');

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

fs.readFile(process.argv[2], 'utf8', function(err,data){
    if(err) {
        console.log('Filename has error')
        throw err;
    }
    config = JSON.parse(data);
    // webpackGenerator();
    pageGenerator(config.pages);
})

