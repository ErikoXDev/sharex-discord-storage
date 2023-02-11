# ShareX Discord Storage

> Virtually ♾️ file storage using discord!

## Setup

1. Create a discord bot and add it to a new discord server
2. Create a channel in the discord server

3. Create a .env file using these keys:

   - BOT_TOKEN (your discord bots token)
   - BOT_CHANNEL_ID (the channel id of your created server channel)
   - UPLOAD_PASSWORD (a password to so only you can upload files, leave empty for no password)
   - USE_EMOJIS (set to true to use emojis in your image url)
   - URL_ID_LENGTH (length of the resulting url id, defaults to 6)

4. Clone this repository
5. Run `npm install` to install packages
6. Run `npm run start` or `npm run test` to run or test the server and bot

## Configuring ShareX

Use these Settings for your custom file uploader:
| Setting | Value |
-----------------|-------------
|Destination Type | "File Uploader" |
|Method | POST |
|Request URL | yourhost.com/upload
|Headers | "Authorization: your upload password" |
|File form name | "file" |
