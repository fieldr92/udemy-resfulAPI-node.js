const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true }) // avoid deprecation warning with the useNewUrlParser option
  .then(() => console.log('connected...'))
  .catch(error => console.error('error...', error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(course) {
  const newCourse = course;
  return await newCourse.save();
}

async function getCourses() {
  return await Course
  .find({ isPublished: true, tags: 'backend' })
  .sort({ name: 1 })
  .select({ name: 1, author: 1 })
}

async function run(course) {
  const courses = await getCourses();
  console.log(courses);
  // const newCourse = await createCourse(course);
  // console.log('New course:\n', newCourse);
}

const sickCourse = new Course({
  name: 'Sickhead Course',
  author: 'Ralph',
  tags: [ 'sick', 'backend' ],
  isPublished: true,
  price: 1000
});

run(sickCourse);