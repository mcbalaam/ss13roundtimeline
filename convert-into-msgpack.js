const fs = require('fs');
const yaml = require('js-yaml');
const msgpack = require('msgpack');

fs.readdir('.', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.filter(file => file.endsWith('.yml')).forEach(file => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const yamlData = yaml.load(data);
      const msgpackData = msgpack.pack(yamlData);

      const msgpackFile = file.replace('.yml', '.msgpack');
      fs.writeFile(msgpackFile, msgpackData, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`MessagePack file ${msgpackFile} written successfully!`);
        }
      });
    });
  });
});