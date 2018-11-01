const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => { 
    console.log('Connected to MongoDB...');
    sendCourse(); // await connection before sending course
  })
  .catch(error => console.error('Could not connect to MongoDB', error));

const sendCourse = () => {
  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
  });
  
  const Course = mongoose.model('Courses', courseSchema); // arg 1 = model name, arg 2 = schema that defines shape of documents in section // THIS IS A CLASS
  
  async function createCourse() {
    const course = new Course({ // object made from courseSchema model / class
      name: 'Angular course',
      author: 'Ralph',
      tags: [ 'angular', 'frontend' ],
      isPublished: true // date not defined because we have that defaulted!
    });
  
    const result = await course.save(); // 'save()' is a asynchronous action
    console.log(result);
  }
  
  createCourse();
}