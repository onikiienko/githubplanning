planningpoker
=============
[![Build Status](https://travis-ci.org/onikiienko/githubplanning.svg?branch=master)](https://travis-ci.org/onikiienko/githubplanning)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
Application
=============
http://githubplanning.com/
```shell 
git pull && npm install && grunt build && pm2 start app.js
```

Developing
=============

Install node http://nodejs.org/ and npm https://www.npmjs.org/
Install dependences 
```shell 
npm install 
```
Install Grunt
```shell 
sudo npm install -g grunt-cli
```
Install Babel CLI
```shell 
npm install --global babel
```
Enable watch task 
```shell 
grunt
```
Start process 
```shell 
sudo node app.js 
```
Or install pm2. he works even better
```shell 
sudo pm2 start app.js
```
Then run
```shell 
sudo pm2 start app.js
```
Open http://127.0.0.1/

Install
=============
Install node http://nodejs.org/ and npm https://www.npmjs.org/
Instal dep 
```shell 
npm install 
```
Install Grunt
```shell 
npm install -g grunt-cli
```
To build project for installing on server 
```shell 
grunt build
```
Start process 
```shell 
sudo node app.js 
```
Open  http://127.0.0.1/

Testing
==============
Install Karma
```shell 
npm install -g karma-cli
```
Start tests
```shell 
grunt test
```
Tests are running on Travis-CI.
