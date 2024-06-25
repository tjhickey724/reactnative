/*
has javascript functions used in the Wordle app....
*/

const pick_random_word = (words5) => {
    let random_index = Math.floor(Math.random() * words5.length);
    if (random_index==words5.length)
        {random_index=random_index-1};
    return words5[random_index];
};

const analyze_guess = (word,guess) => {
    word = word.toLowerCase();
    guess = guess.toLowerCase();
    let clue = "";
    for (let i=0; i<word.length; i++) {
        if (guess[i]==word[i]) {
            clue = clue + '+';
        } else if (word.includes(guess[i])){
            clue = clue + '-';
        } else {
            clue = clue + ".";
        }
    }
    return(clue);
};

const word2list = (word) => {
    let word_list = [];
    for (let i=0; i<word.length; i++) {
        word_list.push(word[i]);
    }
    return(word_list);
};




export {pick_random_word,analyze_guess,word2list};
