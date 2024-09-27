const express = require("express");
const app = express();
const fs = require("fs");
const yaml = require("js-yaml");
const msgpack = require("msgpack");

let dict;
fs.readFile("../config/dictionary.yml", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    dict = yaml.load(data);
  }
});

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function unixTimeToDateTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}.${month}.${year} @ ${hours}:${minutes}:${seconds}`;
}

async function decodeByDictionary(data) {
  const decoded_logs = [];
  const events = data.events;
  const round_id = data.id;
  const map = data.map;

  for (const event of events) {
    const eventType = event.e_type;
    const eventData = event.data;
    const template = dict.events[eventType];

    if (!template) {
      console.warn(`В словаре отсутствует пресет для ${eventType}`);
      continue;
    }

    let title = template.title
      ? replacePlaceholders(template.title, data, eventData, round_id, map)
      : "";
    let desc = template.desc
      ? replacePlaceholders(template.desc, data, eventData, round_id, map)
      : "";

    decoded_logs.push({ title, desc });
  }

  return decoded_logs;
}

function replaceMapAndRound(str, map, round_id, dict) {
  const mapName = dict.maps[map];
  console.log(mapName);
  if (mapName) {
    str = str.replace("{map}", mapName);
  }

  str = str.replace("{id}", round_id);

  return str;
}

function replacePlaceholders(str, data, eventData, round_id, map) {
  return str.replace(/\{([^}]+)\}/g, (match, key) => {
    const keys = key.split(".");
    let value = data;

    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        value = eventData[k];
      }
      if (value === undefined) {
        return "";
      }
    }

    if (key === "id") {
      return round_id;
    }

    if (key === "map") {
      return dict.maps[map];
    }

    return value || "";
  });
}

async function readLogsForRound(round_id) {
  let filePath = `../rounds/${round_id}.msgpack`;
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const data = msgpack.unpack(buffer, { recursiveUnpack: true });
        const decoded_data = decodeByDictionary(data);
        resolve(decoded_data);
      }
    });
  });
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  next();
});

app.get("/api/rounds/:roundId", async (req, res) => {
  const round_id = req.params.roundId;
  try {
    const logs = await readLogsForRound(round_id);
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error reading logs" });
  }
});

app.get("/api/rounds", (req, res) => {
  const dirPath = "../rounds";
  let buffer = null;
  let data = null;
  rounds_data = [];

  // for(each in dirPath) {
  //     buffer = fs.readFileSync('example.msgpack');
  //     data = msgpack.decode(buffer);
  // }

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      res.status(500).send({ message: "Error reading directory" });
    } else {
      sleep(2000);
      res.json(files);
    }
  });
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
