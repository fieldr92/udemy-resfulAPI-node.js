// Global object

console.log();

setTimeout();
clearTimeout();

setInterval();
clearInterval();

global.console.log(); // 'global' object is the same as 'window' or 'document' but is for node
// variables ARE NOT added to the global object

const message = 'hello world';
console.log(global.message); // returns undefined

// Browser object

window.console.log(); // same as console.log();