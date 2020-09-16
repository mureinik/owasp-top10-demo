'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database(':memory:');

db.run('CREATE TABLE comments(ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP, comment TEXT)');

const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

app.get('/xss', function (req, res) {
    db.all('SELECT comment FROM comments ORDER BY ts DESC', [], function(err, rows) {
        const comments = rows.map(r => r.comment).join('<br/>');
        const body =
            `<html lang="en">
                <body>
                How is DevConf.US so far?<br/>
                <form action="/xss" method="post">
                    <input name="comment" type="text">&nbsp;<input type="submit">
                </form>
                <br/>
                Here's what others are saying:<br/>
                ${comments}
                </body>
            </html>`;
        res.send(body);
    });
});

app.post('/xss', function (req, res) {
    db.run('INSERT INTO comments(comment) VALUES (?)',
        [req.body.comment],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
        });
    res.writeHead(302, {
        'Location': 'xss'
    });
    res.end();
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));