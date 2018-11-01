Promise.resolve({ id: 1}) // making resolved promises good way of unit testing
  .then(result => console.log(result));

Promise.reject(new Error('reason for rejection...')) // same for rejected ones
  .catch(error => console.log(error));

const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log('Async Operation 1');
    resolve(1);
  }, 1000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log('Async Operation 2');
    resolve(2);
  }, 3000);
});

Promise.all([p1, p2]) // allows you to resolve two promises at the same time!!
  .then(result => console.log(result));

Promise.race([p1, p2]) // allows you to resolve the first promise that is fulfilled and resolve it before waiting for other promises to be fulfilled
  .then(result => console.log(result));

const p3 = new Promise((resolve, reject) => { // purposeful rejection
  setTimeout(() => {
    console.log('Async Operation 3');
    reject(new Error('p3 rejected'));
  }, 4000);
});

const p4 = new Promise(resolve => {
  setTimeout(() => {
    console.log('Async Operation 4');
    resolve(4);
  }, 6000);
});

Promise.all([p3, p4])
  .then(result => console.log(result))
  .catch(err => console.log('Err:', err.message)); // throws error for p3 and thus does not get result for either p3 or p4