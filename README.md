# OWASP Top-10 - quickstart your security awareness

This repo contains the code examples shared in my [DevConf.us 2020 talk](https://devconfus2020.sched.com/event/eb6835469f571956a331b8382b8ca0a9).

Recording: Will be shared after the conference
Slides: Will be shared after the conference

## Prerequisites
1. [Git](https://git-scm.com/) - For cloning the repo
2. [npm](https://www.npmjs.com/get-npm)
3. [curl](https://curl.haxx.se/) - Not required for running the demo, but some instructions use it

## Installation

Clone the repository:
```
git clone https://github.com/mureinik/owasp-top10-demo.git
```

Install the dependencies:
```
npm install
```

## Demos

### A1:2017 - Injection

Run the Log Injection demo:
```
node logi.js
```

Send a payload of the form `username=XYZ logged in.\nABC&password=123`:

```
curl -d $'username=allon logged in with the password: fakepassword.\nmureinik&password=123' http://localhost:3000/logi
```

You'll see two log in messages in the application's console.

### A2:2017 - Broken Authentication

Run the login demo:
```
node logi.js
```

Open your browser and navigate to http://localhost:3000/logi.html. As you can easily see, any combination of username
and password will be accepted by the system. A proper system should have real user management implemented.

### A3:2017 Sensitive data exposure

Run the login demo:
```
node logi.js
```

Open your browser and navigate to http://localhost:3000/logi.html. You can use any combination of username and password
to log in, and the password will be presented in plain text in the application's console.
