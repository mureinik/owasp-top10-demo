'use strict';

const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded;
const staticServer = express.static;

app.use(urlencoded({ extended: true }));
app.use('/', staticServer('./static/'));

app.post('/logi', function(req, res) {
    // We trust our users, every login will be successful!
    const username = req.body.username;
    const password = req.body.password;

    // Enterprise-grade logging FTW!
    console.log(`${username} logged in with the password: ${password}.`);
    res.end('Logged in with the honor system');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));