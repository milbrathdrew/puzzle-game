// components/PuzzleSection.js
import { useState } from 'react';
import { useGameState } from '../context/GameContext';
import { validateClue, shouldShowHint, getHint } from '../utils/puzzleLogic';
import Button from './Button';

export default function PuzzleSection({ puzzleNumber }) {
  const { state, dispatch } = useGameState();
  const [currentInput, setCurrentInput] = useState(['', '', '', '']);
  
  const puzzle = state[`puzzle${puzzleNumber}`];
  const attempts = state.attempts[`puzzle${puzzleNumber}`];

  const handleInputChange = (index, value) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;
    
    const newInput = [...currentInput];
    newInput[index] = value;
    setCurrentInput(newInput);
  };

  const handleSubmitClue = (index) => {
    const value = currentInput[index];
    if (!value) return;

    if (validateClue(puzzleNumber, index, value)) {
      dispatch({
        type: 'UPDATE_CLUE',
        payload: { puzzleNumber, clueIndex: index, value },
      });

      // Check if all clues are filled
      const newClues = puzzle.clues.map((clue, i) => 
        i === index ? value : clue
      );
      
      if (newClues.every(clue => clue !== '')) {
        dispatch({
          type: 'COMPLETE_PUZZLE',
          payload: {
            puzzleNumber,
            digits: [parseInt(newClues[0] + newClues[1]), parseInt(newClues[2] + newClues[3])],
          },
        });
      }
    } else {
      dispatch({
        type: 'INCREMENT_ATTEMPT',
        payload: { puzzle: puzzleNumber, clueIdx: index },
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Puzzle {puzzleNumber}
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={currentInput[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={puzzle.clues[index] !== ''}
                className="w-16 h-16 text-center text-2xl border-2 rounded-lg"
                maxLength={1}
              />
              <Button
                onClick={() => handleSubmitClue(index)}
                disabled={puzzle.clues[index] !== '' || !currentInput[index]}
                variant="primary"
              >
                Submit
              </Button>
              {puzzle.clues[index] && (
                <span className="text-green-600 text-xl">✓</span>
              )}
            </div>
            {shouldShowHint(attempts[index]) && !puzzle.clues[index] && (
              <p className="text-sm text-gray-600 italic">
                Hint: {getHint(puzzleNumber, index)}
              </p>
            )}
          </div>
        ))}
      </div>

      {puzzle.completed && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <p className="text-green-700">
            Puzzle {puzzleNumber} completed! Numbers generated: {puzzle.digits.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
