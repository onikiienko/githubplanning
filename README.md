planningpoker
=============

[![Join the chat at https://gitter.im/onikiienko/githubplanning](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/onikiienko/githubplanning?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Application
=============
http://githubplanning.com/
```shell 
git pull && grunt build && supervisor app.js
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
Enable watch task 
```shell 
grunt
```
Start process 
```shell 
sudo node app.js 
```
Or install supervisor. he works even better
```shell 
sudo npm install supervisor -g
```
Then run
```shell 
sudo supervisor app.js
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
