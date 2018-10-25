const Joi = require('joi'); // Input validation helper (look up 'npm joi')
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
]

// GET

app.get('/', (req, res) => {
  res.send('Hello world'); // ['Hello world']
});

app.get('/api/courses', (req, res) => {
  res.send(courses); // [1,2,3,4]
});

app.get('/api/courses/:id', (req, res) => {
  // res.send(req.params.id); // http://localhost:3000/api/courses/1 // result '1' as it is defined after '/api/courses/'
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('404 - not found'); // http://localhost:3000/api/courses/4 // '404 - not found' and also shown in DevTools Network tab when refreshed
  res.send(course); // http://localhost:3000/api/courses/2 // {"id":2,"name":"course2"}
});

// POST - post new data

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body); // Validate req.body against schema // { error } destructuring result from validate course
  if (error) return res.status(400).send(error.details[0].message); // .send(error) gives too much information to the client // 'error' used in if as destructured above

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// PUT - for updating data

app.put('/api/courses/:id', (req, res) => { // on POSTMAN, use url: http://localhost:3000/api/courses/{id}
  // Look up course
  // If doens't exist, return 404
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('404 - not found');

  // Validate
  // If invalid, return 400 - Bad req
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update course
  // Return updated course
  course.name = req.body.name;
  res.send(course);
});

const validateCourse = course => {
  const schema = {
    name: Joi.string().min(3).required() // Input must be a string, min 3 characters and this is required...
  };
  return Joi.validate(course, schema); // Validate req.body against schema
}

// DELETE

app.delete('/api/courses/:id', (req, res) => {
  // Look up course
  // Not existing, return 404
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('404 - not found');

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return same course
  res.send(course);
});

// PORT
const port = process.env.PORT || 3000; // either port assigned and if not assigned, 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));