const http = require('http');

// Basic set up for a server which is not really used because of Express... there would be too much code to set up all the routing

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello world');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// server.on('connection', socket => {
//   console.log('New connection');
// });

server.listen(3000);

console.log('Listening on port 3000...');