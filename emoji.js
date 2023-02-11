const emojiArray = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🙃",
  "🫠",
  "😉",
  "😊",
  "😇",
  "🥰",
  "😍",
  "🤩",
  "😘",
  "😗",
  "🤑",
  "😚",
  "😙",
  "🥲",
  "😋",
  "😛",
  "😜",
  "🤪",
  "😔",
  "😪",
  "🤤",
  "😴",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "🥵",
  "🥶",
  "🥴",
  "😵",
  "😵‍💫",
  "🤯",
  "🤠",
  "🥳",
  "🥸",
  "😎",
  "🤓",
  "🧐",
  "😕",
  "🫤",
  "😟",
];

const letterArray =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const emojiToChar = {};
const charToEmoji = {};

emojiArray.forEach((item, index) => {
  emojiToChar[item] = letterArray[index];
  charToEmoji[letterArray[index]] = item;
});

function getCorrespondingElement(map, element) {
  return map[element];
}

function splitEmojiString(str) {
  let regex =
    /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)+|\p{EPres}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?|\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})/gu;
  return str.match(regex);
}
function getRandomValue(map, length) {
  const keys = Object.keys(map);
  const randomIndices = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    randomIndices.push(randomIndex);
  }
  return randomIndices.map((index) => map[keys[index]]);
}

module.exports = {
  emojiToChar,
  charToEmoji,
  getCorrespondingElement,
  getRandomValue,
  splitEmojiString,
};
