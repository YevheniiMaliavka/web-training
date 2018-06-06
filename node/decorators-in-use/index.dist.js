const fetch = require('node-fetch');
const stopwatch = require('./stopwatch');

const url = 'https://api.github.com/repos/akvamalin/web-training/commits';

const fetchit = async url => {
  const response = await fetch(url);
  return response.json();
};

const throttle = func => new Promise((resolve, reject) => {
  setTimeout(async () => {
    const result = await func();
    resolve(result);
  }, Math.ceil(Math.random() * 4));
});

const listCommitsMessagesFor = stopwatch(async url => {
  const commitsOverview = await throttle(() => fetchit(url));
  console.log(commitsOverview);
  const commitsUrls = commitsOverview.map(({ commit }) => commit.url);
  const commits = await Promise.all(commitsUrls.map(async url => throttle(() => fetchit(url))));
  return commits;
});

listCommitsMessagesFor(url);
