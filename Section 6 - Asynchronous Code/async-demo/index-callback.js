const gitUser = {
  id: 1,
  username: 'fieldr'
};

console.log('Before');
getUser(gitUser, displayUsers);
console.log('After');

function displayUsers(user) {
  getRepositories(user.gitHubUsername, displayRepos);
}

function displayRepos(repos) {
  getCommits(repos, displayCommits);
}

function displayCommits(commits) {
  console.log('Commits:', commits);
}

function getUser({ id, username }, callback) {
  setTimeout(() => {
    console.log('Reading user from database...');
    callback({ id: id, gitHubUsername: username });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Calling GitHub "API"...');
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}

function getCommits(repos, callback) {
  setTimeout(() => {
    console.log('Getting commits...');    
    callback(['commit1', 'commit2', 'commit3'])
  }, 2000)
}