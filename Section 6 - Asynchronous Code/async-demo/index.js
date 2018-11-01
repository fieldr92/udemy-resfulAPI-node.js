const gitUser = {
  id: 1,
  username: 'fieldr'
};

console.log('Before');

// "Callback hell" approach
// getUser(gitUser, user => {
//   getRepositories(user.gitHubUsername, repos => {
//     getCommits(repos[0], commits => {
//       console.log(commits);
//     })
//   })
// });

// Promise approach
// getUser(gitUser)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log(commits))
//   .catch(err => console.log(new Error(err)));

// Async and Await approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0])
    console.log(commits);
  } catch (err) {
    console.log('Error:', err.message);
  }
}
displayCommits();

console.log('After');

function getUser({ id, username }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading user from database...');
      resolve({ id: id, gitHubUsername: username }); // simulate resolving
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub "API"...');
      // resolve(['repo1', 'repo2', 'repo3']); // simulate resolving
      reject(new Error('Could not get repos...'));
    }, 2000);
  });
}

function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting commits...');    
      resolve(['commit1', 'commit2', 'commit3']) // simulate resolving
    }, 2000)
  });
}