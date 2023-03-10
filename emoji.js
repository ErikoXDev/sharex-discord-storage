const emojiArray = [
  "ð",
  "ð",
  "ð",
  "ð",
  "ð",
  "ð",
  "ðĪĢ",
  "ð",
  "ð",
  "ð",
  "ðŦ ",
  "ð",
  "ð",
  "ð",
  "ðĨ°",
  "ð",
  "ðĪĐ",
  "ð",
  "ð",
  "ðĪ",
  "ð",
  "ð",
  "ðĨē",
  "ð",
  "ð",
  "ð",
  "ðĪŠ",
  "ð",
  "ðŠ",
  "ðĪĪ",
  "ðī",
  "ð·",
  "ðĪ",
  "ðĪ",
  "ðĪĒ",
  "ðĪŪ",
  "ðĪ§",
  "ðĨĩ",
  "ðĨķ",
  "ðĨī",
  "ðĩ",
  "ðĩâðŦ",
  "ðĪŊ",
  "ðĪ ",
  "ðĨģ",
  "ðĨļ",
  "ð",
  "ðĪ",
  "ð§",
  "ð",
  "ðŦĪ",
  "ð",
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
