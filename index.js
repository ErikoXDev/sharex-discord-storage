require("dotenv").config();
const axios = require("axios");

const express = require("express");

const fileUpload = require("express-fileupload");

const { Client, GatewayIntentBits, Attachment } = require("discord.js");
/*
DISCORD BOT
*/

const client = new Client({
  intents: [GatewayIntentBits.MessageContent],
});

const CHUNK_SIZE = 8 * 1024 * 1024; // 8 MB

async function sendFile(file) {
  const chunkCount = Math.ceil(file.data.length / CHUNK_SIZE);

  const channel = await client.channels.fetch(process.env.BOT_CHANNEL_ID);

  const fileExt = file.name.split(".").pop();

  for (let i = 0; i < chunkCount; i++) {
    const chunk = file.data.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

    console.log("Sending chunk " + i);
    //let attachment = new Attachment(chunk, file.md5 + ".chunk");
    channel.send({
      content: `${file.md5}.${fileExt}-${i}`,
      files: [
        {
          attachment: chunk,
          name: `${file.md5}.${fileExt}-${i}`,
          description: "Chunk file",
        },
      ],
    });
  }
  return `${file.md5}.${fileExt}`;
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

  return res.send("http://" + req.get("host") + "/f/" + url);
});

app.get("/f/:id", async (req, res) => {
  const channel = await client.channels.fetch(process.env.BOT_CHANNEL_ID);
  const messages = await channel.messages.fetch({ limit: 100 });
  const chunksArray = [];

  for (let i = 0; ; i++) {
    const message = messages.find((m) => m.content === `${req.params.id}-${i}`);
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
