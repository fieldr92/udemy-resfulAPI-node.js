const gitUser = {
  id: 1,
  username: 'fieldr'
};

console.log('Before');
// getUser(gitUser, user => {
//   getRepositories(user.gitHubUsername, repos => {
//     getCommits(repos[0], commits => {
//       console.log(commits);
//     })
//   })
// });

getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log(commits))
  .catch(err => new Error(err.message));


console.log('After');

function getUser({ id, username }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading user from database...');
      resolve({ id: id, gitHubUsername: username });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub "API"...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting commits...');    
      resolve(['commit1', 'commit2', 'commit3'])
    }, 2000)
  });
}