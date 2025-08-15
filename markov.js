/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!chains[word]) {
        chains[word] = [];
      }
      chains[word].push(nextWord);
    }

    this.chains = chains;
  }


  /** return random text from chains */
  getNextWord(lastWord) {
    const nextWords = this.chains[lastWord];
    if (!nextWords || nextWords.length === 0) return null;
    const randIdx = Math.floor(Math.random() * nextWords.length);
    return nextWords[randIdx];
  }


  makeText(numWords = 100) {
    const chainKeys = Object.keys(this.chains);

    let lastWord;
    do {
      lastWord = chainKeys[Math.floor(Math.random() * chainKeys.length)];
    } while (!/^[A-Z]/.test(lastWord));

    let output = lastWord;
    let finished = false;

    while (!finished) {
      lastWord = this.getNextWord(lastWord);

      const wordCountReached = output.split(/\s+/).length >= numWords;
      const lastWordIsNull = lastWord === null;
      const lastWordEndsWithPeriod = typeof lastWord === "string" && lastWord.endsWith('.');

      finished = wordCountReached && (lastWordIsNull || lastWordEndsWithPeriod);

      output += ' ' + lastWord;
      
    }

    return output;
  
  }
}

module.exports = {
  MarkovMachine,
};