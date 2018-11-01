const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log('connected exercise3...'))
  .catch(error => console.error('Error:', error));

const schemas = {
  course: {
    name: String,
    author: String,
    isPublished: Boolean,
    tags: [ String ],
    price: Number,
    date: { type: Date, default: Date.now }
  }
}

const courseSchema = mongoose.Schema(schemas.course);
const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
  .find({ isPublished: true })
  .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
  .select('name price');
}

async function logCourses() {
  const courses = await getCourses();
  console.log(courses);
}

logCourses();