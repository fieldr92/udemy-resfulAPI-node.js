// CONVERT BELOW TO ASYNC AND AWAIT
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function sendEmailToCustomer(id) {
  const customer = await getCustomer(id);
  if (customer.isGold) {
    const movies = await getTopMovies();
    const email = await sendEmail(customer.email, movies);
    console.log(email);
  }
}

sendEmailToCustomer(1);

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting customer');
      resolve({
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'ralph@field.com' 
      })
    }, 2000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting movies');
      resolve(['movie1', 'movie2']);
    }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Sending email to '${email}' with following movies: ${movies}`);
      resolve('Email sent');
    }, 2000);
  });
}