const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log('connected exercise2...'))
  .catch(error => console.error('Error:', error));

const schemas = {
  course: {
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    date: { type: Date, default: Date.now },
    tags: [ String ]
  }
}

const courseSchema = new mongoose.Schema(schemas.course)

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
  .find({ tags: { $in: [ 'frontend', 'backend' ] }, isPublished: true })
  .sort({ price: -1 })
  .select('name author price')
}

async function logCourses() {
  const courses = await getCourses();
  console.log(courses);  
}

logCourses();
