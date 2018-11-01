const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Courses', courseSchema); // arg 1 = model name, arg 2 = schema that defines shape of documents in section // THIS IS A CLASS

async function createCourse() {
  const course = new Course({ // object made from courseSchema model / class
    name: 'Node.js course',
    author: 'Devin',
    tags: [ 'createjs', 'frontend' ],
    isPublished: false // date not defined because we have that defaulted!
  });
  const result = await course.save(); // 'save()' is a asynchronous action
  console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    .find({ author: 'Ralph', isPublished: true })
    // .find({ price: { $gte: 10, $lte: 20 } }) // greater than or equal to 10 and less than or equal to 20
    // .find({ price: { $in: [ 10, 20, 30 ] } }) // includes prices that either EITHER 10, 20 or 30
    // .find()
    // .or([{ author: 'Ralph' }, { isPublished: true }])
    // .and([{ author: 'Ralph' }, { isPublished: true }])
    // .find({ author: /^Ral/i }) // starts with "ral"
    // .find({ author: /Hamedani$/i }) // ends with "hamedani"
    // .find({ author: /.*ral.*/i }) // contains "ral"
    // .skip((pageNumber - 1) * pageSize) // get documents on a given page
    // .limit(10)
    .sort({ name: 1 }) // '1' orders is ascending order, '-1' is descending
    .select({ name: 1, tags: 1, author: 1 }) // shows only name and tags
    // .countDocuments(); // count of how many documents match your filter
  console.log(courses);
}

async function updateCourse(id) {
  // Query first method
  // const course = await Course.findById(id);
  // if (!course) return;
  // // course.isPublished = true;
  // // course.author = 'Another author';
  // course.set({
  //   isPublished: true,
  //   author: 'Another author'
  // });
  // const result = await course.save();
  // console.log('Result:\n', result);

  // Update first method
  // const course = await Course.updateOne({ _id: id }, {
  const course = await Course.findByIdAndUpdate({ _id: id }, {
    $set: {
      author: 'Jason',
      isPublished: false
    }
  }, { new: true });

  console.log('Course updated:\n', course);
}

async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id });
  const course = await Course.findByIdAndRemove({ _id: id });
  // const result = await Course.deleteMany({ isPublished: true });
  console.log(course);
}

updateCourse("5a68fdf95db93f6477053ddd");
removeCourse("5a68fdf95db93f6477053ddd");