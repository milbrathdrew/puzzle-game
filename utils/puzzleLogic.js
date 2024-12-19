// utils/puzzleLogic.js
export const PUZZLE_ANSWERS = {
  puzzle1: ['4', '9', '3', '3'],
  puzzle2: ['9', '2', '3', '1'],
};

export const validateClue = (puzzleNumber, clueIndex, answer) => {
  return PUZZLE_ANSWERS[`puzzle${puzzleNumber}`][clueIndex] === answer;
};

export const calculatePuzzleDigits = (puzzleNumber, clues) => {
  if (puzzleNumber === 1) {
    return [4, 3]; // Based on 49 and 33
  } else {
    return [9, 3]; // Based on 92 and 31
  }
};

export const shouldShowHint = (attempts) => {
  return attempts >= 3;
};

export const getHint = (puzzleNumber, clueIndex) => {
  const hints = {
    puzzle1: [
      "Think of a number between 3 and 5",
      "Think of the last single digit",
      "Think of the first odd number after 2",
      "Same as the previous answer"
    ],
    puzzle2: [
      "Last single digit number",
      "First even prime number",
      "Number of primary colors",
      "First positive number"
    ]
  };

  return hints[`puzzle${puzzleNumber}`][clueIndex];
};
