// const x =; // Gives unexpected token but also shows the way app.js calls a function (MODULE WRAPPER FUNCTION);
// above gives.. (function (exports, require, module, __filename, __dirname) { const x =; });

const url = 'http://mylogger.io/log';

console.log(__filename); // from module wrapper function
console.log(__dirname); // from module wrapper function

const log = message => {
  // Send HTTP request
  console.log(message);  
}

// module.exports.log = log; // means you have to call 'logger.log()' in app.js
// module.exports.endPoint = url; // means you have to call 'logger.endPoint()' in app.js
module.exports = log;