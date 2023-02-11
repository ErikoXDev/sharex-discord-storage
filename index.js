require("dotenv").config();
const axios = require("axios");

const express = require("express");

const fileUpload = require("express-fileupload");

const { Client, GatewayIntentBits, Attachment } = require("discord.js");

const {
  emojiToChar,
  charToEmoji,
  getCorrespondingElement,
  getRandomValue,
  splitEmojiString,
} = require("./emoji");

/*
DISCORD BOT
*/

const client = new Client({
  intents: [GatewayIntentBits.MessageContent],
});

const CHUNK_SIZE = 8 * 1024 * 1024; // 8 MB

async function sendFile(file) {
  console.log("--- New file upload");
  const chunkCount = Math.ceil(file.data.length / CHUNK_SIZE);

  const channel = await client.channels.fetch(process.env.BOT_CHANNEL_ID);

  const fileExt = file.name.split(".").pop();

  for (let i = 0; i < chunkCount; i++) {
    const chunk = file.data.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

    const filenameArr = getRandomValue(emojiToChar, 6);
    var filename;

    if (process.env.USE_EMOJIS) {
      filename = filenameArr.map((char) => {
        return getCorrespondingElement(charToEmoji, char);
      });
    } else {
      filename = filenameArr;
    }

    filename = filename.join("");

    console.log("Sending chunk " + i);
    //let attachment = new Attachment(chunk, file.md5 + ".chunk");
    channel.send({
      content: `${filenameArr.join("")}.${fileExt}-${i}`,
      files: [
        {
          attachment: chunk,
          name: `${filenameArr.join("")}.${fileExt}-${i}`,
          description: "Chunk file",
        },
      ],
    });
  }
  return `${filename}.${fileExt}`;
}

function runBot() {
  console.log("Running discord.js bot!");
  client.login(process.env.BOT_TOKEN);
}

/*
EXPRESS SERVER
*/

const app = express();

app.use(fileUpload());

app.post("/upload", async (req, res) => {
  const password = req.header("Authorization");

  if (password !== process.env.UPLOAD_PASSWORD && process.env.UPLOAD_PASSWORD) {
    return res.status(401).send("Unauthorized");
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;

  let url = await sendFile(file);

  return res.send("http://" + req.get("host") + "/i/" + url);
});

app.get("/i/:id", async (req, res) => {
  const channel = await client.channels.fetch(process.env.BOT_CHANNEL_ID);
  const messages = await channel.messages.fetch({ limit: 100 });
  const chunksArray = [];

  var filename = req.params.id;
  if (process.env.USE_EMOJIS) {
    filename = req.params.id.split(".").shift();
    filename = splitEmojiString(filename)
      .map((emoji) => {
        return emojiToChar[emoji];
      })
      .join("");
    filename += "." + req.params.id.split(".").pop();
  }

  console.log(filename);

  for (let i = 0; ; i++) {
    const message = messages.find((m) => m.content === `${filename}-${i}`);
    if (!message) break;
    const response = await axios.get(message.attachments.first().url, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");
    chunksArray.push(buffer);
  }

  const combinedBuffer = Buffer.concat(chunksArray);
  res.send(combinedBuffer);
});

function runServer() {
  app.listen(3000, () => {
    console.log("Express app listening on port 3000!");
  });
}

(async () => {
  runBot();
})();
(async () => {
  runServer();
})();
