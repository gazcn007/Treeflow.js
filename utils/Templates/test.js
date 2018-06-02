var fs = require('fs')
fs.readFile('./Diagram.jvt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/@IMPORTS@/g, 'replacement');

  fs.writeFile('./DiagramN.jvt', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
