const express = require('express');
const bodyParser = require('body-parser');
const jsonlint = require('jsonlint');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.raw({ type: '*/*' }));

// Serve static files from the "json-prettyfy" directory
app.use(express.static(path.join(__dirname)));

// Endpoint to prettify JSON
app.post('/prettify', (req, res) => {
    try {
        const jsonString = req.body.toString();
        const json = jsonlint.parse(jsonString);
        const prettyJson = JSON.stringify(json, null, 2);
        res.send(prettyJson);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.listen(3000, function() {
    console.log('JSON Prettifier app listening on port 3000!');
});
