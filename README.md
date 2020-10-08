# OWASP Top-10 - quickstart your security awareness

This repo contains the code examples shared in my [DevConf.us 2020 talk](https://devconfus2020.sched.com/event/eb6835469f571956a331b8382b8ca0a9).

Recordings:
- [Pre-recorded talk](https://www.youtube.com/watch?v=Unf-U_hPpH4)
- [DevConf.US recording](https://www.youtube.com/watch?v=6Z5hlgZQQt0)

Slides:
[SlideShare](https://www.slideshare.net/AllonMureinik/devconfus-2020-owasp-top-10-allon-mureinik)

## Warning

These demos contain intentionally vulnerable code.

Do not run any of them on a machine which can be accessed by external users.

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

### A4:2017 XML External Entities (XXE)

Run the XXE demo:
```
node logi.js
```

Send a payload with the following form:
```
curl -d '<!DOCTYPE foo [<!ENTITY xxe SYSTEM "/full/path/to/owasp-top10-demo/secret.txt">]><name>&xxe;</name>' http://localhost:3000/xxe
```

And you should get back the **contents** of the [secret.txt](secret.txt) file, i.e., `THIS IS A SECRET!!!`.

### A5:2017 Broken Access Control

Run the session demo:
```
node session.js
```

If you use your browser to navigate to http://localhost:3000/data you'll get an error stating `not logged in`, which is 
expected.

You can navigate to http://localhost:3000/session.html and use the credentials `user1`/`password1` to log in, after
which you'll be redirected to http://localhost:3000/data?username=user1 and we that user's data. Similarly, you can use
the credentials `user2`/`password2`, and will see a different set of data. However, if you log in as `user1`, you could
manually navigate to http://localhost:3000/data?username=user2, and will see that user's data.

In other words, this demo implements **authentication**, but does not implement **authorization**.

### A6:2017 Security Misconfiguration

There are several security misconfigurations in these demos. A few obvious ones include:
- All the demos serve HTTP and not HTTPS
- [xxe.js](xxe.js) sets `noent: true` when creating the libxmljs parser, thus making the demo vulnerable to XXE
- [session.js](session.js) uses Express Session, but uses the default configuration (e.g., it doesn't set the `secure` or `maxAge` properties)

### A7:2017 Cross-Site Scripting (XSS)

Run the XSS demo:
```
node xss.js
```

If you use your browser to navigate to http://localhost:3000/xss, you'll see a comments form where you could add your
opinion of DevConf.us and view previous comments

Send a payload of the following form:
```
curl -X POST -d 'comment=<script>window.location.replace("https://github.com/mureinik/owasp-top10-demo")</script>' http://localhost:3000/xss
```

The next time you navigate to http://localhost:3000/xss, you'll be redirected to this README page.

### A8:2017 Insecure Deserialization

Run the keys demo:
```
node keys.js
```

Send a payload containing a function definition followed by a `()`:
```
curl -X POST -H "Content-Type: text/plain" -d '{"key": "_$$ND_FUNC$$_function (){ console.log(\"unserialized!\"); }()"}' http://localhost:3000/keys
```

You'll see the text "userialized!" printed out in the application's console, proving that arbitrary code could be
executed. Of course, you could use more malicious code than `console.log`.

### A9:2017 Using Components with Known Vulnerabilities

Run an audit:
```
npm audit
```

You will see the vulnerable packages this project depends on.

### A10:2017 Insufficient Logging & Monitoring

Run the session demo:
```
node session.js
```

Use your browser to navigate to http://localhost:3000/session.html. 

If you use the wrong credentials (e.g., `wronguser`/`wrongpassword`) you'll get an error message, but nothing will be
logged.
In fact, this "application" doesn't even have any real logs. 
