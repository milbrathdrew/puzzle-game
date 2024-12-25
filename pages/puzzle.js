import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import WordFragmentation from '../components/WordFragmentation';
import { useGameState } from '../context/GameContext';
import ProgressBar from '../components/ProgressBar';
import PuzzleSection from '../components/PuzzleSection';
import EmbeddedPuzzle from '../components/MatchstickPuzzle';
import Image from 'next/image';

const WrongCodeVideo = ({ onEnded }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-64 h-48 bg-black rounded-lg overflow-hidden">
      <video autoPlay className="w-full h-full object-cover" onEnded={onEnded}>
        <source src="/videos/wrong-code.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

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
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  const arePuzzles1And2Completed = state.puzzle1?.completed && state.puzzle2?.completed;

  const handleWordPuzzleComplete = (puzzleId, score) => {
    dispatch({
      type: 'COMPLETE_WORD_PUZZLE',
      payload: { puzzleId, score }
    });
  };

  const handleNumberClick = (number) => {
    if (passcode.length < 4) {
      setPasscode(prev => prev + number);
    }
  };

  const handleClear = () => {
    setPasscode('');
    setError('');
    setShowVideo(false);
  };

  const handleSubmit = () => {
    if (passcode === '7560') {
      setIsUnlocked(true);
      setError('');
      setShowVideo(false);
    } else {
      setError('❌ Wrong code! Try again');
      setPasscode('');
      setShowVideo(true);
      setTimeout(() => {
        setError('');
        setShowVideo(false);
      }, 15000);
    }
  };

  const calculateProgress = () => {
    const completedPuzzles = Object.values(state.wordPuzzles || {}).filter(puzzle => puzzle.completed).length;
    const totalPuzzles = 4;
    return (completedPuzzles / totalPuzzles) * 100;
  };

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
        <div className="relative mb-8">
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
                    Word Fragmentation Puzzle
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

        {/* Embedded Puzzle Section */}
        <div className="relative">
          {/* Title */}
          <div className="text-center mb-8 bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-white mb-2 text-shadow-lg">
              🎄 Final Challenge! 🎄
            </h1>
            <p className="text-xl text-[#ffd700]">
              Complete this puzzle to finish your journey...
            </p>
          </div>

          {/* Embedded Puzzle */}
          <div className={`relative bg-white/10 rounded-lg min-h-[200px] ${!arePuzzles1And2Completed ? 'opacity-50 pointer-events-none' : ''}`}>
            <EmbeddedPuzzle />

            {/* Passcode Section */}
            <div className="mt-6 p-6 bg-white/20 rounded-lg backdrop-blur-sm">
              <div className="flex justify-center items-start space-x-6">
                <div className="flex flex-col items-center">
                  <input
                    type="password"
                    value={passcode}
                    readOnly
                    className="w-48 px-4 py-2 rounded-lg bg-white/90 text-[#1a472a] text-center text-2xl tracking-wider mb-4"
                    placeholder="****"
                  />
                  {error && (
                    <div className="text-[#c41e3a] font-bold text-lg animate-bounce mb-2 bg-white/90 px-4 py-2 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2 w-48">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                      <button
                        key={number}
                        onClick={() => handleNumberClick(number)}
                        className="w-14 h-14 bg-white/90 rounded-lg text-[#1a472a] text-2xl font-bold hover:bg-[#c41e3a] hover:text-white transition-colors"
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={handleClear}
                      className="w-14 h-14 bg-white/90 rounded-lg text-[#1a472a] text-sm font-bold hover:bg-[#c41e3a] hover:text-white transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => handleNumberClick(0)}
                      className="w-14 h-14 bg-white/90 rounded-lg text-[#1a472a] text-2xl font-bold hover:bg-[#c41e3a] hover:text-white transition-colors"
                    >
                      0
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="w-14 h-14 bg-[#c41e3a] rounded-lg text-white text-sm font-bold hover:bg-[#a01830] transition-colors"
                    >
                      Enter
                    </button>
                  </div>
                </div>

                {/* Video Component */}
                {showVideo && <WrongCodeVideo onEnded={() => setShowVideo(false)} />}
              </div>
            </div>
          </div>

          {/* Locked Overlay for Final Challenge */}
          {!arePuzzles1And2Completed && (
            <div className="absolute inset-0 bg-[#1a472a]/50 backdrop-blur-md z-10 flex items-start justify-center">
              <div className="text-center p-6 bg-white/90 rounded-lg shadow-lg border-2 border-[#c41e3a] mt-8">
                <p className="text-lg font-bold text-[#c41e3a]">
                  🎄 Complete Previous Puzzles to Unlock Final Challenge
                </p>
                <p className="text-[#1a472a]">
                  🔒 Locked
                </p>
              </div>
            </div>
          )}
        </div>

{/* Images Section - Will show when unlocked */}
{isUnlocked && (
  <div className="mt-6 p-6 bg-white/20 rounded-lg backdrop-blur-sm">
    {/* Introduction Text */}
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        🎉 Congratulations on Solving All Puzzles! 🎉
      </h2>
      <p className="text-xl text-[#ffd700] mb-4">
        You've unlocked your special Christmas surprise...
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Image with Context */}
      <div className="space-y-4">
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-2">Your Progression Adventure!</h3>
          <p className="text-[#ffd700] mb-4">
            Enjoy a one on one session with your certified Woodward Instructor! They are ready to help you meet your goals from intro to park up to medium line jumps, rails, boxes, flat spins and halfpipe.
          </p>
          <ul className="text-white list-disc list-inside mb-4">
            <li>Optional bring a friend (or drew) add on</li>
          </ul>
        </div>
        <div className="bg-white/10 rounded-lg p-4 relative" style={{ height: '300px' }}>
          <Image
            src="/images/ashleyshreds.png"
            alt="Ashley Shreds"
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Second Image with Context */}
      <div className="space-y-4">
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-2">🎄 Your Winter Getaway Package</h3>
          <p className="text-[#ffd700] mb-4">
            A magical winter weekend at Telluride Mountain Resort:
          </p>
          <ul className="text-white list-disc list-inside mb-4">
            <li>Days of riding at the legendary Telluride Ski Resort!!</li>
            <li>Vibey accomodations (dog friendly options)</li>
            <li>Hot Chocolate by the Fireplace</li>
          </ul>
        </div>
        <div className="bg-white/10 rounded-lg p-4 relative" style={{ height: '300px' }}>
          <Image
            src="/images/wintergetaway.png"
            alt="Winter Getaway"
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>

    {/* Bottom Message */}
    <div className="text-center mt-8 bg-white/10 p-4 rounded-lg">
      <p className="text-xl text-white">
        I LOVE YOU SO MUCH AND I HOPE YOU LIKE YOUR GIFTS
      </p>
    </div>
  </div>
)}

      </div>
    </Layout>
  );
}
