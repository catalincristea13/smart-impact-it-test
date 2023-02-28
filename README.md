# List public gist for a user

## Installation
Please make sure you have node.js installed in order to use npm.
More details [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Use npm command to install all dependencies:
```bash
npm install
```
Start server:
```bash
npm start
```
Now you can access app on [http://localhost:3000](http://localhost:3000)
## What is done:
1. Username search
2. Load gists details(title,date,filename, language)
3. List of forks and users that forked them
4. Show code inside a modal
5. Optimize search with a delay of 1 second in order to not create api call everytime is typed a letter

## Next steps:
1. Limit number of gists to show(let's say 10 items) and using url parameters "per_page" and "page" and create a "Show more" button to get the next 10 gists and so on to improve UX and performance of page.
The same will be good for files and forks if is possible.
