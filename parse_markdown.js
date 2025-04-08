const fs = require('fs');

// Read the markdown file
const htmlContent = fs.readFileSync('/Users/ambrose/Desktop/词根词缀游戏.html', 'utf8');

// Extract the gameData array from the HTML
const gameDataMatch = htmlContent.match(/const gameData = (\[.*?\])/s);
if (!gameDataMatch) {
  console.error('Could not find gameData in HTML file');
  process.exit(1);
}

// Parse the gameData array
const words = [];
try {
  const gameData = eval(gameDataMatch[1]);
  gameData.forEach(item => {
    words.push({
      word: item.root,
      formation: item.meaning,
      parts: [{
        text: item.root,
        type: 'root',
        meaning: item.meaning
      }]
    });
  });
} catch (e) {
  console.error('Error parsing gameData:', e);
  process.exit(1);
}

// Generate the game data structure
const gameData = {
  name: "LexiRoot Arena by Pan Chei-way",
  chineseName: "词根竞技场",
  allWords: words
};

// Write to a JSON file
fs.writeFileSync('/Users/ambrose/Desktop/word_data.json', JSON.stringify(gameData, null, 2));

console.log(`Parsed ${words.length} words into word_data.json`);
