const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5, // for string only
    maxlength: 255, // for string only
    // match: /pattern/, // for string only
    required: true
  },
  category: {
    type: String,
    enum: [ 'web', 'mobile', 'network' ],
    required: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: false, // callback used with async code
      validator: function(v, callback) { // CUSTOM VALIDATOR
        // setTimeout(() => { // timeout used to simulate async call
        //   const result = v && v.length > 0 // example result, different to real word result
        //   callback(result);
        // }, 3000);
        return v && v.length > 0 // return a similar value to what you would put in a IF statement
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 1, // for numbers only
    max: 2500, // for numbers only
    required: function() { return this.isPublished } // function used to test whether value is required - MUST return a Boolean value
  }
});

const testCourse = {
  name: 'Test course',
  category: '-',
  author: 'BOIIIIII',
  tags: null,
  isPublished: true,
  price: 20
}

const Course = mongoose.model('Courses', courseSchema);

async function createCourse() {
  const course = new Course(testCourse);
  try {
    const result = await course.save();
    console.log(result);
  }
  catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message)
  }
}

async function getCourses() {
  const courses = await Course
    .find({ author: 'Ralph', isPublished: true })
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, author: 1 })
  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate({ _id: id }, {
    $set: {
      author: 'Jason',
      isPublished: false
    }
  }, { new: true });

  console.log('Course updated:\n', course);
}

async function removeCourse(id) {
  const course = await Course.findByIdAndRemove({ _id: id });
  console.log(course);
}

createCourse();