/** Command-line tool to generate Markov text. 

$node makeText.js file eggs.txt
... generated text from file 'eggs.txt' ...

$node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
... generated text from that URL ...*/

const fs = require('fs');
const axios = require('axios');
const markov = require("./markov");

const makeTextFromText = (sourceText) => {
    const model = new markov.MarkovMachine(sourceText);
    
    console.log(model.makeText());
}

const makeTextFromFile = (path) => {
    try {
        const content = fs.readFileSync(path, 'utf8');
        makeTextFromText(content);
    } catch (e) {
        console.log(`Error reading file:\n  ${e}`);
    }
}

const makeTextFromURL = async (URL) => {
    try {
        const response = await axios.get(URL);
        const content = response.data;
        makeTextFromText(content);
    } catch (e) {
        return `Error fetching ${URL}:\n  ${e.message}`;
    }
}

// Read 
let [source, path] = process.argv.slice(2);

console.log(source);
console.log(path);

if (source === "file") {
  makeTextFromFile(path);
} else if (source === "url") {
  makeTextFromURL(path);
} else {
  console.error(`Unknown source type: ${source}`);
  process.exit(1);
}
