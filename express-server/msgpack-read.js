const fs = require('fs');
const yaml = require('js-yaml');
const msgpack = require('msgpack')

function readLogsForRound(round_id) {
    let filePath = `${round_id}.msgpack`;
    fs.readFile(filePath, (err, buffer) => {
        if (err) {
            console.error(err);
            return;
        }
    const data = msgpack.unpack(buffer, { recursiveUnpack: true });
    console.log(data)
    })
}

readLogsForRound(1)
