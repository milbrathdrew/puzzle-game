// pages/puzzle.js
import React from 'react';
import Layout from '../components/Layout';
import WordFragmentation from '../components/WordFragmentation';
import { useGameState } from '../context/GameContext';
import ProgressBar from '../components/ProgressBar';

// Helper function for generating puzzle letters
const generatePuzzleLetters = (word, totalLetters = 12) => {
    const wordLetters = word.split('');
    const extraLettersNeeded = totalLetters - wordLetters.length;
    const commonLetters = 'AEIOURSTNLC';
    const extraLetters = Array(extraLettersNeeded).fill()
        .map(() => commonLetters[Math.floor(Math.random() * commonLetters.length)]);
    const allLetters = [...wordLetters, ...extraLetters];
    return allLetters.sort(() => Math.random() - 0.5);
};

// Pre-generate letters for each word
const PUZZLE_LETTERS = {
    bat: generatePuzzleLetters("BAT", 12),
    ring: generatePuzzleLetters("RING", 12),
    flame: generatePuzzleLetters("FLAME", 12),
    suitcase: generatePuzzleLetters("SUITCASE", 15)
};

const PuzzlePage = () => {
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
                        />
                    </div>
                    <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-bold mb-4">Trivia 2: RING</h3>
                        <WordFragmentation 
                            word="RING"
                            letters={PUZZLE_LETTERS.ring}
                            onComplete={(score) => handleWordPuzzleComplete('ring', score)}
                            completed={state.wordPuzzles?.ring?.completed}
                        />
                    </div>
                    <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-bold mb-4">Trivia 3: FLAME</h3>
                        <WordFragmentation 
                            word="FLAME"
                            letters={PUZZLE_LETTERS.flame}
                            onComplete={(score) => handleWordPuzzleComplete('flame', score)}
                            completed={state.wordPuzzles?.flame?.completed}
                        />
                    </div>
                    <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-bold mb-4">Trivia 4: SUITCASE</h3>
                        <WordFragmentation 
                            word="SUITCASE"
                            letters={PUZZLE_LETTERS.suitcase}
                            onComplete={(score) => handleWordPuzzleComplete('suitcase', score)}
                            completed={state.wordPuzzles?.suitcase?.completed}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PuzzlePage;
