const fs = require('fs');

// Synchronous calling of readdir (read directory)
// const files = fs.readdirSync('./');
// console.log(files);

// Ascynchronous calling, which takes to arguments, 'err' and 'files' ('files' is the result if there is no error)

fs.readdir('./', (err, files) => {
  if (err) console.log('Error', err);
  else console.log('Result', files);
})
