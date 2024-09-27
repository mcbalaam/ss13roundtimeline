const fs = require('fs');
const yaml = require('js-yaml');
const msgpack = require('msgpack')

fs.readFile('1.yml', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const yamlData = yaml.load(data);
  const msgpackData = msgpack.pack(yamlData);

  fs.writeFile('1.msgpack', msgpackData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('MessagePack file written successfully!');
    }
  });
});