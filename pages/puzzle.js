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

  const arePuzzles1And2Completed = state.puzzle1?.completed && state.puzzle2?.completed;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#1a472a] to-[#2d5a3f] min-h-screen">
        {/* Trivia Puzzles Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Trivia Puzzle 1 */}
          <div className="mb-8">
            <PuzzleSection puzzleNumber={1} />
          </div>

          {/* Trivia Puzzle 2 Container with Blur */}
          <div className="relative">
            <div className={`mb-8 ${!state.puzzle1?.completed ? 'opacity-50 pointer-events-none' : ''}`}>
              <PuzzleSection puzzleNumber={2} />
            </div>

            {/* Locked Overlay for Puzzle 2 */}
            {!state.puzzle1?.completed && (
              <div className="absolute inset-0 bg-[#1a472a]/50 backdrop-blur-md z-10 flex items-center justify-center">
                <div className="text-center p-6 bg-white/90 rounded-lg shadow-lg border-2 border-[#c41e3a]">
                  <p className="text-lg font-bold text-[#c41e3a]">
                    🎄 Complete Puzzle 1 to unlock
                  </p>
                  <p className="text-[#1a472a]">
                    🔒 Locked
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Word Fragmentation Section with Blur */}
        <div className="relative">
          {/* Title and Description */}
          <div className="text-center mb-8 bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-white mb-2 text-shadow-lg">
              🎄 Time to Test Your Memory! 🎄
            </h1>
            <p className="text-xl text-[#ffd700]">
              Hopefully you remember your trivia answers...
            </p>
            <p className="text-xl text-white">
              Each word puzzle is a reference to one of the trivia sections. Good Luck! 
            </p>
          </div>

          <div className={`${!arePuzzles1And2Completed ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Word Puzzles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Object.entries(PUZZLE_LETTERS).map(([puzzleId, letters]) => (
                <div
                  key={puzzleId}
                  className="border-2 border-[#c41e3a] rounded-lg p-6 bg-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-bold mb-4 text-[#ffd700] flex items-center">
                    <span className="mr-2">🎁</span>
                    Trivia {puzzleId.toUpperCase()}
                  </h3>
                  <WordFragmentation
                    word={puzzleId.toUpperCase()}
                    letters={letters}
                    onComplete={(score) => handleWordPuzzleComplete(puzzleId, score)}
                    completed={state.wordPuzzles?.[puzzleId]?.completed}
                    triviaNumber={Object.keys(PUZZLE_LETTERS).indexOf(puzzleId) + 1}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Locked Overlay for Word Fragmentation */}
          {!arePuzzles1And2Completed && (
            <div className="absolute inset-0 bg-[#1a472a]/50 backdrop-blur-md z-10 flex items-start justify-center">
              <div className="text-center p-6 bg-white/90 rounded-lg shadow-lg border-2 border-[#c41e3a] mt-8">
                <p className="text-lg font-bold text-[#c41e3a]">
                  🎄 Complete Puzzles 1 and 2 to unlock this section
                </p>
                <p className="text-[#1a472a]">
                  🔒 Locked
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}  