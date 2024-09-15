const express = require('express');
const app = express();
const fs = require('fs');
const msgpack = require('@msgpack/msgpack');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
});

app.get('/api/rounds', (req, res) => {
    const dirPath = '../rounds';
    let buffer = null
    let data = null
    rounds_data = []
    
    for(each in dirPath) {
        buffer = fs.readFileSync('example.msgpack');
        data = msgpack.decode(buffer);
    }
    fs.readdir(dirPath, (err, files) => {
    if (err) {
        res.status(500).send({ message: 'Error reading directory' });
    } else {
        res.json(files);
    }
    });
});

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});