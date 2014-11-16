var args = process.argv.slice(2),
    concat = require('concat'),
    files = args.slice(0,-1),
    output = args[1];
//module.exports = function() {
    /*concat(files, output, function (error) {
      if(error) console.error(error);
      console.log('done');
    });*/
//};
console.log(files);
