// pages/puzzle.js
import React from 'react';
import Layout from '../components/Layout';
import WordFragmentation from '../components/WordFragmentation';
import { useGameState } from '../context/GameContext';
import ProgressBar from '../components/ProgressBar';
import PuzzleSection from '../components/PuzzleSection';

const generatePuzzleLetters = (word, totalLetters = 12) => {
  const wordLetters = word.split('');
  const extraLettersNeeded = totalLetters - wordLetters.length;
  const commonLetters = 'AEIOURSTNLC';
  const extraLetters = Array(extraLettersNeeded).fill()
    .map(() => commonLetters[Math.floor(Math.random() * commonLetters.length)]);
  const allLetters = [...wordLetters, ...extraLetters];
  return allLetters.sort(() => Math.random() - 0.5);
};

const PUZZLE_LETTERS = {
  bat: generatePuzzleLetters("BAT", 12),
  ring: generatePuzzleLetters("RING", 12),
  flame: generatePuzzleLetters("FLAME", 12),
  suitcase: generatePuzzleLetters("SUITCASE", 15)
};

export default function PuzzlePage() {
  const { state, dispatch } = useGameState();

  const handleWordPuzzleComplete = (puzzleId, score) => {
    dispatch({
      type: 'COMPLETE_WORD_PUZZLE',
      payload: {
        puzzleId,
        score
      }
    });
  };

  const calculateProgress = () => {
    const completedPuzzles = Object.values(state.wordPuzzles || {}).filter(puzzle => puzzle.completed).length;
    const totalPuzzles = 4;
    return (completedPuzzles / totalPuzzles) * 100;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Time to Test Your Memory!</h1>
          <p className="text-xl text-gray-600">Hopefully you remember your trivia answers...</p>
        </div>

        {/* Puzzle Sections */}
        <div className="mb-8">
          <PuzzleSection puzzleNumber={1} />
        </div>

        {state.puzzle1.completed && (
          <div className="mb-8">
            <PuzzleSection puzzleNumber={2} />
          </div>
        )}

        {/* Word Puzzles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Progress</h2>
          <ProgressBar progress={calculateProgress()} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Trivia 1: BAT</h3>
            <WordFragmentation
              word="BAT"
              letters={PUZZLE_LETTERS.bat}
              onComplete={(score) => handleWordPuzzleComplete('bat', score)}
              completed={state.wordPuzzles?.bat?.completed}
              triviaNumber={1}
            />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Trivia 2: RING</h3>
            <WordFragmentation
              word="RING"
              letters={PUZZLE_LETTERS.ring}
              onComplete={(score) => handleWordPuzzleComplete('ring', score)}
              completed={state.wordPuzzles?.ring?.completed}
              triviaNumber={2}
            />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Trivia 3: FLAME</h3>
            <WordFragmentation
              word="FLAME"
              letters={PUZZLE_LETTERS.flame}
              onComplete={(score) => handleWordPuzzleComplete('flame', score)}
              completed={state.wordPuzzles?.flame?.completed}
              triviaNumber={3}
            />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Trivia 4: SUITCASE</h3>
            <WordFragmentation
              word="SUITCASE"
              letters={PUZZLE_LETTERS.suitcase}
              onComplete={(score) => handleWordPuzzleComplete('suitcase', score)}
              completed={state.wordPuzzles?.suitcase?.completed}
              triviaNumber={4}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
